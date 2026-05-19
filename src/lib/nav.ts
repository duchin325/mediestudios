import {
  ClipboardList,
  FilePlus,
  FolderOpen,
  History,
  LayoutDashboard,
  ScanLine,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Rol } from "@/types";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const NAV_CONFIG: Record<Rol, NavItem[]> = {
  [Rol.ADMIN]: [
    { icon: LayoutDashboard, label: "Dashboard",   href: "/admin/dashboard"  },
    { icon: ScanLine,        label: "Estudios",     href: "/admin/estudios"   },
    { icon: Stethoscope,     label: "Radiólogos",   href: "/admin/radiologos" },
    { icon: Users,           label: "Pacientes",    href: "/admin/pacientes"  },
    { icon: History,         label: "Historial",    href: "/admin/historial"  },
  ],
  [Rol.SECRETARIO]: [
    { icon: FilePlus,      label: "Cargar estudio", href: "/secretario/cargar"     },
    { icon: ClipboardList, label: "Mis cargas",     href: "/secretario/mis-cargas" },
    { icon: Users,         label: "Pacientes",      href: "/secretario/pacientes"  },
  ],
  [Rol.RADIOLOGO]: [
    { icon: FolderOpen, label: "Mis estudios", href: "/radiologo/mis-estudios" },
  ],
};

const ALL_NAV_ITEMS = Object.values(NAV_CONFIG).flat();

export function getTitleFromPath(pathname: string): string {
  const match = ALL_NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(item.href + "/")
  );
  return match?.label ?? "Panel";
}
