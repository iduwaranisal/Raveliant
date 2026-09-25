"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { Project, IProject } from "@/models/Project";
import { initialProjects } from "@/lib/seedData";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  try {
    await connectToDatabase();
    let projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();

    if (!projects || projects.length === 0) {
      // Seed default projects if none exist
      await Project.insertMany(initialProjects);
      projects = await Project.find({}).sort({ order: 1, createdAt: -1 }).lean();
    }

    return {
      success: true,
      data: JSON.parse(JSON.stringify(projects)),
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return {
      success: false,
      data: initialProjects,
      error: "Failed to fetch projects",
    };
  }
}

import { isAdminAuthenticated } from "@/lib/auth";

export async function createProject(formData: Partial<IProject>) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access" };
    }

    await connectToDatabase();
    const newProject = await Project.create({
      title: formData.title,
      category: formData.category || "Build a Fast Modern Website",
      description: formData.description,
      client: formData.client,
      image: formData.image || "/images/service_web.jpg",
      liveUrl: formData.liveUrl || "",
      tags: formData.tags || [],
      highlight: formData.highlight || "",
      featured: formData.featured || false,
      order: formData.order || 0,
    });

    revalidatePath("/");
    revalidatePath("/admin");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newProject)),
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: string, formData: Partial<IProject>) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access" };
    }

    await connectToDatabase();
    const updated = await Project.findByIdAndUpdate(id, formData, { new: true }).lean();

    revalidatePath("/");
    revalidatePath("/admin");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(updated)),
    };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return { success: false, error: "Unauthorized access" };
    }

    await connectToDatabase();
    await Project.findByIdAndDelete(id);

    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
