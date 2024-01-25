import { createContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useContext } from "react";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  // 根据操作系统的默认值来设置，暗黑模式
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-schema: dark)").matches,
    "isDarkMode"
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  // 添加类名
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
      document.documentElement.classList.add("light-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("DarkModeContext 不在 DarkModeProvider 里面 使用 ");
  }

  return context;
}

export { useDarkMode, DarkModeProvider };
