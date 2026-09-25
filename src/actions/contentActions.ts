"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { SiteContent, ISiteContent } from "@/models/SiteContent";
import { initialSiteContent } from "@/lib/seedData";
import { revalidatePath } from "next/cache";

import { isAdminAuthenticated } from "@/lib/auth";

export async function getSiteContent() {
  try {
    await connectToDatabase();
    let content = await SiteContent.findOne({ key: "main_content" }).lean();

    if (!content) {
      // Seed default content
      const created = await SiteContent.create(initialSiteContent);
      content = created.toObject();
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(content)),
    };
  } catch (error) {
    console.error("Error fetching site content:", error);
    return {
      success: false,
      data: initialSiteContent,
      error: "Using default content due to connection state",
    };
  }
}

export async function updateSiteSettings(siteSettings: Partial<ISiteContent["siteSettings"]>) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized access" };

    await connectToDatabase();
    const updated = await SiteContent.findOneAndUpdate(
      { key: "main_content" },
      { $set: { siteSettings } },
      { new: true, upsert: true }
    ).lean();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating site settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}

export async function updateHeroContent(hero: Partial<ISiteContent["hero"]>) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized access" };

    await connectToDatabase();
    const updated = await SiteContent.findOneAndUpdate(
      { key: "main_content" },
      { $set: { hero } },
      { new: true, upsert: true }
    ).lean();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating hero content:", error);
    return { success: false, error: "Failed to update hero" };
  }
}

export async function updateServicesContent(services: ISiteContent["services"]) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized access" };

    await connectToDatabase();
    const updated = await SiteContent.findOneAndUpdate(
      { key: "main_content" },
      { $set: { services } },
      { new: true, upsert: true }
    ).lean();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating services content:", error);
    return { success: false, error: "Failed to update services" };
  }
}

export async function updateWhyUsContent(whyUs: Partial<ISiteContent["whyUs"]>) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized access" };

    await connectToDatabase();
    const updated = await SiteContent.findOneAndUpdate(
      { key: "main_content" },
      { $set: { whyUs } },
      { new: true, upsert: true }
    ).lean();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating why us content:", error);
    return { success: false, error: "Failed to update Why Us section" };
  }
}

export async function updateProcessContent(processList: ISiteContent["process"]) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized access" };

    await connectToDatabase();
    const updated = await SiteContent.findOneAndUpdate(
      { key: "main_content" },
      { $set: { process: processList } },
      { new: true, upsert: true }
    ).lean();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating process content:", error);
    return { success: false, error: "Failed to update process" };
  }
}

export async function updateCaseStudiesContent(caseStudies: ISiteContent["caseStudies"]) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized access" };

    await connectToDatabase();
    const updated = await SiteContent.findOneAndUpdate(
      { key: "main_content" },
      { $set: { caseStudies } },
      { new: true, upsert: true }
    ).lean();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error updating case studies:", error);
    return { success: false, error: "Failed to update case studies" };
  }
}

export async function resetToDefaultContent() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) return { success: false, error: "Unauthorized access" };

    await connectToDatabase();
    const updated = await SiteContent.findOneAndUpdate(
      { key: "main_content" },
      { $set: initialSiteContent },
      { new: true, upsert: true }
    ).lean();

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, data: JSON.parse(JSON.stringify(updated)) };
  } catch (error) {
    console.error("Error resetting content:", error);
    return { success: false, error: "Failed to reset content" };
  }
}
