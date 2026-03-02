import React from 'react';
import { motion } from 'framer-motion';

interface CompassProps {
    e: number;
    g: number;
}

export const PoliticalCompass = ({ e, g }: CompassProps) => {
    // Invertendo Eixo X (Capitalismo na direita = menor "e" no cálculo = 100 - e)
    const posX = 100 - e;
    // Eixo Y: g é Liberdade. No CSS, top: 0% é o topo (Autoritário), top: 100% é o fundo (Libertário).
    // Portanto, se g=0 (Autoridade total), posY=0. Se g=100 (Liberdade total), posY=100.
    const posY = g;

    // Alguns ícones famosos para referência no mapa (baseados em data.ts invertidos % e descritos)
    const landmarks = [
        { name: 'Karl Marx', x: 20, y: 15, color: '#ef4444' }, // Comunista, Autoritário (Top-Left)
        { name: 'Joseph Stalin', x: 5, y: 5, color: '#b91c1c' }, // Extrema-Esquerda, Extremo-Auth
        { name: 'Milton Friedman', x: 80, y: 85, color: '#f59e0b' }, // Capitalista, Libertário (Bottom-Right)
        { name: 'Murray Rothbard', x: 95, y: 95, color: '#d97706' }, // Anarco-Capitalista
        { name: 'Augusto Pinochet', x: 80, y: 10, color: '#1d4ed8' }, // Capitalista, Autoritário (Top-Right)
        { name: 'Mahatma Gandhi', x: 30, y: 80, color: '#10b981' }, // Socialista, Pacifista/Libertário (Bottom-Left)
        { name: 'Bernie Sanders', x: 35, y: 60, color: '#3b82f6' }, // Social Democrata
        { name: 'J. F. Kennedy', x: 60, y: 40, color: '#eab308' }, // Liberal Centrista
    ];

    return (
        <div className="w-full flex flex-col items-center">
            <div className="text-center mb-4">
                <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
                    Sua bússola política
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide mt-0.5">
                    Eixo econômico vs. Eixo de autoridade
                </p>
            </div>

            <div className="relative w-full aspect-square border-4 border-gray-900 dark:border-gray-100 rounded-lg overflow-hidden shadow-2xl bg-white dark:bg-gray-900">

                {/* Quadrantes (Cores Clássicas) */}
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500/20 dark:bg-red-500/30" /> {/* Top Left: Auth-Left */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/20 dark:bg-blue-500/30" /> {/* Top Right: Auth-Right */}
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-green-500/20 dark:bg-green-500/30" /> {/* Bottom Left: Lib-Left */}
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500/20 dark:bg-yellow-500/30" /> {/* Bottom Right: Lib-Right */}

                {/* Eixos Grid Intermediários (Opcional, dá aspecto de folha milimetrada) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:10%_10%]" />

                {/* Eixo Central Vertical (Y) */}
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-900 dark:bg-gray-100 z-10 transform -translate-x-1/2" />
                {/* Eixo Central Horizontal (X) */}
                <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-900 dark:bg-gray-100 z-10 transform -translate-y-1/2" />

                {/* Labels Extremos - Eixo Y (Autoridade/Governo) */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-gray-800 dark:text-gray-200 z-20 bg-white/70 dark:bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm border border-gray-100 dark:border-gray-800">
                    Autoritário
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[11px] font-bold text-gray-800 dark:text-gray-200 z-20 bg-white/70 dark:bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm border border-gray-100 dark:border-gray-800">
                    Libertário
                </div>

                {/* Labels Extremos - Eixo X (Economia) */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-800 dark:text-gray-200 z-20 bg-white/70 dark:bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm border border-gray-100 dark:border-gray-800 origin-center -rotate-90 md:rotate-0">
                    Esquerda
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-bold text-gray-800 dark:text-gray-200 z-20 bg-white/70 dark:bg-black/50 px-2 py-0.5 rounded backdrop-blur-sm shadow-sm border border-gray-100 dark:border-gray-800 origin-center rotate-90 md:rotate-0">
                    Direita
                </div>

                {/* Pins Históricos (Landmarks) */}
                {landmarks.map((mark, i) => (
                    <div
                        key={i}
                        className="absolute z-20 group"
                        style={{ left: `${mark.x}%`, top: `${mark.y}%`, transform: 'translate(-50%, -50%)' }}
                        title={mark.name}
                    >
                        <div
                            className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full opacity-40 group-hover:opacity-100 transition-all cursor-crosshair border border-white dark:border-gray-900 shadow-sm"
                            style={{ backgroundColor: mark.color }}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                            <div className="bg-gray-900 dark:bg-gray-100 dark:text-gray-900 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl font-bold">
                                {mark.name}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Pino do Usuário */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.5 }}
                    className="absolute z-30"
                    style={{ left: `${posX}%`, top: `${posY}%`, transform: 'translate(-50%, -50%)' }}
                >
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75 bg-blue-500 scale-150" />
                    <div className="relative w-6 h-6 bg-blue-600 dark:bg-blue-500 border-2 border-white dark:border-gray-800 rounded-full shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                    </div>

                    {/* Label do Usuário com correção de overflow */}
                    <div className={`absolute left-1/2 -translate-x-1/2 px-2 py-0.5 rounded backdrop-blur-md shadow-lg font-black text-[11px] whitespace-nowrap border-2 z-40 transition-all
                        ${posY < 15 ? 'top-full mt-2' : 'bottom-full mb-3'}
                        ${posX < 15 ? 'translate-x-0 left-0' : (posX > 85 ? '-translate-x-full left-full' : '-translate-x-1/2 left-1/2')}
                        bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-500
                    `}>
                        VOCÊ
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
