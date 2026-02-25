import { createContext, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useGetUserQuery } from "../../features/userAuth/api/authApi";
import { setUser } from "../../features/userAuth/model/authSlice";
import { Box, CircularProgress } from "@mui/material";

const AuthContext = createContext<{ isInitializing: boolean }>({
  isInitializing: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { data: userData, isLoading } = useGetUserQuery();

  useMemo(() => {
    if (userData) {
      dispatch(setUser(userData));
    }
  }, [userData, dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{ isInitializing: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
