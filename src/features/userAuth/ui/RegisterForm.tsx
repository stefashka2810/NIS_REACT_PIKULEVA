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
  PersonAdd as RegisterIcon,
} from "@mui/icons-material";
import { validatePassword, validateUsername } from "../model/validators.ts";
import { useTranslation } from "react-i18next";

export function RegisterForm() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorUsername, setErrorUsername] = useState<string | null>(null);
  const [errorPassword, setErrorPassword] = useState<string | null>(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<
    string | null
  >(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validateConfirmPassword = (pass: string, confirmPass: string) => {
    if (!confirmPass) {
      return t("validation.confirmPassword");
    }
    if (pass !== confirmPass) {
      return t("validation.passwordsNotMatch");
    }
    return null;
  };

  const handleRegister = async () => {
    setSuccess(true);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const isFormValid =
    !errorUsername &&
    !errorPassword &&
    !errorConfirmPassword &&
    username &&
    password &&
    confirmPassword;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
          <RegisterIcon sx={{ fontSize: 60, color: "secondary.main", mb: 1 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">
            {t("auth.registerTitle")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Link
              to="/login"
              style={{
                color: "#f5576c",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {t("auth.loginTitle")}
            </Link>{" "}
            / {t("auth.registerTitle")}
          </Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {t("auth.registerButton")} успешна! Перенаправление на вход...
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
              if (confirmPassword) {
                setErrorConfirmPassword(
                  validateConfirmPassword(val, confirmPassword),
                );
              }
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

          <TextField
            required
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            label={t("auth.confirmPassword")}
            value={confirmPassword}
            onChange={(e) => {
              const val = e.target.value;
              setConfirmPassword(val);
              setErrorConfirmPassword(validateConfirmPassword(password, val));
            }}
            onBlur={(e) =>
              setErrorConfirmPassword(
                validateConfirmPassword(password, e.target.value),
              )
            }
            error={!!errorConfirmPassword}
            helperText={errorConfirmPassword}
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            onClick={handleRegister}
            disabled={!isFormValid || success}
            sx={{
              mt: 1,
              py: 1.5,
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #de7ee8 0%, #d8465a 100%)",
              },
            }}
          >
            {t("auth.registerButton")}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default RegisterForm;
