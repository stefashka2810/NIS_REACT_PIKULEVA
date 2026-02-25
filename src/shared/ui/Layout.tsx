import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container component="main" sx={{ flex: 1, py: 2 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
