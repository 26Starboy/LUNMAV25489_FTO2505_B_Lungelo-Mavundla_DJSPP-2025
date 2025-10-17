import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

/**
 * Provides global theme state (light/dark)
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark"); // default to dark

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
