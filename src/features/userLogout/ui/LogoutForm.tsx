import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout as LogoutIcon, Login } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { logout } from "../../userAuth/model/authSlice.ts";

const LogoutForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    dispatch(logout());

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggingOut) {
        setIsLoggingOut(true);
        dispatch(logout());
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoggingOut, dispatch, navigate]);

  if (isLoggingOut) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 4,
        }}
      >
        <LogoutIcon sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Выход из системы...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          До встречи!
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 500,
          width: "100%",
          borderRadius: 2,
        }}
      >
        <LogoutIcon sx={{ fontSize: 80, color: "warning.main", mb: 2 }} />

        <Typography variant="h4" gutterBottom>
          Выход из аккаунта
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Вы уверены, что хотите выйти из системы?
        </Typography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            size="large"
          >
            Да, выйти
          </Button>

          <Button
            variant="outlined"
            startIcon={<Login />}
            onClick={() => navigate(-1)}
            size="large"
          >
            Отмена
          </Button>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 3, display: "block" }}
        >
          Автоматический выход через 3 секунды...
        </Typography>
      </Paper>
    </Box>
  );
};

export default LogoutForm;
