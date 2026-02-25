import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useLoginUserMutation } from "../api/authApi.ts";
import { useDispatch } from "react-redux";
import type { LoginRequest } from "../api/types.ts";
import { setAuth, setUser } from "../model/authSlice.ts";
import { validatePassword, validateUsername } from "../model/validators.ts";
import { useTranslation } from "react-i18next";

export function LoginForm() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (userData: LoginRequest) => {
    try {
      setLoginError(null);
      const data = await login(userData).unwrap();

      dispatch(setAuth(data));
      dispatch(setUser(data));

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(t("errors.loginFailed"));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <LoginIcon sx={{ fontSize: 60, color: "primary.main", mb: 1 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {t("auth.loginTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("auth.loginTitle")} /{" "}
            <Link
              to="/register"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {t("auth.registerTitle")}
            </Link>
          </Typography>
        </Box>

        {loginError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {loginError}
          </Alert>
        )}

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
        >
          <TextField
            required
            fullWidth
            label={t("auth.username")}
            value={username}
            onChange={(e) => {
              const val = e.target.value;
              setUsername(val);
              setErrorUsername(validateUsername(val));
            }}
            onBlur={(e) => setErrorUsername(validateUsername(e.target.value))}
            error={!!errorUsername}
            helperText={errorUsername}
            variant="outlined"
          />

          <TextField
            required
            fullWidth
            type={showPassword ? "text" : "password"}
            label={t("auth.password")}
            value={password}
            onChange={(e) => {
              const val = e.target.value;
              setPassword(val);
              setErrorPassword(validatePassword(val));
            }}
            onBlur={(e) => setErrorPassword(validatePassword(e.target.value))}
            error={!!errorPassword}
            helperText={errorPassword}
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={() =>
              handleClick({
                username: username,
                password: password,
              })
            }
            disabled={
              !!errorUsername ||
              !!errorPassword ||
              isLoading ||
              !username ||
              !password
            }
            sx={{
              mt: 1,
              py: 1.5,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5568d3 0%, #653b8e 100%)",
              },
            }}
          >
            {isLoading ? t("common.loading") : t("auth.loginButton")}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginForm;
