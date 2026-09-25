"use server";

import { verifyPassword, setAdminSession, clearAdminSession, isAdminAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function loginAdminAction(password: string) {
  try {
    if (!password) {
      return { success: false, error: "Please enter the administrative key." };
    }

    const isValid = verifyPassword(password);
    if (!isValid) {
      return { success: false, error: "Invalid administrative credentials." };
    }

    await setAdminSession();
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Login action error:", error);
    return { success: false, error: "Authentication system error. Please try again." };
  }
}

export async function logoutAdminAction() {
  try {
    await clearAdminSession();
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Logout action error:", error);
    return { success: false, error: "Failed to sign out." };
  }
}

export async function checkAuthStatusAction() {
  try {
    const isAuth = await isAdminAuthenticated();
    return { success: true, isAuthenticated: isAuth };
  } catch {
    return { success: false, isAuthenticated: false };
  }
}
