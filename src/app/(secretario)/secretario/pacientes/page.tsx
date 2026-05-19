"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { mockPacientes } from "@/lib/mock-data";
import type { Paciente } from "@/types";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";

function formatFecha(iso: string): string {
  const [year, month, day] = iso.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

const columns = [
  {
    key: "nombre",
    header: "Nombre completo",
    render: (p: Paciente) => `${p.nombre} ${p.apellido}`,
  },
  {
    key: "dni",
    header: "DNI",
    render: (p: Paciente) => p.dni,
  },
  {
    key: "fechaNacimiento",
    header: "Fecha de nacimiento",
    render: (p: Paciente) => formatFecha(p.fechaNacimiento),
  },
  {
    key: "telefono",
    header: "Teléfono",
    render: (p: Paciente) =>
      p.telefono ?? <span className="text-gray-400">—</span>,
  },
  {
    key: "estudios",
    header: "Estudios",
    render: (p: Paciente) => (
      <Badge variant="asignado">{p.cantidadEstudios ?? 0}</Badge>
    ),
  },
  {
    key: "acciones",
    header: "Acciones",
    render: (_p: Paciente) => (
      <button
        className="inline-flex text-gray-400 hover:text-blue-600"
        aria-label="Ver detalle"
      >
        <Eye className="h-4 w-4" />
      </button>
    ),
  },
];

export default function PacientesSecretarioPage() {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = mockPacientes.filter((p) => {
    const q = busqueda.toLowerCase();
    return (
      `${p.nombre} ${p.apellido}`.toLowerCase().includes(q) ||
      p.dni.includes(q)
    );
  });

  return (
    <div>
      <PageHeader
        title="Pacientes"
        description="Para dar de alta un paciente nuevo, hacelo desde la pantalla de carga de estudio."
      />

      <div className="mb-5">
        <input
          type="text"
          placeholder="Buscar por nombre o DNI..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full max-w-sm rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtrados}
        emptyMessage="No hay pacientes que coincidan con la búsqueda."
      />
    </div>
  );
}
