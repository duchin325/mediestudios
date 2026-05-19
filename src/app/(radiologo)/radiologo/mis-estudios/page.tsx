"use client";

import { useState } from "react";
import { Check, ExternalLink } from "lucide-react";
import { mockEstudios } from "@/lib/mock-data";
import { EstadoEstudio, Prioridad, TipoEstudio } from "@/types";
import type { Estudio } from "@/types";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

// Carlos Ruiz — mayor cantidad de estudiosAsignados en el mock
const RADIOLOGO_ID = "r1";

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

const PRIORIDAD_LABEL: Record<Prioridad, string> = {
  [Prioridad.NORMAL]:  "Normal",
  [Prioridad.URGENTE]: "Urgente",
};

const PRIORIDAD_VARIANT: Record<Prioridad, "normal" | "urgente"> = {
  [Prioridad.NORMAL]:  "normal",
  [Prioridad.URGENTE]: "urgente",
};

function formatFecha(iso: string): string {
  const [year, month, day] = iso.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

export default function MisEstudiosPage() {
  const [estudios, setEstudios] = useState<Estudio[]>(() =>
    mockEstudios
      .filter((e) => e.radiologoId === RADIOLOGO_ID)
      .map((e) => ({ ...e }))
  );
  const [filtroEstado, setFiltroEstado] = useState<"TODOS" | EstadoEstudio>("TODOS");

  function marcarInformado(id: string) {
    setEstudios((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, estado: EstadoEstudio.INFORMADO } : e
      )
    );
  }

  const pendientesInformar = estudios.filter(
    (e) => e.estado === EstadoEstudio.ASIGNADO
  ).length;

  const filtrados = estudios.filter((e) =>
    filtroEstado === "TODOS" ? true : e.estado === filtroEstado
  );

  const columns = [
    {
      key: "paciente",
      header: "Paciente",
      render: (e: Estudio) =>
        e.paciente ? (
          <span className="font-semibold text-gray-900">
            {e.paciente.nombre} {e.paciente.apellido}
          </span>
        ) : (
          "—"
        ),
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
      key: "prioridad",
      header: "Prioridad",
      render: (e: Estudio) => (
        <Badge variant={PRIORIDAD_VARIANT[e.prioridad]}>
          {PRIORIDAD_LABEL[e.prioridad]}
        </Badge>
      ),
    },
    {
      key: "estado",
      header: "Estado",
      render: (e: Estudio) => (
        <Badge variant={ESTADO_VARIANT[e.estado]}>{ESTADO_LABEL[e.estado]}</Badge>
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
    {
      key: "acciones",
      header: "Acciones",
      render: (e: Estudio) =>
        e.estado === EstadoEstudio.ASIGNADO ? (
          <button
            onClick={() => marcarInformado(e.id)}
            className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
          >
            Marcar como informado
          </button>
        ) : (
          <Check className="h-4 w-4 text-gray-300" />
        ),
    },
  ];

  return (
    <div>
      <PageHeader title="Mis estudios" />

      <div className="mb-8 grid grid-cols-3 gap-4">
        <StatCard
          label="Pendientes de informar"
          value={pendientesInformar}
          variant="amber"
        />
        <StatCard
          label="Informados hoy"
          value={1}
          variant="green"
        />
        <StatCard
          label="Total asignados"
          value={estudios.length}
          variant="blue"
        />
      </div>

      <div className="mb-5">
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value as typeof filtroEstado)}
          className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="TODOS">Todos los estados</option>
          <option value={EstadoEstudio.ASIGNADO}>Asignado</option>
          <option value={EstadoEstudio.INFORMADO}>Informado</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={filtrados}
        emptyMessage="No hay estudios que coincidan con el filtro."
      />
    </div>
  );
}
