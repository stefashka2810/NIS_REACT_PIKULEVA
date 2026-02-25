import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Home, SearchOff } from "@mui/icons-material";

const NotFound = () => {
  const navigate = useNavigate();

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
      <SearchOff sx={{ fontSize: 120, color: "text.secondary", mb: 2 }} />

      <Typography
        variant="h1"
        sx={{ fontSize: "6rem", fontWeight: "bold", mb: 2 }}
      >
        404
      </Typography>

      <Typography variant="h4" gutterBottom>
        Страница не найдена
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 500 }}
      >
        К сожалению, запрашиваемая вами страница не существует или была
        перемещена.
      </Typography>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => navigate("/")}
        >
          На главную
        </Button>

        <Button variant="outlined" onClick={() => navigate(-1)}>
          Назад
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
