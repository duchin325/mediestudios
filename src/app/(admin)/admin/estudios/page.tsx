"use client";

import { useState } from "react";
import { ExternalLink, UserPlus } from "lucide-react";
import { mockEstudios, mockPacientes, mockRadiologos } from "@/lib/mock-data";
import { EstadoEstudio, Prioridad, TipoEstudio } from "@/types";
import type { Estudio, Radiologo } from "@/types";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import Modal from "@/components/ui/Modal";
import PageHeader from "@/components/ui/PageHeader";

// ─── Label maps ───────────────────────────────────────────────────────────────

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

// ─── Select helper ────────────────────────────────────────────────────────────

function FilterSelect({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {children}
    </select>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EstudiosPage() {
  const [estudios, setEstudios] = useState<Estudio[]>(() =>
    mockEstudios.map((e) => ({ ...e }))
  );
  const [filtroEstado,    setFiltroEstado]    = useState<"TODOS" | EstadoEstudio>("TODOS");
  const [filtroTipo,      setFiltroTipo]      = useState<"TODOS" | TipoEstudio>("TODOS");
  const [filtroRadiologo, setFiltroRadiologo] = useState<"TODOS" | string>("TODOS");
  const [modalAsignar,       setModalAsignar]       = useState<Estudio | null>(null);
  const [modalNuevoEstudio,  setModalNuevoEstudio]  = useState(false);

  // ── Filtrado ────────────────────────────────────────────────────────────────
  const filtrados = estudios.filter((e) => {
    if (filtroEstado    !== "TODOS" && e.estado      !== filtroEstado)    return false;
    if (filtroTipo      !== "TODOS" && e.tipoEstudio !== filtroTipo)      return false;
    if (filtroRadiologo !== "TODOS" && e.radiologoId !== filtroRadiologo) return false;
    return true;
  });

  // ── Asignación ──────────────────────────────────────────────────────────────
  function asignarRadiologo(radiologo: Radiologo) {
    if (!modalAsignar) return;
    setEstudios((prev) =>
      prev.map((e) =>
        e.id === modalAsignar.id
          ? { ...e, radiologoId: radiologo.id, radiologo, estado: EstadoEstudio.ASIGNADO }
          : e
      )
    );
    setModalAsignar(null);
  }

  // ── Columnas ────────────────────────────────────────────────────────────────
  const columns = [
    {
      key: "paciente",
      header: "Paciente",
      render: (e: Estudio) =>
        e.paciente ? (
          <div>
            <p className="font-semibold text-gray-900">
              {e.paciente.nombre} {e.paciente.apellido}
            </p>
            <p className="text-[11px] text-gray-400">{e.paciente.dni}</p>
          </div>
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
      key: "estado",
      header: "Estado",
      render: (e: Estudio) => (
        <Badge variant={ESTADO_VARIANT[e.estado]}>{ESTADO_LABEL[e.estado]}</Badge>
      ),
    },
    {
      key: "prioridad",
      header: "Prioridad",
      render: (e: Estudio) => (
        <Badge variant={PRIORIDAD_VARIANT[e.prioridad]}>{PRIORIDAD_LABEL[e.prioridad]}</Badge>
      ),
    },
    {
      key: "radiologo",
      header: "Radiólogo",
      render: (e: Estudio) =>
        e.radiologo ? (
          `${e.radiologo.nombre} ${e.radiologo.apellido}`
        ) : (
          <span className="text-red-300">Sin asignar</span>
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
      render: (e: Estudio) => (
        <button
          onClick={() => setModalAsignar(e)}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600"
          aria-label="Asignar radiólogo"
        >
          <UserPlus className="h-3.5 w-3.5" />
          Asignar
        </button>
      ),
    },
  ];

  // ── Modal title ─────────────────────────────────────────────────────────────
  const modalTitle = modalAsignar
    ? `Asignar radiólogo — ${
        modalAsignar.paciente
          ? `${modalAsignar.paciente.nombre} ${modalAsignar.paciente.apellido}`
          : modalAsignar.id
      } · ${TIPO_LABEL[modalAsignar.tipoEstudio]} · ${formatFecha(modalAsignar.fechaEstudio)}`
    : "";

  return (
    <div>
      <PageHeader
        title="Estudios médicos"
        action={
          <button
            onClick={() => setModalNuevoEstudio(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Nuevo estudio
          </button>
        }
      />

      {/* Filtros */}
      <div className="mb-5 flex flex-wrap gap-3">
        <FilterSelect value={filtroEstado} onChange={(v) => setFiltroEstado(v as typeof filtroEstado)}>
          <option value="TODOS">Todos los estados</option>
          <option value={EstadoEstudio.PENDIENTE}>Pendiente</option>
          <option value={EstadoEstudio.ASIGNADO}>Asignado</option>
          <option value={EstadoEstudio.INFORMADO}>Informado</option>
        </FilterSelect>

        <FilterSelect value={filtroTipo} onChange={(v) => setFiltroTipo(v as typeof filtroTipo)}>
          <option value="TODOS">Todos los tipos</option>
          <option value={TipoEstudio.RESONANCIA}>Resonancia</option>
          <option value={TipoEstudio.RADIOGRAFIA}>Radiografía</option>
          <option value={TipoEstudio.ECOGRAFIA}>Ecografía</option>
          <option value={TipoEstudio.TOMOGRAFIA}>Tomografía</option>
        </FilterSelect>

        <FilterSelect value={filtroRadiologo} onChange={(v) => setFiltroRadiologo(v)}>
          <option value="TODOS">Todos los radiólogos</option>
          {mockRadiologos.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre} {r.apellido}
            </option>
          ))}
        </FilterSelect>
      </div>

      <DataTable columns={columns} data={filtrados} emptyMessage="No hay estudios que coincidan con los filtros." />

      {/* Modal nuevo estudio */}
      <Modal
        isOpen={modalNuevoEstudio}
        onClose={() => setModalNuevoEstudio(false)}
        title="Nuevo estudio"
      >
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Paciente</label>
            <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccionar paciente...</option>
              {mockPacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Tipo de estudio</label>
            <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Seleccionar tipo...</option>
              <option value={TipoEstudio.RESONANCIA}>Resonancia</option>
              <option value={TipoEstudio.RADIOGRAFIA}>Radiografía</option>
              <option value={TipoEstudio.ECOGRAFIA}>Ecografía</option>
              <option value={TipoEstudio.TOMOGRAFIA}>Tomografía</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Fecha del estudio</label>
            <input
              type="date"
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Link del estudio</label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">Prioridad</label>
            <select className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value={Prioridad.NORMAL}>Normal</option>
              <option value={Prioridad.URGENTE}>Urgente</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-700">
              Observaciones <span className="font-normal text-gray-400">(opcional)</span>
            </label>
            <textarea
              rows={3}
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setModalNuevoEstudio(false)}
              className="rounded-md border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={() => setModalNuevoEstudio(false)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>

      {/* Modal asignación */}
      <Modal
        isOpen={modalAsignar !== null}
        onClose={() => setModalAsignar(null)}
        title={modalTitle}
      >
        <ul className="divide-y divide-gray-100">
          {mockRadiologos.map((r) => {
            const esActual = modalAsignar?.radiologoId === r.id;
            return (
              <li key={r.id}>
                <button
                  onClick={() => asignarRadiologo(r)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left hover:bg-gray-50"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {r.nombre} {r.apellido}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {r.estudiosAsignados ?? 0} estudios asignados · {r.estudiosInformados ?? 0} informados
                    </p>
                  </div>
                  {esActual && (
                    <span className="ml-3 shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                      actual
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </Modal>
    </div>
  );
}
