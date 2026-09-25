"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Message } from "@/models/Message";
import { revalidatePath } from "next/cache";

import { isAdminAuthenticated } from "@/lib/auth";

export interface ContactInput {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  businessUrl: string;
  primaryGoal: string;
  message?: string;
}

export async function submitContactForm(data: ContactInput) {
  try {
    await connectToDatabase();

    if (!data.name || !data.email || !data.phone || !data.businessUrl) {
      return { success: false, error: "Please fill out all required fields, including your contact number." };
    }

    // Input sanitization and length bounds
    const name = data.name.trim().slice(0, 100);
    const email = data.email.trim().slice(0, 150);
    const phone = data.phone.trim().slice(0, 30);
    const whatsapp = (data.whatsapp || "").trim().slice(0, 30);
    const businessUrl = data.businessUrl.trim().slice(0, 200);
    const primaryGoal = (data.primaryGoal || "All-in-One Digital Growth").slice(0, 100);
    const message = (data.message || "").trim().slice(0, 2000);

    const newMessage = await Message.create({
      name,
      email,
      phone,
      whatsapp: whatsapp || phone, // default to contact phone if left blank
      businessUrl,
      primaryGoal,
      message,
      status: "unread",
    });

    revalidatePath("/admin");

    return {
      success: true,
      message: "Your request has been received! We will be in touch shortly.",
      id: newMessage._id.toString(),
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      error: "Something went wrong while submitting. Please try again or message us on WhatsApp.",
    };
  }
}

export async function getMessages() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access", data: [] };
    }

    await connectToDatabase();
    const messages = await Message.find({}).sort({ createdAt: -1 }).lean();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(messages)),
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, error: "Failed to fetch messages", data: [] };
  }
}

export async function updateMessageStatus(id: string, status: "unread" | "read" | "replied" | "archived") {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access" };
    }

    await connectToDatabase();
    const updated = await Message.findByIdAndUpdate(id, { status }, { new: true }).lean();
    revalidatePath("/admin");
    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating message status:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function deleteMessage(id: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access" };
    }

    await connectToDatabase();
    await Message.findByIdAndDelete(id);
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false, error: "Failed to delete message" };
  }
}
