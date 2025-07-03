import { setTheme } from "@/redux/themeSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useTheme = () => {
  const dispatch = useDispatch();

  // Initialize theme on mount - always use dark mode
  useEffect(() => {
    // Always set to dark mode
    dispatch(setTheme(true));
    
    // Always add dark class to document
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, [dispatch]);

  return {
    darkMode: true, // Always return true for dark mode
  };
};

export default useTheme;
