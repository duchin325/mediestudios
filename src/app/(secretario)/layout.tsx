import DashboardLayout from "@/components/layout/DashboardLayout";
import { Rol } from "@/types";

const user = { nombre: "Ana López", rol: Rol.SECRETARIO };

export default function SecretarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role={Rol.SECRETARIO} user={user}>
      {children}
    </DashboardLayout>
  );
}
