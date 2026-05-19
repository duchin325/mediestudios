"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { mockRadiologos } from "@/lib/mock-data";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import PageHeader from "@/components/ui/PageHeader";

function Avatar({ nombre, apellido }: { nombre: string; apellido: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
      {nombre[0]}{apellido[0]}
    </div>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-gray-700">{label}</label>
      <input
        type={type}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default function RadiologosPage() {
  const [modalNuevo, setModalNuevo] = useState(false);

  return (
    <div>
      <PageHeader
        title="Radiólogos"
        action={
          <button
            onClick={() => setModalNuevo(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Nuevo radiólogo
          </button>
        }
      />

      <ul className="space-y-3">
        {mockRadiologos.map((r) => (
          <li
            key={r.id}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-4"
          >
            <div className="flex items-center gap-4">
              <Avatar nombre={r.nombre} apellido={r.apellido} />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">
                    {r.nombre} {r.apellido}
                  </p>
                  <Badge variant={r.activo ? "informado" : "normal"}>
                    {r.activo ? "activo" : "inactivo"}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-gray-400">Diagnóstico por imágenes</p>
                <div className="mt-1.5 flex gap-4 text-xs font-medium">
                  <span className="text-blue-600">
                    {r.estudiosAsignados ?? 0} asignados
                  </span>
                  <span className="text-green-600">
                    {r.estudiosInformados ?? 0} informados
                  </span>
                </div>
              </div>
            </div>

            <button
              className="rounded-md p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              aria-label="Editar radiólogo"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalNuevo}
        onClose={() => setModalNuevo(false)}
        title="Nuevo radiólogo"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre" />
            <Field label="Apellido" />
          </div>
          <Field label="Especialidad" />
          <Field label="Teléfono" type="tel" />
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
