import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMessage extends Document {
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  businessUrl: string;
  primaryGoal: string;
  message?: string;
  status: "unread" | "read" | "replied" | "archived";
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    whatsapp: { type: String, default: "", trim: true },
    businessUrl: { type: String, required: true, trim: true },
    primaryGoal: { type: String, required: true },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["unread", "read", "replied", "archived"],
      default: "unread",
    },
  },
  { timestamps: true }
);

export const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
