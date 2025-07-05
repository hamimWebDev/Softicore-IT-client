import { useState, useEffect, useRef } from "react";
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

const pagesDropdown = [
  { name: "Our Team", path: "/our-team" },
  { name: "Our Clients", path: "/our-clients" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false);
  const pagesDropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!isPagesDropdownOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        pagesDropdownRef.current &&
        !pagesDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPagesDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPagesDropdownOpen]);

  // Add keyboard shortcut for login page
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Alt+L is pressed
      if (event.altKey && event.key.toLowerCase() === 'l') {
        event.preventDefault();
        // Only navigate to login if user is not already logged in
        if (!user) {
          router.push('/login');
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router, user]);

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
            width={100}
            height={100}
            className="w-36"

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
          {/* Pages+ Dropdown */}
          <div
            className="relative"
            ref={pagesDropdownRef}
          >
            <button
              className="flex items-center font-semibold text-gray-800 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              onClick={() => setIsPagesDropdownOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={isPagesDropdownOpen}
              tabIndex={0}
              onFocus={() => setIsPagesDropdownOpen(true)}
            >
              Pages <span className="ml-1 text-xl">+</span>
            </button>
            {isPagesDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                {pagesDropdown.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-colors"
                    onClick={() => setIsPagesDropdownOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
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
            <a
              href="https://wa.me/8801768225158"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-all duration-200 rounded-lg items-center gap-2 hover:bg-green-50 dark:hover:bg-green-900/20 transform hover:scale-105"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              Call us-(+880) 1768225158
            </a>
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
            {/* Pages+ Dropdown (Mobile) */}
            <div>
              <button
                className="w-full flex items-center justify-between px-4 py-2 rounded font-semibold text-gray-800 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none bg-transparent"
                onClick={() => setIsMobilePagesOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={isMobilePagesOpen}
              >
                <span>Pages</span>
                <span className="ml-2 text-xl">+</span>
              </button>
              {isMobilePagesOpen && (
                <div className="mt-1 ml-4 flex flex-col space-y-1">
                  {pagesDropdown.map((item) => (
                    <Link
                      key={item.name}
                      href={item.path}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsMobilePagesOpen(false);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
                <a
                  href="https://wa.me/8801768225158"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-all duration-200 rounded-lg gap-2 hover:bg-green-50 dark:hover:bg-green-900/20 transform hover:scale-105"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  Call us-(+880) 1768225158
                </a>
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
