import React from "react";

export default function VisualTable({ result, framesCount }) {
  if (!result || result.length === 0) return null;

  const totalFaults = result.filter((step) => step.isFault).length;
  const totalHits = result.length - totalFaults;
  const rows = Array.from({ length: framesCount }, (_, i) => i);

  // Función de Gradiente Visual: Índice 0 es la más nueva, Índice final es la más vieja
  const getAgingStyle = (rowIndex) => {
    if (rowIndex === 0) return "text-zinc-100 font-bold"; // Reciente
    if (rowIndex === 1) return "text-zinc-300";
    if (rowIndex === framesCount - 1) return "text-zinc-600 opacity-50"; // A punto de salir
    return "text-zinc-400"; // Intermedias
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex gap-4">
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl px-6 py-4 flex items-center gap-4">
          <span className="text-zinc-400 text-sm font-medium">Fallos:</span>
          <span className="text-2xl font-semibold text-red-400">
            {totalFaults}
          </span>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl px-6 py-4 flex items-center gap-4">
          <span className="text-zinc-400 text-sm font-medium">Aciertos:</span>
          <span className="text-2xl font-semibold text-emerald-400">
            {totalHits}
          </span>
        </div>
      </div>

      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider bg-zinc-950/80 sticky left-0 z-10 border-b border-zinc-800 min-w-[100px]">
                  Página
                </th>
                {result.map((step, idx) => (
                  <th
                    key={idx}
                    className="p-4 text-center border-b border-zinc-800 bg-zinc-900/20 text-zinc-300 font-mono text-lg min-w-[60px]"
                  >
                    {step.page}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {rows.map((rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-zinc-800/20 transition-colors"
                >
                  <td className="p-4 text-xs font-medium text-zinc-500 bg-zinc-950/80 sticky left-0 z-10">
                    Marco {rowIndex + 1}
                  </td>
                  {result.map((step, stepIdx) => {
                    const pageInFrame = step.frames[rowIndex];
                    // Si es la última columna (el paso actual), le ponemos un fondo especial suave
                    const isLatestStep = stepIdx === result.length - 1;

                    return (
                      <td
                        key={stepIdx}
                        className={`p-4 text-center font-mono relative transition-all ${isLatestStep ? "bg-zinc-800/30" : ""}`}
                      >
                        {pageInFrame !== null ? (
                          <span
                            className={`text-sm transition-colors duration-300 ${getAgingStyle(rowIndex)}`}
                          >
                            {pageInFrame}
                          </span>
                        ) : (
                          <span className="text-zinc-800">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr>
                <td className="p-4 text-xs font-medium text-zinc-500 bg-zinc-950/80 sticky left-0 z-10">
                  Estado
                </td>
                {result.map((step, idx) => (
                  <td key={idx} className="p-3 text-center">
                    {step.isFault ? (
                      <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        Fallo
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Hit
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}