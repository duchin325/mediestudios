// ─── Enums ───────────────────────────────────────────────────────────────────

export enum Rol {
  ADMIN = "ADMIN",
  SECRETARIO = "SECRETARIO",
  RADIOLOGO = "RADIOLOGO",
}

export enum TipoEstudio {
  RESONANCIA = "RESONANCIA",
  RADIOGRAFIA = "RADIOGRAFIA",
  ECOGRAFIA = "ECOGRAFIA",
  TOMOGRAFIA = "TOMOGRAFIA",
}

export enum EstadoEstudio {
  PENDIENTE = "PENDIENTE",
  ASIGNADO = "ASIGNADO",
  INFORMADO = "INFORMADO",
}

export enum Prioridad {
  NORMAL = "NORMAL",
  URGENTE = "URGENTE",
}

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface Usuario {
  id: string;
  email: string;
  rol: Rol;
  activo: boolean;
}

export interface Radiologo {
  id: string;
  usuarioId: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  activo: boolean;
  estudiosAsignados?: number;
  estudiosInformados?: number;
}

export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  fechaNacimiento: string;
  telefono?: string;
  creadoEn: string;
  cantidadEstudios?: number;
}

export interface Estudio {
  id: string;
  pacienteId: string;
  paciente?: Paciente;
  radiologoId?: string;
  radiologo?: Radiologo;
  tipoEstudio: TipoEstudio;
  linkEstudio: string;
  fechaEstudio: string;
  estado: EstadoEstudio;
  prioridad: Prioridad;
  observaciones?: string;
  cargadoPorId: string;
  creadoEn: string;
  informadoEn?: string;
}

export interface HistorialEstudio {
  id: string;
  estudioId: string;
  usuarioId: string;
  usuario?: Usuario;
  campoModificado: string;
  valorAnterior: string;
  valorNuevo: string;
  fecha: string;
}
