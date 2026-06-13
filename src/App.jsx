import React, { useState } from "react";
import ConfigPanel from "./components/ConfigPanel";
import VisualTable from "./components/VisualTable";
import { simulateFIFO, simulateSecondChance } from "./utils/pageReplacement";

export default function App() {
  const [simulationData, setSimulationData] = useState({
    isActive: false,
    isVersusMode: false,
    mode: "FULL",
    currentStep: 0,
    totalSteps: 0,
    result: [],
    resultVersusFIFO: [],
    resultVersusSC: [],
    framesCount: 3,
    algorithm: "FIFO",
  });

  const handleSimulate = ({ sequence, framesCount, algorithm, mode }) => {
    const totalSteps = sequence.length;
    const initialStep = mode === "STEP" ? 1 : totalSteps;

    if (algorithm === "VERSUS") {
      setSimulationData({
        isActive: true,
        isVersusMode: true,
        mode,
        currentStep: initialStep,
        totalSteps,
        resultVersusFIFO: simulateFIFO(sequence, framesCount),
        resultVersusSC: simulateSecondChance(sequence, framesCount),
        framesCount,
        algorithm,
      });
    } else {
      setSimulationData({
        isActive: true,
        isVersusMode: false,
        mode,
        currentStep: initialStep,
        totalSteps,
        result:
          algorithm === "FIFO"
            ? simulateFIFO(sequence, framesCount)
            : simulateSecondChance(sequence, framesCount),
        framesCount,
        algorithm,
      });
    }
  };

  const handleNextStep = () => {
    setSimulationData((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps),
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:p-8 flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-zinc-800/30 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto space-y-10 flex-grow w-full">
        <header className="py-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight">
              Simulador de Memoria
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Sistemas Operativos - Algoritmos de Reemplazo
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs font-mono bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800 text-zinc-400">
              Grupo 3
            </span>
          </div>
        </header>

        <main className="space-y-10">
          <ConfigPanel onSimulate={handleSimulate} />

          {/* BOTÓN DE SIGUIENTE PASO (Solo visible en modo STEP si hay pasos pendientes) */}
          {simulationData.isActive &&
            simulationData.mode === "STEP" &&
            simulationData.currentStep < simulationData.totalSteps && (
              <div className="flex justify-center mt-2 animate-in fade-in zoom-in duration-300">
                <button
                  onClick={handleNextStep}
                  className="group flex items-center gap-3 px-8 py-3 bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-500/50 font-medium rounded-full transition-all"
                >
                  <span>
                    Avanzar al Paso {simulationData.currentStep + 1} de{" "}
                    {simulationData.totalSteps}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </div>
            )}

          {/* TABLAS VISUALES (Se les pasa un slice del array original para ocultar el futuro) */}
          {simulationData.isActive &&
            (simulationData.isVersusMode ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
                    Rendimiento: FIFO Normal
                  </h2>
                  <VisualTable
                    result={simulationData.resultVersusFIFO.slice(
                      0,
                      simulationData.currentStep,
                    )}
                    framesCount={simulationData.framesCount}
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-zinc-200 border-b border-zinc-800 pb-2">
                    Rendimiento: Segunda Oportunidad
                  </h2>
                  <VisualTable
                    result={simulationData.resultVersusSC.slice(
                      0,
                      simulationData.currentStep,
                    )}
                    framesCount={simulationData.framesCount}
                  />
                </div>
              </div>
            ) : (
              <VisualTable
                result={simulationData.result.slice(
                  0,
                  simulationData.currentStep,
                )}
                framesCount={simulationData.framesCount}
              />
            ))}
        </main>
      </div>

      {/* Footer*/}
      <footer className="max-w-6xl mx-auto w-full mt-16 pt-8 border-t border-zinc-800/60 pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/logo-unmsm.png"
              alt="Logo UNMSM"
              className="w-12 h-14 object-contain opacity-80 grayscale hover:grayscale-0 transition-all duration-300"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div>
              <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider">
                Universidad Nacional Mayor de San Marcos
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Facultad de Ingeniería de Sistemas e Informática - 5to Ciclo
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4 w-full md:w-auto">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 border-b border-zinc-800 pb-2">
              Integrantes - Grupo 3
            </h4>
            <ul className="space-y-1.5">
              <li className="flex justify-between gap-8 text-sm">
                <span className="text-zinc-300">
                  Luis Mario Saldaña Sánchez
                </span>
                <span className="text-zinc-500 font-mono text-xs">
                  24200038
                </span>
              </li>
              <li className="flex justify-between gap-8 text-sm">
                <span className="text-zinc-300">
                  Sebastian Emanuel Quezada Pairazaman
                </span>
                <span className="text-zinc-500 font-mono text-xs">
                  24200030
                </span>
              </li>
              <li className="flex justify-between gap-8 text-sm">
                <span className="text-zinc-300">
                  Ariana Milagros Cardenas Huaman
                </span>
                <span className="text-zinc-500 font-mono text-xs">
                  24200093
                </span>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
