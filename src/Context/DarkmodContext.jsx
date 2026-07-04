import { createContext, useState, useContext } from "react";
const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [Darkmod, setDarkmod] = useState(() => {
    const DarkTheme = localStorage.getItem("Dark_theme");
    return DarkTheme !== null ? DarkTheme === "true" : false;
  });

  const toggleTheme = () => {
    const nextToggle = !Darkmod;
    setDarkmod(nextToggle);
    localStorage.setItem("Dark_theme", nextToggle);
  };

  return (
    <ThemeContext.Provider value={{ Darkmod, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext);
}
