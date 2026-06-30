import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  density: "comfortable" | "compact";
  setDensity: (density: "comfortable" | "compact") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("synapse-theme-mode");
    if (saved === "light" || saved === "dark") return saved;
    return "light"; // Default to polished high-contrast light theme
  });

  const [density, setDensityState] = useState<"comfortable" | "compact">(() => {
    const saved = localStorage.getItem("synapse-density");
    if (saved === "comfortable" || saved === "compact") return saved;
    return "comfortable";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    localStorage.setItem("synapse-theme-mode", mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setDensity = (newDensity: "comfortable" | "compact") => {
    setDensityState(newDensity);
    localStorage.setItem("synapse-density", newDensity);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, density, setDensity }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
