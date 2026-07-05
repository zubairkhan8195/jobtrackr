import { AdminRouteGuard } from "@/components/auth/route-guards";
import { AdminShell } from "@/components/dashboard/app-shell";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminRouteGuard>
      <AdminShell>{children}</AdminShell>
    </AdminRouteGuard>
  );
}
