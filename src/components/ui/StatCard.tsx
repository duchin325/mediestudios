import { cn } from "@/lib/utils";

type StatVariant = "blue" | "amber" | "green" | "red";

interface StatCardProps {
  label: string;
  value: string | number;
  variant: StatVariant;
}

const VALUE_COLOR: Record<StatVariant, string> = {
  blue:  "text-blue-600",
  amber: "text-amber-600",
  green: "text-green-600",
  red:   "text-red-600",
};

export default function StatCard({ label, value, variant }: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className={cn("mt-1 text-[28px] font-semibold leading-none", VALUE_COLOR[variant])}>
        {value}
      </p>
    </div>
  );
}
