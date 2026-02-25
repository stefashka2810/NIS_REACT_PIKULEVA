import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import {
  ShoppingCart,
  People,
  Inventory,
  TrendingUp,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      title: t("dashboard.totalProducts"),
      value: "194",
      icon: <Inventory sx={{ fontSize: 40 }} />,
      color: "#1976d2",
    },
    {
      title: t("dashboard.users"),
      value: "1,234",
      icon: <People sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
    },
    {
      title: t("dashboard.orders"),
      value: "567",
      icon: <ShoppingCart sx={{ fontSize: 40 }} />,
      color: "#ed6c02",
    },
    {
      title: t("dashboard.sales"),
      value: "$12,345",
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: "#9c27b0",
    },
  ];

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        {t("dashboard.title")}
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                color: "white",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight="bold">
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, opacity: 0.9 }}>
                      {stat.title}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.8 }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
