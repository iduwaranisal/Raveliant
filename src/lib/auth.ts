import crypto from "crypto";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const AUTH_SECRET = process.env.AUTH_SECRET || "raveliant_auth_secret_session_key";
const COOKIE_NAME = "raveliant_admin_session";

/**
 * Timing-safe string comparison to prevent timing attacks
 */
export function verifyPassword(inputPassword: string): boolean {
  if (!inputPassword || typeof inputPassword !== "string") return false;
  
  const bufferA = Buffer.from(inputPassword.trim());
  const bufferB = Buffer.from(ADMIN_PASSWORD.trim());

  if (bufferA.length !== bufferB.length) {
    // Constant time dummy comparison
    crypto.timingSafeEqual(bufferA, bufferA);
    return false;
  }

  return crypto.timingSafeEqual(bufferA, bufferB);
}

/**
 * Generate a cryptographically signed HMAC session token
 */
export function generateSessionToken(): string {
  const timestamp = Date.now();
  const payload = `admin:${timestamp}`;
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

/**
 * Verify HMAC session token and validate age (valid for 7 days)
 */
export function verifySessionToken(token: string): boolean {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payload, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(payload)
    .digest("hex");

  const sigBufferA = Buffer.from(signature);
  const sigBufferB = Buffer.from(expectedSignature);

  if (sigBufferA.length !== sigBufferB.length) return false;
  if (!crypto.timingSafeEqual(sigBufferA, sigBufferB)) return false;

  // Check timestamp (max 7 days)
  const [role, timestampStr] = payload.split(":");
  if (role !== "admin") return false;

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;

  const maxAge = 1000 * 60 * 60 * 24 * 7; // 7 days
  if (Date.now() - timestamp > maxAge) return false;

  return true;
}

/**
 * Set secure HttpOnly session cookie
 */
export async function setAdminSession(): Promise<void> {
  const token = generateSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Clear session cookie
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Check if the current request is authenticated as Admin
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}
