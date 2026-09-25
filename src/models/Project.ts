import mongoose, { Schema, Document, Model } from "mongoose";

export type ProjectCategory =
  | "All-in-One Digital Growth"
  | "Get More Customer Calls & Inquiries"
  | "Build a Fast Modern Website"
  | "Save Time with AI Chatbots"
  | "Reach More People with Social Ads"
  | "Websites"
  | "AI Chatbots"
  | "Social Ads"
  | "Web Apps";

export interface IProject extends Document {
  title: string;
  category: ProjectCategory | string;
  description: string;
  client: string;
  image: string;
  liveUrl?: string;
  tags: string[];
  highlight?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      default: "Build a Fast Modern Website",
    },
    description: { type: String, required: true },
    client: { type: String, required: true },
    image: { type: String, required: true },
    liveUrl: { type: String, default: "" },
    tags: [{ type: String }],
    highlight: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
