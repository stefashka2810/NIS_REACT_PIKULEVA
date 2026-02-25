import { Box } from "@mui/material";
import UserInfo from "../../entities/user/ui/UserInfo.tsx";

const ProfilePage = () => {
  return (
    <Box sx={{ py: 3 }}>
      <UserInfo></UserInfo>
    </Box>
  );
};

export default ProfilePage;
