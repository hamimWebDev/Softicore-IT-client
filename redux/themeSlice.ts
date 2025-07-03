import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  darkMode: boolean;
};

// Always use dark mode
const initialState: ThemeState = {
  darkMode: true,
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