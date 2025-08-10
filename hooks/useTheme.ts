import { setTheme } from "@/redux/themeSlice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);

  // Sync theme with localStorage and document class
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      dispatch(setTheme(true));
      document.documentElement.classList.add("dark");
    } else if (storedTheme === "light") {
      dispatch(setTheme(false));
      document.documentElement.classList.remove("dark");
    }
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    dispatch(setTheme(!darkMode));
  };

  return {
    darkMode,
    toggleTheme,
  };
};

export default useTheme;
