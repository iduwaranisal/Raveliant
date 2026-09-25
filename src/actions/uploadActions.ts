"use server";

import { uploadToCloudinary } from "@/lib/cloudinary";
import { isAdminAuthenticated } from "@/lib/auth";

export async function uploadImageAction(formData: FormData) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access" };
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const folder = (formData.get("folder") as string) || "raveliant";
    const result = await uploadToCloudinary(buffer, folder);

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error: any) {
    console.error("Cloudinary upload action error:", error);
    return {
      success: false,
      error: error?.message || "Failed to upload image",
    };
  }
}
