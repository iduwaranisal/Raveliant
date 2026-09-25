import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteContent extends Document {
  key: string;
  siteSettings: {
    whatsappNumber: string;
    contactEmail: string;
    availableSlots: string;
    companyName: string;
  };
  hero: {
    badgeText: string;
    headlineMain: string;
    headlineGradient: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    showcaseImage: string;
    highlights: Array<{ title: string; desc: string }>;
  };
  services: Array<{
    title: string;
    tagline: string;
    description: string;
    badge: string;
    image: string;
    features: string[];
    impact: string;
  }>;
  whyUs: {
    badgeText: string;
    heading: string;
    subheading: string;
    points: Array<{
      title: string;
      subtitle: string;
      description: string;
      badge: string;
    }>;
    oldWay: string[];
    raveliantWay: string[];
  };
  process: Array<{
    number: string;
    title: string;
    subtitle: string;
    description: string;
    deliverable: string;
  }>;
  caseStudies: Array<{
    client: string;
    tag: string;
    image: string;
    headline: string;
    story: string;
    quote: string;
    author: string;
    metrics: Array<{ label: string; value: string }>;
  }>;
  updatedAt: Date;
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    key: { type: String, required: true, unique: true, default: "main_content" },
    siteSettings: {
      whatsappNumber: { type: String, default: "0704692220" },
      contactEmail: { type: String, default: "raveliantcontact@gmail.com" },
      availableSlots: { type: String, default: "Available for Select Q2/Q3 Client Engagements" },
      companyName: { type: String, default: "Raveliant Digital Solutions" },
    },
    hero: {
      badgeText: { type: String, default: "Websites • AI Chatbots • Social Media Ads" },
      headlineMain: { type: String, default: "We Don't Just Build Software." },
      headlineGradient: { type: String, default: "We Scale Businesses." },
      subheadline: {
        type: String,
        default:
          "We build fast modern websites, set up smart AI chatbots that save you hours of manual work, and run social media ads that bring a steady stream of new clients directly to your business.",
      },
      primaryCta: { type: String, default: "Get Your Free Growth Audit" },
      secondaryCta: { type: String, default: "See How We Help" },
      showcaseImage: { type: String, default: "/images/hero_showcase.jpg" },
      highlights: [
        {
          title: { type: String, default: "Fast Websites & Apps" },
          desc: { type: String, default: "Built to turn visitors into active clients" },
        },
        {
          title: { type: String, default: "Smart AI Chatbots" },
          desc: { type: String, default: "Answering questions & booking calls 24/7" },
        },
        {
          title: { type: String, default: "Social Media Ads" },
          desc: { type: String, default: "Reaching your ideal audience accurately" },
        },
        {
          title: { type: String, default: "Measurable Growth" },
          desc: { type: String, default: "We focus on verified client inquiries" },
        },
      ],
    },
    services: [
      {
        title: { type: String },
        tagline: { type: String },
        description: { type: String },
        badge: { type: String },
        image: { type: String },
        features: [{ type: String }],
        impact: { type: String },
      },
    ],
    whyUs: {
      badgeText: { type: String, default: "THE STRATEGIC PARTNER" },
      heading: { type: String, default: "Why Work With Us?" },
      subheading: {
        type: String,
        default:
          "Stop wasting time managing disconnected agencies. We give you a single, reliable team dedicated to bringing you more customer inquiries every month.",
      },
      points: [
        {
          title: { type: String },
          subtitle: { type: String },
          description: { type: String },
          badge: { type: String },
        },
      ],
      oldWay: [{ type: String }],
      raveliantWay: [{ type: String }],
    },
    process: [
      {
        number: { type: String },
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
        deliverable: { type: String },
      },
    ],
    caseStudies: [
      {
        client: { type: String },
        tag: { type: String },
        image: { type: String },
        headline: { type: String },
        story: { type: String },
        quote: { type: String },
        author: { type: String },
        metrics: [
          {
            label: { type: String },
            value: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const SiteContent: Model<ISiteContent> =
  mongoose.models.SiteContent || mongoose.model<ISiteContent>("SiteContent", SiteContentSchema);
