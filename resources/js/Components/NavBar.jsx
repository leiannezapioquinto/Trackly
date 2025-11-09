import { Menu, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function NavBar({ sidebarOpen, setSidebarOpen }) {
  const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
      const handleStorageChange = () => {
        setTheme(localStorage.getItem("theme") || "light");
      };
      window.addEventListener("storage", handleStorageChange);
      return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 shadow px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 transition"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg font-semibold text-blue-500 md:hidden">
          Trackly
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100 transition"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </header>
  );
}
