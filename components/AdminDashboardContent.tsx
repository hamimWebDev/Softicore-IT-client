import PrivateRoute from "@/pages/utils/PrivateRoute";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { FaCog, FaGraduationCap, FaBlogger, FaBriefcase, FaCode, FaUsers, FaHSquare, FaHandshake, FaUserPlus } from "react-icons/fa";

const quickLinks = [
  { href: "/dashboard/blogs", label: "Manage Blogs", icon: <FaBlogger size={28} /> },
  { href: "/dashboard/work", label: "Manage Work", icon: <FaCode size={28} /> },
  { href: "/dashboard/team", label: "Manage Team", icon: <FaUsers size={28} /> },
  { href: "/dashboard/clients", label: "Manage Clients", icon: <FaHandshake size={28} /> },
  { href: "/dashboard/create-admin", label: "Create Admin", icon: <FaUserPlus size={28} /> },
];

const AdminDashboardContent = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <PrivateRoute allowedRoles={["admin"]}>
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
              Welcome, <span className="text-blue-600">{user?.name || "Admin"}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              This is your admin dashboard. Use the quick links below to manage your portfolio content.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3">
              <FaCog size={32} className="text-blue-600" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl shadow bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900 transition border border-gray-200 dark:border-gray-700"
            >
              <span>{link.icon}</span>
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AdminDashboardContent; 