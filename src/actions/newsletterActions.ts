"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Subscriber } from "@/models/Subscriber";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/auth";

export async function subscribeNewsletter(emailInput: string) {
  try {
    const email = (emailInput || "").trim().toLowerCase();

    if (!email || !email.includes("@") || !email.includes(".")) {
      return { success: false, error: "Please enter a valid email address." };
    }

    if (email.length > 150) {
      return { success: false, error: "Email address is too long." };
    }

    await connectToDatabase();

    const existing = await Subscriber.findOne({ email }).lean();
    if (existing) {
      return {
        success: true,
        alreadySubscribed: true,
        message: "You're already subscribed to our Growth Newsletter! Thank you.",
      };
    }

    await Subscriber.create({
      email,
      source: "Growth Newsletter",
    });

    revalidatePath("/admin");

    return {
      success: true,
      message: "Thank you for subscribing to our Growth Newsletter!",
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      success: false,
      error: "Could not complete your subscription. Please try again later.",
    };
  }
}

export async function getSubscribers() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access", data: [] };
    }

    await connectToDatabase();
    const subscribers = await Subscriber.find({})
      .sort({ createdAt: -1 })
      .lean();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(subscribers)),
    };
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return {
      success: false,
      error: "Failed to fetch newsletter subscribers",
      data: [],
    };
  }
}

export async function deleteSubscriber(id: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access" };
    }

    await connectToDatabase();
    await Subscriber.findByIdAndDelete(id);

    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return { success: false, error: "Failed to delete subscriber" };
  }
}
