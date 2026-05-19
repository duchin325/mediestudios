"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { mockPacientes } from "@/lib/mock-data";
import type { Paciente } from "@/types";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
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

// ─── Form field ───────────────────────────────────────────────────────────────

function Field({
  label,
  optional,
  type = "text",
}: {
  label: string;
  optional?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-700">
        {label}{" "}
        {optional && <span className="font-normal text-gray-400">(opcional)</span>}
      </label>
      <input
        type={type}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PacientesPage() {
  const [busqueda,   setBusqueda]   = useState("");
  const [modalNuevo, setModalNuevo] = useState(false);

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
        action={
          <button
            onClick={() => setModalNuevo(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Nuevo paciente
          </button>
        }
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

      <Modal
        isOpen={modalNuevo}
        onClose={() => setModalNuevo(false)}
        title="Nuevo paciente"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre" />
            <Field label="Apellido" />
          </div>
          <Field label="DNI" />
          <Field label="Fecha de nacimiento" type="date" />
          <Field label="Teléfono" type="tel" optional />
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setModalNuevo(false)}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => setModalNuevo(false)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
