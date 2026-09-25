import { getSiteContent } from "@/actions/contentActions";
import { getProjects } from "@/actions/portfolioActions";
import { getMessages } from "@/actions/contactActions";
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
      />
    );
  }

  const [contentRes, projectsRes, messagesRes] = await Promise.all([
    getSiteContent(),
    getProjects(),
    getMessages(),
  ]);

  return (
    <AdminDashboard
      isAuthenticated={true}
      initialContent={contentRes.data}
      initialProjects={projectsRes.data}
      initialMessages={messagesRes.data}
    />
  );
}
