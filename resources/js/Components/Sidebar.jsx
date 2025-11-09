import { Link, useLocation } from "react-router-dom";
import { BarChart3, PieChart, Wallet, Settings, Binary } from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { pathname } = useLocation();

  const links = [
    { name: "Dashboard", path: "/", icon: <BarChart3 size={20} /> },
    { name: "Statistics", path: "/statistics", icon: <PieChart size={20} /> },
    { name: "Expenses", path: "/expenses", icon: <Wallet size={20} /> },
    { name: "Budget", path: "/budget", icon: <Binary size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
        <aside
          className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-900 shadow-lg transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 z-40 overflow-y-auto`}
        >
        <div className="p-4 text-xl font-bold text-blue-400 border-b border-gray-100 dark:border-gray-800">
          Trackly
        </div>

        <nav className="mt-4 space-y-1 pb-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg mx-2 ${
                pathname === link.path
                  ? "bg-blue-400 text-white"
                  : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        ></div>
      )}
    </>
  );
}
