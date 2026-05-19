import { Rol } from "@/types";

interface TopbarProps {
  title: string;
  user: { nombre: string; rol: Rol };
}

function getInitials(nombre: string): string {
  return nombre
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Topbar({ title, user }: TopbarProps) {
  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      <h1 className="text-sm font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{user.nombre}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
          <span className="text-xs font-medium text-white">
            {getInitials(user.nombre)}
          </span>
        </div>
      </div>
    </header>
  );
}
