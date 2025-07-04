import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import logo from '../public/icon/logo.png'
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { FaMoon, FaSun } from "react-icons/fa";
import useTheme from "@/hooks/useTheme";
import Image from "next/image";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
  { name: "Blogs", path: "/blogs" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Re-apply theme class on route change to ensure correct color
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [router.pathname, darkMode]);

  const navbarClasses = `fixed w-full z-50 transition-all duration-300 ${isScrolled
      ? "bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 shadow-md backdrop-blur-sm py-4"
      : "py-6"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className={navbarClasses}>
      <nav className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="cursor-pointer">
          <Image
            src={logo}
            alt="Logo"
            width={300}
            height={300}
            className="w-44"

          />

        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`relative transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${router.pathname === item.path
                ? "text-primary-600 dark:text-primary-400 font-semibold"
                : "text-gray-700 dark:text-gray-300"
                }`}
            >
              {item.name}
              {router.pathname === item.path && (
                <motion.div
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600 dark:bg-primary-400"
                  layoutId="navbar-indicator"
                />
              )}
            </Link>
          ))}
          {/* Theme Toggle Button (Desktop) */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-accent-100 dark:bg-accent-700 hover:bg-accent-200 dark:hover:bg-accent-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-800" />}
          </button>
        </div>
        <div className="flex items-center gap-4">
          {mounted && user && (
            <Link
              href="/dashboard"
              className="px-4 py-2 ml-10 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors rounded-lg"
            >
              <MdDashboard size={20} />
            </Link>
          )}
          {mounted && user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          ) : mounted && !user ? (
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors rounded-lg"
            >
              Login
            </Link>
          ) : (
            <div className="w-16 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {mobileMenuOpen && (
          <div className="container-custom py-4 bg-primary-50 dark:bg-gray-900 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`block px-4 py-2 rounded hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors ${router.pathname === item.path
                  ? "text-primary-600 dark:text-primary-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Theme Toggle Button (Mobile) */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center px-4 py-2 rounded bg-accent-100 dark:bg-accent-700 hover:bg-accent-200 dark:hover:bg-accent-600 transition-colors"
              aria-label="Toggle dark mode"
              style={{ marginTop: 8 }}
            >
              {darkMode ? (
                <>
                  <FaSun className="text-yellow-400 mr-2" /> Light Mode
                </>
              ) : (
                <>
                  <FaMoon className="text-gray-800 mr-2" /> Dark Mode
                </>
              )}
            </button>
            {/* Mobile Dashboard Button */}
            {mounted && user && (
              <Link
                href="/dashboard"
                className="block px-4 py-2 rounded bg-primary-600 text-white text-center hover:bg-primary-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            {/* Mobile Login/Logout */}
            <div className="border-t border-primary-100 dark:border-primary-900 pt-4">
              {mounted && user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900"
                >
                  <FiLogOut size={16} />
                  Logout
                </button>
              ) : mounted && !user ? (
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <div className="w-full h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </header>
  );
};

export default Navbar;
