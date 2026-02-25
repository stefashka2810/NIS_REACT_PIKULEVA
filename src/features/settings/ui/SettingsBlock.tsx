import {
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  Grid,
} from "@mui/material";
import { Language, Palette, ViewList } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  setCatalogPageSize,
  setLanguage,
  setTheme,
} from "../model/settingsSlice.ts";
import type { RootState } from "../../../app/store/store.ts";

const SettingsBlock = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const [showSaved, setShowSaved] = useState(false);

  const handleLanguageChange = (lang: "ru" | "en") => {
    dispatch(setLanguage(lang));
    showSavedAlert();
  };

  const handleThemeChange = (theme: "light" | "dark") => {
    dispatch(setTheme(theme));
    showSavedAlert();
  };

  const handlePageSizeChange = (size: 30 | 50 | 70) => {
    dispatch(setCatalogPageSize(size));
    showSavedAlert();
  };

  const showSavedAlert = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 3000);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        {t("settings.title")}
      </Typography>

      {showSaved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {t("settings.saved")}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Palette sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">{t("settings.appearance")}</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Language sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="subtitle2">
                    {t("settings.language")}
                  </Typography>
                </Box>
                <FormControl fullWidth>
                  <InputLabel>{t("settings.language")}</InputLabel>
                  <Select
                    value={settings.language}
                    label={t("settings.language")}
                    onChange={(e) =>
                      handleLanguageChange(e.target.value as "ru" | "en")
                    }
                  >
                    <MenuItem value="ru">🇷🇺 Русский</MenuItem>
                    <MenuItem value="en">🇬🇧 English</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t("settings.theme")}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>{t("settings.theme")}</InputLabel>
                  <Select
                    value={settings.theme}
                    label={t("settings.theme")}
                    onChange={(e) =>
                      handleThemeChange(e.target.value as "light" | "dark")
                    }
                  >
                    <MenuItem value="light">☀️ {t("settings.light")}</MenuItem>
                    <MenuItem value="dark">🌙 {t("settings.dark")}</MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  {t("settings.theme")}:{" "}
                  {settings.theme === "light"
                    ? "☀️ " + t("settings.light")
                    : "🌙 " + t("settings.dark")}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ViewList sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">{t("settings.catalog")}</Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  {t("settings.pageSize")}
                </Typography>
                <FormControl fullWidth>
                  <InputLabel>{t("settings.pageSize")}</InputLabel>
                  <Select
                    value={settings.catalogPageSize}
                    label={t("settings.pageSize")}
                    onChange={(e) =>
                      handlePageSizeChange(e.target.value as 30 | 50 | 70)
                    }
                  >
                    <MenuItem value={30}>
                      30 {t("settings.itemsPerPage")}
                    </MenuItem>
                    <MenuItem value={50}>
                      50 {t("settings.itemsPerPage")}
                    </MenuItem>
                    <MenuItem value={70}>
                      70 {t("settings.itemsPerPage")}
                    </MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mt: 1, display: "block" }}
                >
                  Текущее значение: {settings.catalogPageSize}{" "}
                  {t("settings.itemsPerPage")}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card sx={{ bgcolor: "info.lighter" }}>
            <CardContent>
              <Typography variant="body2" color="info.dark">
                {t("settings.infoMessage")}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsBlock;
