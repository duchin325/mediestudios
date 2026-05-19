import { mockEstudios, mockHistorial, mockRadiologos } from "@/lib/mock-data";
import { TipoEstudio } from "@/types";
import PageHeader from "@/components/ui/PageHeader";

const TIPO_LABEL: Record<TipoEstudio, string> = {
  [TipoEstudio.RESONANCIA]:  "Resonancia",
  [TipoEstudio.RADIOGRAFIA]: "Radiografía",
  [TipoEstudio.ECOGRAFIA]:   "Ecografía",
  [TipoEstudio.TOMOGRAFIA]:  "Tomografía",
};

function formatFechaHora(iso: string): string {
  const [date, time] = iso.split("T");
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year} ${time.slice(0, 5)}`;
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

function getDescripcion(campo: string, valorAnterior: string, valorNuevo: string): string {
  if (campo === "estado")
    return `cambió el estado de ${valorAnterior.toLowerCase()} a ${valorNuevo.toLowerCase()}`;
  if (campo === "prioridad")
    return `cambió la prioridad de ${valorAnterior.toLowerCase()} a ${valorNuevo.toLowerCase()}`;
  return `modificó ${campo} de ${valorAnterior} a ${valorNuevo}`;
}

export default function HistorialPage() {
  return (
    <div>
      <PageHeader title="Historial de cambios" />

      <ul className="divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white">
        {mockHistorial.map((item) => (
          <li key={item.id} className="flex gap-4 px-5 py-4">
            <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{getNombreUsuario(item.usuarioId)}</span>{" "}
                {getDescripcion(item.campoModificado, item.valorAnterior, item.valorNuevo)}{" "}
                <span className="text-gray-400">— {getNombreEstudio(item.estudioId)}</span>
              </p>
              <p className="mt-0.5 text-[11px] text-gray-400">
                {formatFechaHora(item.fecha)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
