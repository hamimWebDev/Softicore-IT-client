import { ReactNode, useState } from "react";
import Link from "next/link";
import { FaChartBar, FaCog, FaGraduationCap, FaBlogger, FaBriefcase, FaCode, FaBars, FaTimes } from "react-icons/fa";

const adminSidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <FaChartBar size={28} /> },
  
  { href: "/dashboard/blogs", label: "Blogs", icon: <FaBlogger size={28} /> },
  
  { href: "/dashboard/work", label: "Work", icon: <FaCode size={28} /> },
];

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 mt-16">
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed mt-[66px] top-6 right-4 z-40 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar for desktop & mobile */}
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 py-8 px-4
          transform transition-transform duration-300
          ${sidebarOpen ? "z-50 translate-x-0" : "z-50 translate-x-full"}
          md:static md:translate-x-0 md:flex md:z-20
        `}
        style={{ minHeight: "100vh" }}
      >
        {/* Close button for mobile */}
        <button
          className="md:hidden absolute top-4 left-4 text-gray-700 dark:text-gray-200"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <FaTimes size={24} />
        </button>
        <nav className="flex flex-col gap-2 mt-8 md:mt-0">
          {adminSidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              onClick={() => setSidebarOpen(false)} // close sidebar on mobile after click
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 md:mr-64 p-8 w-full">{children}</div>
    </div>
  );
} 