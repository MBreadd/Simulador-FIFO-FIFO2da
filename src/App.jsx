import React, { useState } from 'react';
import ConfigPanel from './components/ConfigPanel';
import VisualTable from './components/VisualTable';
import { simulateFIFO, simulateSecondChance } from './utils/pageReplacement';

export default function App() {
  const [simulationData, setSimulationData] = useState({ result: [], framesCount: 3, algorithm: 'FIFO' });

  const handleSimulate = ({ sequence, framesCount, algorithm }) => {
    let result = algorithm === 'FIFO' 
      ? simulateFIFO(sequence, framesCount) 
      : simulateSecondChance(sequence, framesCount);
    setSimulationData({ result, framesCount, algorithm });
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 md:p-8 flex flex-col">
      {/* Efectos de luz formales y tenues en el fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-zinc-800/30 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto space-y-10 flex-grow w-full">
        {/* Cabecera Principal */}
        <header className="py-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight">
              Simulador de Memoria
            </h1>
            <p className="text-sm text-zinc-400 mt-1">Sistemas Operativos - Algoritmos de Reemplazo</p>
          </div>
          {/* Espacio opcional arriba a la derecha por si quieres destacar el Grupo rápido */}
          <div className="hidden sm:block text-right">
            <span className="text-xs font-mono bg-zinc-900 px-3 py-1.5 rounded-md border border-zinc-800 text-zinc-400">
              Grupo 3
            </span>
          </div>
        </header>

        {/* Contenido Principal (Panel y Tabla) */}
        <main className="space-y-10">
          <ConfigPanel onSimulate={handleSimulate} />
          <VisualTable result={simulationData.result} framesCount={simulationData.framesCount} algorithm={simulationData.algorithm} />
        </main>
      </div>

      {/* NUEVO: Pie de página formal con créditos de la universidad */}
      <footer className="max-w-6xl mx-auto w-full mt-16 pt-8 border-t border-zinc-800/60 pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Sección del Logo y Universidad */}
          <div className="flex items-center gap-4">
            {/* Asegúrate de que la imagen se llame exactamente así en tu carpeta public/ */}
            <img 
              src="/logo-unmsm.png" 
              alt="Logo UNMSM" 
              className="w-12 h-14 object-contain opacity-80 grayscale hover:grayscale-0 transition-all duration-300"
              onError={(e) => e.target.style.display = 'none'} // Oculta la imagen si aún no la has descargado
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

          {/* Sección de Integrantes (Grupo 3) */}
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg p-4 w-full md:w-auto">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3 border-b border-zinc-800 pb-2">
              Integrantes - Grupo 3
            </h4>
            <ul className="space-y-1.5">
              <li className="flex justify-between gap-8 text-sm">
                <span className="text-zinc-300">Luis Mario Saldaña Sánchez</span>
                <span className="text-zinc-500 font-mono text-xs">24200038</span>
              </li>
              <li className="flex justify-between gap-8 text-sm">
                <span className="text-zinc-300">Compañero Dos Apellidos</span>
                <span className="text-zinc-500 font-mono text-xs">22200124</span>
              </li>
              <li className="flex justify-between gap-8 text-sm">
                <span className="text-zinc-300">Compañero Tres Apellidos</span>
                <span className="text-zinc-500 font-mono text-xs">22200125</span>
              </li>
            </ul>
          </div>

        </div>
      </footer>
    </div>
  );
}