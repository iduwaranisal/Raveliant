import { getSiteContent } from "@/actions/contentActions";
import { getProjects } from "@/actions/portfolioActions";
import { getMessages } from "@/actions/contactActions";
import { getSubscribers } from "@/actions/newsletterActions";
import { isAdminAuthenticated } from "@/lib/auth";
import { AdminDashboard } from "./AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const isAuth = await isAdminAuthenticated();

  if (!isAuth) {
    return (
      <AdminDashboard
        isAuthenticated={false}
        initialContent={null}
        initialProjects={[]}
        initialMessages={[]}
        initialSubscribers={[]}
      />
    );
  }

  const [contentRes, projectsRes, messagesRes, subscribersRes] = await Promise.all([
    getSiteContent(),
    getProjects(),
    getMessages(),
    getSubscribers(),
  ]);

  return (
    <AdminDashboard
      isAuthenticated={true}
      initialContent={contentRes.data}
      initialProjects={projectsRes.data}
      initialMessages={messagesRes.data}
      initialSubscribers={subscribersRes.data || []}
    />
  );
}
