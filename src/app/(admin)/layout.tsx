import DashboardLayout from "@/components/layout/DashboardLayout";
import { Rol } from "@/types";

const user = { nombre: "Dr. Martínez", rol: Rol.ADMIN };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role={Rol.ADMIN} user={user}>
      {children}
    </DashboardLayout>
  );
}
