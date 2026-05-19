"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { mockEstudios } from "@/lib/mock-data";
import { EstadoEstudio, TipoEstudio } from "@/types";
import type { Estudio } from "@/types";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";

const SECRETARIO_ID = "u2";

const TIPO_LABEL: Record<TipoEstudio, string> = {
  [TipoEstudio.RESONANCIA]:  "Resonancia",
  [TipoEstudio.RADIOGRAFIA]: "Radiografía",
  [TipoEstudio.ECOGRAFIA]:   "Ecografía",
  [TipoEstudio.TOMOGRAFIA]:  "Tomografía",
};

const ESTADO_LABEL: Record<EstadoEstudio, string> = {
  [EstadoEstudio.PENDIENTE]: "Pendiente",
  [EstadoEstudio.ASIGNADO]:  "Asignado",
  [EstadoEstudio.INFORMADO]: "Informado",
};

const ESTADO_VARIANT: Record<EstadoEstudio, "pendiente" | "asignado" | "informado"> = {
  [EstadoEstudio.PENDIENTE]: "pendiente",
  [EstadoEstudio.ASIGNADO]:  "asignado",
  [EstadoEstudio.INFORMADO]: "informado",
};

function formatFecha(iso: string): string {
  const [year, month, day] = iso.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

const columns = [
  {
    key: "paciente",
    header: "Paciente",
    render: (e: Estudio) =>
      e.paciente ? `${e.paciente.nombre} ${e.paciente.apellido}` : "—",
  },
  {
    key: "tipo",
    header: "Tipo",
    render: (e: Estudio) => (
      <Badge variant="tipo">{TIPO_LABEL[e.tipoEstudio]}</Badge>
    ),
  },
  {
    key: "fecha",
    header: "Fecha",
    render: (e: Estudio) => formatFecha(e.fechaEstudio),
  },
  {
    key: "estado",
    header: "Estado",
    render: (e: Estudio) => (
      <Badge variant={ESTADO_VARIANT[e.estado]}>{ESTADO_LABEL[e.estado]}</Badge>
    ),
  },
  {
    key: "radiologo",
    header: "Radiólogo asignado",
    render: (e: Estudio) =>
      e.radiologo ? (
        `${e.radiologo.nombre} ${e.radiologo.apellido}`
      ) : (
        <span className="text-gray-400">Pendiente de asignación</span>
      ),
  },
  {
    key: "link",
    header: "Link",
    render: (e: Estudio) => (
      <a
        href={e.linkEstudio}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex text-gray-400 hover:text-blue-600"
        aria-label="Abrir estudio"
      >
        <ExternalLink className="h-4 w-4" />
      </a>
    ),
  },
];

export default function MisCargasPage() {
  const [filtroEstado, setFiltroEstado] = useState<"TODOS" | EstadoEstudio>("TODOS");

  const misEstudios = mockEstudios.filter((e) => e.cargadoPorId === SECRETARIO_ID);

  const filtrados = misEstudios.filter((e) =>
    filtroEstado === "TODOS" ? true : e.estado === filtroEstado
  );

  return (
    <div>
      <PageHeader title="Mis cargas" />

      <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
        Solo podés ver los estudios que vos cargaste.
      </div>

      <div className="mb-5">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value as typeof filtroEstado)}
          className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="TODOS">Todos los estados</option>
          <option value={EstadoEstudio.PENDIENTE}>Pendiente</option>
          <option value={EstadoEstudio.ASIGNADO}>Asignado</option>
          <option value={EstadoEstudio.INFORMADO}>Informado</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtrados}
        emptyMessage="No tenés estudios cargados con ese estado."
      />
    </div>
  );
}
