import { UserRouteGuard } from "@/components/auth/route-guards";
import { DashboardShell } from "@/components/dashboard/app-shell";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserRouteGuard>
      <DashboardShell>{children}</DashboardShell>
    </UserRouteGuard>
  );
}
