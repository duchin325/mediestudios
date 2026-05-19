import { cn } from "@/lib/utils";

type BadgeVariant =
  | "pendiente"
  | "asignado"
  | "informado"
  | "urgente"
  | "normal"
  | "tipo";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  pendiente: "bg-yellow-100 text-yellow-800",
  asignado:  "bg-blue-100   text-blue-800",
  informado: "bg-green-100  text-green-800",
  urgente:   "bg-red-100    text-red-700",
  normal:    "bg-gray-100   text-gray-600",
  tipo:      "bg-violet-100 text-violet-800",
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 font-medium",
        "text-[11px] leading-none",
        VARIANT_CLASSES[variant]
      )}
    >
      {children}
    </span>
  );
}
