import React from 'react';

export default function VisualTable({ result, framesCount, algorithm }) {
  if (!result || result.length === 0) return null;

  const totalFaults = result.filter(step => step.isFault).length;
  const totalHits = result.length - totalFaults;
  const rows = Array.from({ length: framesCount }, (_, i) => i);

  return (
    <div className="space-y-6">
      {/* Resumen minimalista */}
      <div className="flex gap-4">
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl px-6 py-4 flex items-center gap-4">
          <span className="text-zinc-400 text-sm font-medium">Fallos de página:</span>
          <span className="text-2xl font-semibold text-red-400">{totalFaults}</span>
        </div>
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl px-6 py-4 flex items-center gap-4">
          <span className="text-zinc-400 text-sm font-medium">Aciertos:</span>
          <span className="text-2xl font-semibold text-emerald-400">{totalHits}</span>
        </div>
      </div>

      {/* Tabla Técnica */}
      <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-xs font-medium text-zinc-500 uppercase tracking-wider bg-zinc-950/80 sticky left-0 z-10 border-b border-zinc-800 min-w-[100px]">
                  Página
                </th>
                {result.map((step, idx) => (
                  <th key={idx} className="p-4 text-center border-b border-zinc-800 bg-zinc-900/20 text-zinc-300 font-mono text-lg min-w-[60px]">
                    {step.page}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {rows.map((rowIndex) => (
                <tr key={rowIndex} className="hover:bg-zinc-800/20 transition-colors">
                  <td className="p-4 text-xs font-medium text-zinc-500 bg-zinc-950/80 sticky left-0 z-10">
                    Marco {rowIndex + 1}
                  </td>
                  {result.map((step, stepIdx) => {
                    const pageInFrame = step.frames[rowIndex];
                    const isPointerHere = algorithm === 'SECOND_CHANCE' && step.pointer === rowIndex;
                    const referenceBit = algorithm === 'SECOND_CHANCE' && step.bits ? step.bits[rowIndex] : null;

                    return (
                      <td key={stepIdx} className={`p-4 text-center font-mono relative ${isPointerHere ? 'bg-zinc-800/40' : ''}`}>
                        {pageInFrame !== null ? (
                          <div className="flex flex-col items-center">
                            <span className={`text-sm ${isPointerHere ? 'text-zinc-100 font-semibold' : 'text-zinc-400'}`}>
                              {pageInFrame}
                            </span>
                            {referenceBit !== null && (
                              <span className="text-[10px] text-zinc-600 mt-0.5">
                                [b:{referenceBit}]
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-zinc-700">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
              
              {/* Resultado */}
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