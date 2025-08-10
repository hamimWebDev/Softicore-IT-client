import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  darkMode: boolean;
};

// Read initial theme from localStorage if available
const getInitialTheme = (): boolean => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('theme');
    if (stored === 'light') return false;
    return true; // default to dark
  }
  return true;
};

const initialState: ThemeState = {
  darkMode: true, // will be updated on mount
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Keep setTheme for potential future use, but remove toggleTheme
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;