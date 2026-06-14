import React, { useState } from "react";

export default function ConfigPanel({ onSimulate }) {
  const [sequenceInput, setSequenceInput] = useState("0 1 2 1 5 4");
  const [framesCount, setFramesCount] = useState(3);
  const [algorithm, setAlgorithm] = useState("FIFO");

  const handleSubmit = (e, mode) => {
    e.preventDefault();
    const cleanSequence = sequenceInput
      .replace(/,/g, " ")
      .split(/\s+/)
      .filter((val) => val !== "")
      .map(Number);
    if (cleanSequence.length === 0) return alert("Secuencia vacía.");

    // Pasamos el "mode" (STEP o FULL) a la función padre
    onSimulate({ sequence: cleanSequence, framesCount, algorithm, mode });
  };

  return (
    <form className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
            Secuencia de Referencia
          </label>
          <input
            type="text"
            className="w-full bg-zinc-950/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-zinc-100 font-mono outline-none focus:border-zinc-500 transition-colors"
            value={sequenceInput}
            onChange={(e) => setSequenceInput(e.target.value)}
            placeholder="Ej: 0 1 2..."
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
            Marcos de Página
          </label>
          <select
            className="w-full bg-zinc-950/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-zinc-100 outline-none focus:border-zinc-500 appearance-none"
            value={framesCount}
            onChange={(e) => setFramesCount(Number(e.target.value))}
          >
            {[3, 4, 5, 6].map((num) => (
              <option key={num} value={num} className="bg-zinc-900">
                {num}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
            Algoritmo
          </label>
          <select
            className="w-full bg-zinc-950/50 border border-zinc-700/50 rounded-lg px-4 py-3 text-zinc-100 outline-none focus:border-zinc-500 appearance-none"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="FIFO" className="bg-zinc-900">
              FIFO Normal
            </option>
            <option value="SECOND_CHANCE" className="bg-zinc-900">
              FIFO Segunda Oportunidad
            </option>
            <option
              value="VERSUS"
              className="bg-zinc-900 text-blue-400 font-semibold"
            >
              Modo Versus
            </option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-zinc-800/50">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "STEP")}
          className="px-6 py-2.5 bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-zinc-800 hover:text-white font-medium rounded-lg transition-colors text-sm"
        >
          Ejecutar Paso a Paso
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, "FULL")}
          className="px-6 py-2.5 bg-zinc-100 text-zinc-900 hover:bg-white font-medium rounded-lg transition-colors text-sm"
        >
          Mostrar Resultados
        </button>
      </div>
    </form>
  );
}