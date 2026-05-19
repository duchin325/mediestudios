"use client";

import { usePathname } from "next/navigation";

import { getTitleFromPath } from "@/lib/nav";
import { Rol } from "@/types";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface DashboardLayoutProps {
  role: Rol;
  user: { nombre: string; rol: Rol };
  children: React.ReactNode;
}

export default function DashboardLayout({
  role,
  user,
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  return (
    <div className="flex h-screen">
      <Sidebar role={role} user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar title={title} user={user} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
