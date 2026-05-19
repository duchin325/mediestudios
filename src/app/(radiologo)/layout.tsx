import DashboardLayout from "@/components/layout/DashboardLayout";
import { Rol } from "@/types";

const user = { nombre: "Dr. Pérez", rol: Rol.RADIOLOGO };

export default function RadiologoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout role={Rol.RADIOLOGO} user={user}>
      {children}
    </DashboardLayout>
  );
}
