"use client";

import { useState } from "react";
import { mockPacientes } from "@/lib/mock-data";
import { Prioridad, TipoEstudio } from "@/types";
import PageHeader from "@/components/ui/PageHeader";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-xs font-medium text-gray-700">
      {children}
    </label>
  );
}

const selectClass =
  "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500";

const inputClass =
  "w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function CargarEstudioPage() {
  const [pacienteId,    setPacienteId]    = useState("");
  const [nuevoNombre,   setNuevoNombre]   = useState("");
  const [nuevoApellido, setNuevoApellido] = useState("");
  const [nuevoDni,      setNuevoDni]      = useState("");
  const [tipoEstudio,   setTipoEstudio]   = useState("");
  const [fechaEstudio,  setFechaEstudio]  = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [linkEstudio,   setLinkEstudio]   = useState("");
  const [prioridad,     setPrioridad]     = useState<Prioridad>(Prioridad.NORMAL);
  const [observaciones, setObservaciones] = useState("");
  const [exito,         setExito]         = useState(false);

  const esNuevoPaciente = pacienteId === "NUEVO";

  function handleSubmit() {
    setExito(true);
    setPacienteId("");
    setNuevoNombre("");
    setNuevoApellido("");
    setNuevoDni("");
    setTipoEstudio("");
    setFechaEstudio(new Date().toISOString().split("T")[0]);
    setLinkEstudio("");
    setPrioridad(Prioridad.NORMAL);
    setObservaciones("");
  }

  return (
    <div>
      <PageHeader title="Cargar estudio" />

      <div className="max-w-xl space-y-5">

        {/* Paciente */}
        <div>
          <Label>Paciente</Label>
          <select
            value={pacienteId}
            onChange={(e) => { setPacienteId(e.target.value); setExito(false); }}
            className={selectClass}
          >
            <option value="">Seleccionar paciente...</option>
            {mockPacientes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} {p.apellido}
              </option>
            ))}
            <option value="NUEVO">+ Nuevo paciente</option>
          </select>

          {esNuevoPaciente && (
            <div className="mt-3 space-y-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-4">
              <p className="text-xs font-semibold text-blue-700">Nuevo paciente</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Nombre</Label>
                  <input
                    type="text"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div>
                  <Label>Apellido</Label>
                  <input
                    type="text"
                    value={nuevoApellido}
                    onChange={(e) => setNuevoApellido(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <Label>DNI</Label>
                <input
                  type="text"
                  value={nuevoDni}
                  onChange={(e) => setNuevoDni(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tipo */}
        <div>
          <Label>Tipo de estudio</Label>
          <select
            value={tipoEstudio}
            onChange={(e) => { setTipoEstudio(e.target.value); setExito(false); }}
            className={selectClass}
          >
            <option value="">Seleccionar tipo...</option>
            <option value={TipoEstudio.RESONANCIA}>Resonancia</option>
            <option value={TipoEstudio.RADIOGRAFIA}>Radiografía</option>
            <option value={TipoEstudio.ECOGRAFIA}>Ecografía</option>
            <option value={TipoEstudio.TOMOGRAFIA}>Tomografía</option>
          </select>
        </div>

        {/* Fecha */}
        <div>
          <Label>Fecha del estudio</Label>
          <input
            type="date"
            value={fechaEstudio}
            onChange={(e) => { setFechaEstudio(e.target.value); setExito(false); }}
            className={inputClass}
          />
        </div>

        {/* Link */}
        <div>
          <Label>Link del estudio</Label>
          <input
            type="url"
            placeholder="https://..."
            value={linkEstudio}
            onChange={(e) => { setLinkEstudio(e.target.value); setExito(false); }}
            className={`${inputClass} placeholder:text-gray-400`}
          />
        </div>

        {/* Prioridad */}
        <div>
          <Label>Prioridad</Label>
          <select
            value={prioridad}
            onChange={(e) => { setPrioridad(e.target.value as Prioridad); setExito(false); }}
            className={selectClass}
          >
            <option value={Prioridad.NORMAL}>Normal</option>
            <option value={Prioridad.URGENTE}>Urgente</option>
          </select>
        </div>

        {/* Observaciones */}
        <div>
          <Label>
            Observaciones{" "}
            <span className="font-normal text-gray-400">(opcional)</span>
          </Label>
          <textarea
            rows={3}
            value={observaciones}
            onChange={(e) => { setObservaciones(e.target.value); setExito(false); }}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Submit */}
        <div>
          <button
            onClick={handleSubmit}
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Cargar estudio
          </button>

          {exito && (
            <p className="mt-3 text-sm font-medium text-green-600">
              Estudio cargado correctamente.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
