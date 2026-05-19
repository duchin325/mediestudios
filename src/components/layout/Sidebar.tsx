"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROL_LABELS } from "@/lib/constants";
import { NAV_CONFIG } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Rol } from "@/types";

interface SidebarProps {
  role: Rol;
  user: { nombre: string; rol: Rol };
}

export default function Sidebar({ role, user }: SidebarProps) {
  const pathname = usePathname();
  const items = NAV_CONFIG[role];

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Brand */}
      <div className="flex h-[60px] items-center border-b border-gray-200 px-6">
        <span className="text-base font-semibold text-gray-900">MedieStudios</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {items.map(({ icon: Icon, label, href }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-gray-200 px-5 py-4">
        <p className="truncate text-sm font-medium text-gray-900">{user.nombre}</p>
        <p className="mt-0.5 text-xs text-gray-500">{ROL_LABELS[user.rol]}</p>
      </div>
    </aside>
  );
}
