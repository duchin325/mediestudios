import { EstadoEstudio, Prioridad, Rol, TipoEstudio } from "@/types";

export const ROL_LABELS: Record<Rol, string> = {
  ADMIN: "Administrador",
  SECRETARIO: "Secretario",
  RADIOLOGO: "Radiólogo",
};

export const TIPO_ESTUDIO_LABELS: Record<TipoEstudio, string> = {
  RESONANCIA: "Resonancia",
  RADIOGRAFIA: "Radiografía",
  ECOGRAFIA: "Ecografía",
  TOMOGRAFIA: "Tomografía",
};

export const ESTADO_LABELS: Record<EstadoEstudio, string> = {
  PENDIENTE: "Pendiente",
  ASIGNADO: "Asignado",
  INFORMADO: "Informado",
};

export const PRIORIDAD_LABELS: Record<Prioridad, string> = {
  NORMAL: "Normal",
  URGENTE: "Urgente",
};

export const ROLE_REDIRECT: Record<Rol, string> = {
  ADMIN: "/admin/dashboard",
  SECRETARIO: "/secretario/cargar",
  RADIOLOGO: "/radiologo/mis-estudios",
};
