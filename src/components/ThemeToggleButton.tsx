"use client";
"use client";
import React, { useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

const options = [
  { label: "Claro", value: "light", icon: <Sun size={18} /> },
  { label: "Escuro", value: "dark", icon: <Moon size={18} /> },
  { label: "Sistema", value: "system", icon: <Monitor size={18} /> },
];

export function ThemeToggleButton() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system";
    }
    return "system";
  });
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeChange = (value: string) => {
    setTheme(value);
    setOpen(false);
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (value === "dark") {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else if (value === "light") {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        localStorage.setItem("theme", "system");
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          html.classList.add("dark");
        } else {
          html.classList.remove("dark");
        }
      }
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Alternar tema"
        className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-2 shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition flex items-center justify-center"
        onClick={() => setOpen((v) => !v)}
      >
        {mounted ? (theme === "dark" ? <Moon size={20} /> : theme === "light" ? <Sun size={20} /> : <Monitor size={20} />) : null}
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
