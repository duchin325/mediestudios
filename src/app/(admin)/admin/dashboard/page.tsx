import { mockEstudios, mockHistorial, mockRadiologos } from "@/lib/mock-data";
import { EstadoEstudio, Prioridad, TipoEstudio } from "@/types";
import type { Estudio } from "@/types";
import Badge from "@/components/ui/Badge";
import DataTable from "@/components/ui/DataTable";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

const TIPO_LABEL: Record<TipoEstudio, string> = {
  [TipoEstudio.RESONANCIA]: "Resonancia",
  [TipoEstudio.RADIOGRAFIA]: "Radiografía",
  [TipoEstudio.ECOGRAFIA]: "Ecografía",
  [TipoEstudio.TOMOGRAFIA]: "Tomografía",
};

const ESTADO_LABEL: Record<EstadoEstudio, string> = {
  [EstadoEstudio.PENDIENTE]: "Pendiente",
  [EstadoEstudio.ASIGNADO]: "Asignado",
  [EstadoEstudio.INFORMADO]: "Informado",
};

const ESTADO_VARIANT: Record<EstadoEstudio, "pendiente" | "asignado" | "informado"> = {
  [EstadoEstudio.PENDIENTE]: "pendiente",
  [EstadoEstudio.ASIGNADO]: "asignado",
  [EstadoEstudio.INFORMADO]: "informado",
};

const PRIORIDAD_LABEL: Record<Prioridad, string> = {
  [Prioridad.NORMAL]: "Normal",
  [Prioridad.URGENTE]: "Urgente",
};

const PRIORIDAD_VARIANT: Record<Prioridad, "normal" | "urgente"> = {
  [Prioridad.NORMAL]: "normal",
  [Prioridad.URGENTE]: "urgente",
};

function formatFecha(iso: string): string {
  const [year, month, day] = iso.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}

function getNombreUsuario(usuarioId: string): string {
  const radiologo = mockRadiologos.find((r) => r.usuarioId === usuarioId);
  if (radiologo) return `${radiologo.nombre} ${radiologo.apellido}`;
  if (usuarioId === "u1") return "Administrador";
  if (usuarioId === "u2") return "Secretario";
  return usuarioId;
}

function getNombreEstudio(estudioId: string): string {
  const estudio = mockEstudios.find((e) => e.id === estudioId);
  if (!estudio) return estudioId;
  const tipo = TIPO_LABEL[estudio.tipoEstudio];
  const p = estudio.paciente;
  return p ? `${tipo} · ${p.nombre} ${p.apellido}` : tipo;
}

function getAccion(campo: string, valorNuevo: string): string {
  if (campo === "estado") return `cambió el estado a ${valorNuevo.toLowerCase()}`;
  if (campo === "prioridad") return `marcó la prioridad como ${valorNuevo.toLowerCase()}`;
  return `modificó ${campo}`;
}

const estudiosColumns = [
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
        <span className="text-gray-400">Sin asignar</span>
      ),
  },
];

export default function DashboardPage() {
  const pendientes = mockEstudios.filter((e) => e.estado === EstadoEstudio.PENDIENTE).length;
  const asignados  = mockEstudios.filter((e) => e.estado === EstadoEstudio.ASIGNADO).length;
  const informados = mockEstudios.filter((e) => e.estado === EstadoEstudio.INFORMADO).length;
  const urgentes   = mockEstudios.filter((e) => e.prioridad === Prioridad.URGENTE).length;

  const recientes = [...mockEstudios]
    .sort((a, b) => b.creadoEn.localeCompare(a.creadoEn))
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Pendientes" value={pendientes} variant="amber" />
        <StatCard label="Asignados"  value={asignados}  variant="blue"  />
        <StatCard label="Informados" value={informados} variant="green" />
        <StatCard label="Urgentes"   value={urgentes}   variant="red"   />
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Estudios recientes</h3>
        <DataTable columns={estudiosColumns} data={recientes} />
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Actividad reciente</h3>
        <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
          {mockHistorial.map((item) => (
            <li key={item.id} className="px-4 py-3">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{getNombreUsuario(item.usuarioId)}</span>{" "}
                {getAccion(item.campoModificado, item.valorNuevo)}{" "}
                <span className="text-gray-500">en {getNombreEstudio(item.estudioId)}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400">{formatFecha(item.fecha)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
