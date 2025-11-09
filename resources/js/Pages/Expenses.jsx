import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import NavBar from "@/components/NavBar";

export default function Expenses() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");


  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-auto">
        <NavBar setSidebarOpen={setSidebarOpen} />
        <main className="p-6 md:p-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-1">Expenses</h2>
          </div>
        </main>
      </div>
    </div>
  );
}
