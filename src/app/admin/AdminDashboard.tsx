"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  FolderGit2,
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  Upload,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Mail,
  ExternalLink,
  RefreshCw,
  LogOut,
  Layers,
  Sparkles,
  Lock,
  Phone,
  X,
} from "lucide-react";
import { updateMessageStatus, deleteMessage } from "@/actions/contactActions";
import {
  updateSiteSettings,
  updateHeroContent,
  updateServicesContent,
  updateWhyUsContent,
  updateProcessContent,
  updateCaseStudiesContent,
  resetToDefaultContent,
} from "@/actions/contentActions";
import { createProject, updateProject, deleteProject } from "@/actions/portfolioActions";
import { uploadImageAction } from "@/actions/uploadActions";
import { loginAdminAction, logoutAdminAction } from "@/actions/authActions";

interface AdminDashboardProps {
  isAuthenticated?: boolean;
  initialContent: any;
  initialProjects: any[];
  initialMessages: any[];
}

export function AdminDashboard({
  isAuthenticated = false,
  initialContent,
  initialProjects,
  initialMessages,
}: AdminDashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "inbox" | "portfolio" | "hero" | "services" | "whyUs" | "process" | "caseStudies" | "settings"
  >("inbox");

  // State copies
  const [messages, setMessages] = useState<any[]>(initialMessages || []);
  const [projects, setProjects] = useState<any[]>(initialProjects || []);
  const [content, setContent] = useState<any>(initialContent || {});

  // Notification status
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // New project modal state
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>({
    title: "",
    client: "",
    category: "Build a Fast Modern Website",
    description: "",
    image: "/images/service_web.jpg",
    liveUrl: "",
    tags: "",
    highlight: "",
    featured: true,
  });

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setAuthError("");

    const res = await loginAdminAction(passwordInput);
    if (res.success) {
      setIsLoggedIn(true);
      window.location.reload();
    } else {
      setAuthError(res.error || "Invalid administrative credentials.");
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdminAction();
    setIsLoggedIn(false);
    window.location.reload();
  };

  // Image upload helper
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetFieldCallback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "raveliant_media");

      const res = await uploadImageAction(formData);
      if (res.success && res.url) {
        targetFieldCallback(res.url);
        showToast("Image uploaded successfully!");
      } else {
        showToast(res.error || "Image upload failed. Please try again.", "error");
      }
    } catch {
      showToast("Image upload failed. Please try again.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  // MESSAGE ACTIONS
  const handleStatusChange = async (id: string, newStatus: "unread" | "read" | "replied" | "archived") => {
    const res = await updateMessageStatus(id, newStatus);
    if (res.success) {
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m))
      );
      showToast(`Message marked as ${newStatus}`);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    const res = await deleteMessage(id);
    if (res.success) {
      setMessages((prev) => prev.filter((m) => m._id !== id));
      showToast("Inquiry message deleted.");
    } else {
      showToast("Failed to delete message.", "error");
    }
  };

  // PORTFOLIO ACTIONS
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const tagsArray = typeof currentProject.tags === "string"
      ? currentProject.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : currentProject.tags;

    const projectData = {
      ...currentProject,
      tags: tagsArray,
    };

    if (currentProject._id) {
      const res = await updateProject(currentProject._id, projectData);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === currentProject._id ? res.data : p))
        );
        showToast("Project updated successfully!");
        setIsEditingProject(false);
      }
    } else {
      const res = await createProject(projectData);
      if (res.success) {
        setProjects((prev) => [res.data, ...prev]);
        showToast("New project added to portfolio!");
        setIsEditingProject(false);
      }
    }
    setIsSaving(false);
  };

  const handleDeleteProject = async (id: string) => {
    const res = await deleteProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
      showToast("Portfolio project removed.");
    } else {
      showToast("Failed to remove project.", "error");
    }
  };

  // CMS CONTENT SAVERS
  const handleSaveSettings = async () => {
    setIsSaving(true);
    const res = await updateSiteSettings(content.siteSettings);
    if (res.success) showToast("Contact info & site settings saved!");
    setIsSaving(false);
  };

  const handleSaveHero = async () => {
    setIsSaving(true);
    const res = await updateHeroContent(content.hero);
    if (res.success) showToast("Hero section updated!");
    setIsSaving(false);
  };

  const handleSaveServices = async () => {
    setIsSaving(true);
    const res = await updateServicesContent(content.services);
    if (res.success) showToast("Services updated!");
    setIsSaving(false);
  };

  const handleSaveWhyUs = async () => {
    setIsSaving(true);
    const res = await updateWhyUsContent(content.whyUs);
    if (res.success) showToast("Why Us section updated!");
    setIsSaving(false);
  };

  const handleSaveProcess = async () => {
    setIsSaving(true);
    const res = await updateProcessContent(content.process);
    if (res.success) showToast("Process steps updated!");
    setIsSaving(false);
  };

  const handleAddCaseStudy = () => {
    const newStudy = {
      client: "New Client",
      tag: "Business & Technology",
      image: "/images/case_aurapay.svg",
      headline: "Factual Client Achievement & Proven Results",
      story: "Describe the specific challenges the client experienced and how Raveliant's solution delivered tangible growth.",
      quote: "Raveliant delivered outstanding results and accelerated our client acquisition.",
      author: "Founder / Executive",
      metrics: [
        { label: "Client Inquiries", value: "+250% Growth" },
        { label: "System Speed", value: "300ms Load" },
        { label: "Time Saved", value: "40 hrs / wk" },
      ],
    };
    setContent((prev: any) => ({
      ...prev,
      caseStudies: [...(prev?.caseStudies || []), newStudy],
    }));
    showToast("New case study created. Customize details and click Save.");
  };

  const handleDeleteCaseStudy = (idx: number) => {
    setContent((prev: any) => ({
      ...prev,
      caseStudies: prev.caseStudies.filter((_: any, i: number) => i !== idx),
    }));
    showToast("Case study removed.");
  };

  const handleSaveCaseStudies = async () => {
    setIsSaving(true);
    const res = await updateCaseStudiesContent(content.caseStudies);
    if (res.success) showToast("Case studies updated successfully!");
    setIsSaving(false);
  };

  const handleResetDefaults = async () => {
    setIsSaving(true);
    const res = await resetToDefaultContent();
    if (res.success) {
      setContent(res.data);
      showToast("Content reset to default settings.");
    } else {
      showToast("Failed to reset content.", "error");
    }
    setIsSaving(false);
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center mx-auto text-blue-600 shadow-xs">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Raveliant Management Access</h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter your administrative access key to manage client inquiries and site content
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter administrative key..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-center"
              autoFocus
            />

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
            >
              {isLoggingIn ? "Authenticating..." : "Sign In Securely"}
            </button>
          </form>

          <Link href="/" className="inline-block text-xs text-slate-500 hover:text-blue-600 font-medium">
            ← Return to Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:top-6 sm:max-w-md z-50 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl border shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-semibold backdrop-blur-xl ${
              notification.type === "success"
                ? "bg-white border-emerald-300 text-slate-900 shadow-xl"
                : "bg-white border-red-300 text-slate-900 shadow-xl"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            )}
            <div className="flex flex-col pr-2">
              <span className="font-bold text-slate-900">
                {notification.type === "success" ? "Success" : "Notice"}
              </span>
              <span className="text-xs text-slate-600 font-normal">{notification.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Admin Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="flex items-center gap-2 text-slate-900 font-bold tracking-wider text-sm sm:text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
              <span>RAVELIANT <span className="hidden sm:inline">CONTROL PANEL</span></span>
            </Link>
            <span className="hidden md:inline-block text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold font-mono">
              Secure Session
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">View Live Website</span>
              <span className="sm:hidden">Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Admin Navigation Tabs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "inbox" ? "bg-blue-600 text-white shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Messages Inbox ({messages.filter((m) => m.status === "unread").length})</span>
          </button>

          <button
            onClick={() => setActiveTab("portfolio")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "portfolio" ? "bg-blue-600 text-white shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Portfolio Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("hero")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "hero" ? "bg-blue-600 text-white shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Hero Section</span>
          </button>

          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "services" ? "bg-blue-600 text-white shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Services (3 Pillars)</span>
          </button>

          <button
            onClick={() => setActiveTab("whyUs")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "whyUs" ? "bg-blue-600 text-white shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <span>Why Choose Us</span>
          </button>

          <button
            onClick={() => setActiveTab("process")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "process" ? "bg-blue-600 text-white shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <span>4-Step Process</span>
          </button>

          <button
            onClick={() => setActiveTab("caseStudies")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "caseStudies" ? "bg-blue-600 text-white shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <span>Case Studies</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
              activeTab === "settings" ? "bg-blue-600 text-white shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>WhatsApp &amp; Contact</span>
          </button>
        </div>
      </div>

      {/* Main Admin Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ===================== TAB 1: MESSAGES INBOX ===================== */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Client Inquiries &amp; Messages</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Review customer submissions and consultation requests in real time
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  Total: {messages.length} {messages.length === 1 ? "inquiry" : "inquiries"}
                </span>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-xs text-slate-500">
                <Inbox className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <p className="text-base font-semibold text-slate-900">No inquiries yet</p>
                <p className="text-xs mt-1 text-slate-500">When users submit the growth audit form, their messages will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => {
                  const clientWaRaw = (msg.whatsapp || msg.phone || "").replace(/[^0-9]/g, "");
                  const formattedClientWa = clientWaRaw.startsWith("0") ? `94${clientWaRaw.slice(1)}` : clientWaRaw;
                  const waReplyUrl = formattedClientWa
                    ? `https://wa.me/${formattedClientWa}?text=Hello%20${encodeURIComponent(msg.name)}%2C%20thank%20you%20for%20reaching%20out%20to%20Raveliant%20regarding%20${encodeURIComponent(msg.businessUrl || "your project")}`
                    : `https://wa.me/?text=Hello%20${encodeURIComponent(msg.name)}%2C%20thank%20you%20for%20reaching%20out%20to%20Raveliant`;
                  const mailtoUrl = `mailto:${msg.email}?subject=Raveliant%20Growth%20Audit%20for%20${encodeURIComponent(msg.businessUrl || "Your Business")}&body=Hello%20${encodeURIComponent(msg.name)}%2C%0A%0AThank%20you%20for%20reaching%20out%20to%20Raveliant%20Digital%20Solutions.`;

                  return (
                    <div
                      key={msg._id}
                      className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                        msg.status === "unread"
                          ? "bg-blue-50/30 border-blue-200 shadow-sm"
                          : "bg-white border-slate-200 shadow-xs hover:border-slate-300"
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-base sm:text-lg font-bold text-slate-900">{msg.name}</span>
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                                msg.status === "unread"
                                  ? "bg-blue-600 text-white font-semibold shadow-xs"
                                  : msg.status === "replied"
                                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold"
                                  : "bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                              }`}
                            >
                              {msg.status}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-600 mt-2">
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                            >
                              {msg.email}
                            </a>

                            {msg.phone && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-700 font-medium inline-flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-slate-500" />
                                  {msg.phone}
                                </span>
                              </>
                            )}

                            {msg.whatsapp && (
                              <>
                                <span className="text-slate-300">•</span>
                                <span className="text-emerald-700 font-medium inline-flex items-center gap-1">
                                  <MessageCircle className="w-3 h-3 text-emerald-600" />
                                  WA: {msg.whatsapp}
                                </span>
                              </>
                            )}

                            {msg.businessUrl && (
                              <>
                                <span className="text-slate-300">•</span>
                                <a
                                  href={msg.businessUrl.startsWith("http") ? msg.businessUrl : `https://${msg.businessUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-slate-700 hover:text-blue-600 font-medium underline flex items-center gap-1"
                                >
                                  <span>{msg.businessUrl}</span>
                                  <ExternalLink className="w-3 h-3 text-slate-400" />
                                </a>
                              </>
                            )}

                            <span className="text-slate-300">•</span>
                            <span className="text-slate-500">
                              {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "Recent"}
                            </span>
                          </div>
                        </div>

                        {/* Quick action buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                          {msg.phone && (
                            <a
                              href={`tel:${msg.phone.replace(/\s+/g, "")}`}
                              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-blue-600" />
                              <span>Call</span>
                            </a>
                          )}

                          <a
                            href={waReplyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <a
                            href={mailtoUrl}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5 text-blue-600" />
                            <span>Email</span>
                          </a>

                          <select
                            value={msg.status}
                            onChange={(e) => handleStatusChange(msg._id, e.target.value as any)}
                            className="bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 shadow-xs"
                          >
                            <option value="unread">Unread</option>
                            <option value="read">Mark as Read</option>
                            <option value="replied">Mark as Replied</option>
                            <option value="archived">Archive</option>
                          </select>

                          <button
                            onClick={() => handleDeleteMessage(msg._id)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1">
                            Primary Goal
                          </span>
                          <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                            {msg.primaryGoal || "General Inquiry"}
                          </span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1">
                            Contact Number
                          </span>
                          <span className="font-bold text-slate-900 text-xs block">
                            {msg.phone || "—"}
                          </span>
                          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mt-2 mb-1">
                            WhatsApp
                          </span>
                          <span className="font-bold text-emerald-700 text-xs inline-flex items-center gap-1">
                            <MessageCircle className="w-3 h-3 text-emerald-600" />
                            {msg.whatsapp || msg.phone || "Same as contact"}
                          </span>
                        </div>

                        <div className="md:col-span-2 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px] block mb-1">
                            Client Message / Notes
                          </span>
                          <p className="text-slate-800 leading-relaxed text-xs">
                            {msg.message || "No additional message provided."}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB 2: PORTFOLIO PROJECTS ===================== */}
        {activeTab === "portfolio" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Portfolio Projects Manager</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Add, edit, or remove showcase projects displayed in the Portfolio section
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentProject({
                    title: "",
                    client: "",
                    category: "Build a Fast Modern Website",
                    description: "",
                    image: "/images/service_web.jpg",
                    liveUrl: "",
                    tags: "Next.js, UI/UX",
                    highlight: "Verified Impact",
                    featured: true,
                  });
                  setIsEditingProject(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs flex items-center gap-2 shadow-md shadow-blue-500/10"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Project</span>
              </button>
            </div>

            {/* Project Edit/Create Modal */}
            {isEditingProject && (
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    {currentProject._id ? "Edit Portfolio Project" : "Add New Project"}
                  </h3>
                  <button
                    onClick={() => setIsEditingProject(false)}
                    className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                  >
                    Cancel
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Project Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={currentProject.title}
                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                        placeholder="e.g. Lumina Mobile Storefront"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Client / Brand Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={currentProject.client}
                        onChange={(e) => setCurrentProject({ ...currentProject, client: e.target.value })}
                        placeholder="e.g. Lumina Goods"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Category / Goal *
                      </label>
                      <select
                        value={currentProject.category}
                        onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="All-in-One Digital Growth">All-in-One Digital Growth</option>
                        <option value="Get More Customer Calls & Inquiries">Get More Customer Calls & Inquiries</option>
                        <option value="Build a Fast Modern Website">Build a Fast Modern Website</option>
                        <option value="Save Time with AI Chatbots">Save Time with AI Chatbots</option>
                        <option value="Reach More People with Social Ads">Reach More People with Social Ads</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Highlight Badge
                      </label>
                      <input
                        type="text"
                        value={currentProject.highlight}
                        onChange={(e) => setCurrentProject({ ...currentProject, highlight: e.target.value })}
                        placeholder="e.g. 70 Hours Saved Weekly"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Live Preview URL (Optional)
                      </label>
                      <input
                        type="text"
                        value={currentProject.liveUrl}
                        onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                        placeholder="https://client-demo.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Description *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={currentProject.description}
                      onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                      placeholder="Brief overview of what was built and the result..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={Array.isArray(currentProject.tags) ? currentProject.tags.join(", ") : currentProject.tags}
                      onChange={(e) => setCurrentProject({ ...currentProject, tags: e.target.value })}
                      placeholder="Next.js, Mobile UX, AI Automation"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Image Upload / URL */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Project Cover Image URL
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={currentProject.image}
                        onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />

                      <label className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingImage ? "Uploading..." : "Upload Image"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => setCurrentProject((p: any) => ({ ...p, image: url })))
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsEditingProject(false)}
                      className="px-4 py-2 rounded-xl text-xs text-slate-500 hover:text-slate-800 font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs"
                    >
                      {isSaving ? "Saving..." : "Save Project"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj._id || proj.title}
                  className="rounded-2xl p-5 bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 mb-4 bg-slate-100">
                      <Image
                        src={proj.image || "/images/service_web.jpg"}
                        alt={proj.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-blue-700 border border-slate-200/80 shadow-xs">
                        {proj.category}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 uppercase tracking-wider">{proj.client}</div>
                    <h4 className="text-base font-bold text-slate-900 mt-0.5">{proj.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">{proj.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setCurrentProject(proj);
                        setIsEditingProject(true);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteProject(proj._id)}
                      className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 3: HERO CMS ===================== */}
        {activeTab === "hero" && (
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Hero Section Content</h2>
                <p className="text-xs text-slate-500 mt-1">Customize the primary headline, subheadline, and CTAs</p>
              </div>
              <button
                onClick={handleSaveHero}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Hero"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Top Badge Text</label>
                <input
                  type="text"
                  value={content.hero?.badgeText || ""}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, badgeText: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Main Headline Line 1</label>
                <input
                  type="text"
                  value={content.hero?.headlineMain || ""}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, headlineMain: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gradient Headline Line 2</label>
                <input
                  type="text"
                  value={content.hero?.headlineGradient || ""}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, headlineGradient: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Primary CTA Button</label>
                <input
                  type="text"
                  value={content.hero?.primaryCta || ""}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, primaryCta: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subheadline Description</label>
              <textarea
                rows={3}
                value={content.hero?.subheadline || ""}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, subheadline: e.target.value } })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 leading-relaxed"
              />
            </div>

            {/* Showcase Image Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hero Showcase Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={content.hero?.showcaseImage || ""}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, showcaseImage: e.target.value } })}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <label className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, (url) =>
                        setContent((c: any) => ({ ...c, hero: { ...c.hero, showcaseImage: url } }))
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB 4: SERVICES CMS ===================== */}
        {activeTab === "services" && (
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Services Content (3 Pillars)</h2>
                <p className="text-xs text-slate-500 mt-1">Edit titles, descriptions, and features for each service</p>
              </div>
              <button
                onClick={handleSaveServices}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Services"}</span>
              </button>
            </div>

            <div className="space-y-6">
              {content.services?.map((srv: any, idx: number) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      Service {idx + 1}: {srv.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Title</label>
                      <input
                        type="text"
                        value={srv.title}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].title = e.target.value;
                          setContent({ ...content, services: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={srv.tagline}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].tagline = e.target.value;
                          setContent({ ...content, services: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={srv.description}
                      onChange={(e) => {
                        const updated = [...content.services];
                        updated[idx].description = e.target.value;
                        setContent({ ...content, services: updated });
                      }}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={srv.image}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].image = e.target.value;
                          setContent({ ...content, services: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">Impact Result Pill</label>
                      <input
                        type="text"
                        value={srv.impact}
                        onChange={(e) => {
                          const updated = [...content.services];
                          updated[idx].impact = e.target.value;
                          setContent({ ...content, services: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 5: WHY US CMS ===================== */}
        {activeTab === "whyUs" && (
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Why Work With Us Section</h2>
                <p className="text-xs text-slate-500 mt-1">Edit the 3 strategic points and comparison list</p>
              </div>
              <button
                onClick={handleSaveWhyUs}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Why Us"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Section Heading</label>
                <input
                  type="text"
                  value={content.whyUs?.heading || ""}
                  onChange={(e) => setContent({ ...content, whyUs: { ...content.whyUs, heading: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Subheading</label>
                <input
                  type="text"
                  value={content.whyUs?.subheading || ""}
                  onChange={(e) => setContent({ ...content, whyUs: { ...content.whyUs, subheading: e.target.value } })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h3 className="text-sm font-bold text-blue-700">The 3 Value Points</h3>
              {content.whyUs?.points?.map((p: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={p.title}
                      onChange={(e) => {
                        const updated = [...content.whyUs.points];
                        updated[idx].title = e.target.value;
                        setContent({ ...content, whyUs: { ...content.whyUs, points: updated } });
                      }}
                      className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-bold"
                    />
                    <input
                      type="text"
                      value={p.subtitle}
                      onChange={(e) => {
                        const updated = [...content.whyUs.points];
                        updated[idx].subtitle = e.target.value;
                        setContent({ ...content, whyUs: { ...content.whyUs, points: updated } });
                      }}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-blue-600"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={p.description}
                    onChange={(e) => {
                      const updated = [...content.whyUs.points];
                      updated[idx].description = e.target.value;
                      setContent({ ...content, whyUs: { ...content.whyUs, points: updated } });
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 6: PROCESS CMS ===================== */}
        {activeTab === "process" && (
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Our 4-Step Process Content</h2>
                <p className="text-xs text-slate-500 mt-1">Edit step titles, descriptions, and deliverables</p>
              </div>
              <button
                onClick={handleSaveProcess}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Process"}</span>
              </button>
            </div>

            <div className="space-y-4">
              {content.process?.map((st: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono font-bold text-blue-600">Step {st.number}</span>
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => {
                        const updated = [...content.process];
                        updated[idx].title = e.target.value;
                        setContent({ ...content, process: updated });
                      }}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-bold"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={st.description}
                    onChange={(e) => {
                      const updated = [...content.process];
                      updated[idx].description = e.target.value;
                      setContent({ ...content, process: updated });
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                  />

                  <div>
                    <label className="block text-[10px] text-slate-500 mb-1">Deliverable Pill</label>
                    <input
                      type="text"
                      value={st.deliverable}
                      onChange={(e) => {
                        const updated = [...content.process];
                        updated[idx].deliverable = e.target.value;
                        setContent({ ...content, process: updated });
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-emerald-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 7: CASE STUDIES CMS ===================== */}
        {activeTab === "caseStudies" && (
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Client Case Studies</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Add, edit, or remove client success stories, key factual metrics, and testimonials
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAddCaseStudy}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>Add Case Study</span>
                </button>

                <button
                  onClick={handleSaveCaseStudies}
                  disabled={isSaving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/10"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? "Saving..." : "Save Case Studies"}</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {content.caseStudies?.map((cs: any, idx: number) => (
                <div key={idx} className="p-6 rounded-xl bg-slate-50/80 border border-slate-200 space-y-4 relative group">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-sm font-bold text-slate-900">
                        Case Study #{idx + 1}: {cs.client || "Untitled Client"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteCaseStudy(idx)}
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Client Name</label>
                      <input
                        type="text"
                        value={cs.client}
                        onChange={(e) => {
                          const updated = [...content.caseStudies];
                          updated[idx].client = e.target.value;
                          setContent({ ...content, caseStudies: updated });
                        }}
                        placeholder="e.g. AuraPay"
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Industry / Service Tag</label>
                      <input
                        type="text"
                        value={cs.tag}
                        onChange={(e) => {
                          const updated = [...content.caseStudies];
                          updated[idx].tag = e.target.value;
                          setContent({ ...content, caseStudies: updated });
                        }}
                        placeholder="e.g. Software & Technology"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-blue-700"
                      />
                    </div>
                  </div>

                  {/* Image input and uploader */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Case Study Showcase Image URL
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={cs.image}
                        onChange={(e) => {
                          const updated = [...content.caseStudies];
                          updated[idx].image = e.target.value;
                          setContent({ ...content, caseStudies: updated });
                        }}
                        placeholder="/images/case_aurapay.svg"
                        className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                      />

                      <label className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, (url) => {
                              const updated = [...content.caseStudies];
                              updated[idx].image = url;
                              setContent({ ...content, caseStudies: updated });
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Results Headline</label>
                    <input
                      type="text"
                      value={cs.headline}
                      onChange={(e) => {
                        const updated = [...content.caseStudies];
                        updated[idx].headline = e.target.value;
                        setContent({ ...content, caseStudies: updated });
                      }}
                      placeholder="e.g. From Low Web Traffic to 450+ Qualified Monthly Inquiries"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Story &amp; Overview</label>
                    <textarea
                      rows={3}
                      value={cs.story}
                      onChange={(e) => {
                        const updated = [...content.caseStudies];
                        updated[idx].story = e.target.value;
                        setContent({ ...content, caseStudies: updated });
                      }}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 leading-relaxed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Client Quote</label>
                      <input
                        type="text"
                        value={cs.quote}
                        onChange={(e) => {
                          const updated = [...content.caseStudies];
                          updated[idx].quote = e.target.value;
                          setContent({ ...content, caseStudies: updated });
                        }}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-600 italic"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Quote Author</label>
                      <input
                        type="text"
                        value={cs.author || ""}
                        onChange={(e) => {
                          const updated = [...content.caseStudies];
                          updated[idx].author = e.target.value;
                          setContent({ ...content, caseStudies: updated });
                        }}
                        placeholder="e.g. Marcus Vance, Founder"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-blue-600 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Factual Metrics (3 Result Pills) */}
                  <div className="pt-2">
                    <label className="block text-[11px] font-semibold text-slate-700 mb-2">
                      Factual Result Metrics (3 Highlights)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(cs.metrics || [
                        { label: "Metric 1", value: "+100%" },
                        { label: "Metric 2", value: "2x" },
                        { label: "Metric 3", value: "Fast" },
                      ]).map((m: any, mIdx: number) => (
                        <div key={mIdx} className="p-3 rounded-lg bg-white border border-slate-200 space-y-2">
                          <div>
                            <span className="text-[10px] text-slate-500 block mb-0.5">Value</span>
                            <input
                              type="text"
                              value={m.value}
                              onChange={(e) => {
                                const updatedStudies = [...content.caseStudies];
                                const updatedMetrics = [...(updatedStudies[idx].metrics || [])];
                                updatedMetrics[mIdx] = { ...updatedMetrics[mIdx], value: e.target.value };
                                updatedStudies[idx].metrics = updatedMetrics;
                                setContent({ ...content, caseStudies: updatedStudies });
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-blue-600 font-bold"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500 block mb-0.5">Label</span>
                            <input
                              type="text"
                              value={m.label}
                              onChange={(e) => {
                                const updatedStudies = [...content.caseStudies];
                                const updatedMetrics = [...(updatedStudies[idx].metrics || [])];
                                updatedMetrics[mIdx] = { ...updatedMetrics[mIdx], label: e.target.value };
                                updatedStudies[idx].metrics = updatedMetrics;
                                setContent({ ...content, caseStudies: updatedStudies });
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-[11px] text-slate-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 8: SETTINGS & WHATSAPP ===================== */}
        {activeTab === "settings" && (
          <div className="rounded-2xl p-6 sm:p-8 bg-white border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Site Settings &amp; Contact Numbers</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Update your active WhatsApp number and contact email linked throughout the site
                </p>
              </div>
              <button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs text-xs flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Settings"}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp Number (Click-to-chat)
                </label>
                <div className="relative">
                  <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={content.siteSettings?.whatsappNumber || "0704692220"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, whatsappNumber: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  All WhatsApp buttons on the site open chat with this number.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-blue-600 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={content.siteSettings?.contactEmail || "raveliantcontact@gmail.com"}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        siteSettings: { ...content.siteSettings, contactEmail: e.target.value },
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Displayed on Navbar, Footer, and Contact section.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Client Availability Status
              </label>
              <input
                type="text"
                value={content.siteSettings?.availableSlots || ""}
                onChange={(e) =>
                  setContent({
                    ...content,
                    siteSettings: { ...content.siteSettings, availableSlots: e.target.value },
                  })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-red-600">Emergency Reset</h4>
                <p className="text-[11px] text-slate-500">Restore all website copy to initial curated defaults</p>
              </div>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
