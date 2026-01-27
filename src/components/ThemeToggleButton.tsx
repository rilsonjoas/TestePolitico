"use client";

import React, { useState, useEffect, useRef } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { uiEvents } from "@/lib/analytics";

const options = [
  { label: "Claro", value: "light", icon: <Sun size={18} /> },
  { label: "Escuro", value: "dark", icon: <Moon size={18} /> },
  { label: "Sistema", value: "system", icon: <Monitor size={18} /> },
];

function applyTheme(value: string) {
  const html = document.documentElement;
  if (value === "dark") {
    html.classList.add("dark");
  } else if (value === "light") {
    html.classList.remove("dark");
  } else {
    // system
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }
}

export function ThemeToggleButton() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("system");
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inicializa o tema ao montar o componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, []);

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    setOpen(false);
    localStorage.setItem("theme", value);
    applyTheme(value);
    
    // Track theme toggle
    uiEvents.themeToggle(value);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label="Alternar tema"
        className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-2 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
      >
        {mounted ? (
          theme === "dark" ? <Moon size={20} /> :
          theme === "light" ? <Sun size={20} /> :
          <Monitor size={20} />
        ) : null}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`flex items-center gap-2 w-full px-4 py-2 text-left text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${theme === opt.value ? "font-bold" : ""}`}
              onClick={() => handleThemeChange(opt.value)}
            >
              {opt.icon}
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
