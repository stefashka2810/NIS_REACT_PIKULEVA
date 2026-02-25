import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState } from "./types";
import i18n from "../../../shared/i18n/config";

const initialState: SettingsState = {
  language: "ru",
  theme: "light",
  catalogPageSize: 30,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"ru" | "en">) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
      localStorage.setItem("language", action.payload);
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setCatalogPageSize: (state, action: PayloadAction<30 | 50 | 70>) => {
      state.catalogPageSize = action.payload;
    },
  },
});

export const { setLanguage, setTheme, setCatalogPageSize } =
  settingsSlice.actions;
export default settingsSlice.reducer;
