import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import InfoRow from "./InfoRow.tsx";
import { useGetUserQuery } from "../../../features/userAuth/api/authApi.ts";
import { t } from "i18next";

const UserInfo = () => {
  const { data } = useGetUserQuery();
  const fullName = `${data?.firstName} ${data?.lastName}`;

  return (
    <Stack spacing={3}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Avatar
            src={data?.image}
            alt={fullName}
            sx={{
              width: 96,
              height: 96,
              border: "3px solid",
              borderColor: "background.paper",
              boxShadow: 2,
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={1.5}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
            >
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {fullName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  @{data?.username}
                </Typography>
              </Box>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              mt={2}
              flexWrap="wrap"
              useFlexGap
            >
              <Chip label={`ID: ${data?.id}`} size="small" />
              <Chip
                label={data?.gender === "female" ? "Female" : data?.gender}
                size="small"
                color="secondary"
                variant="outlined"
              />
              <Chip label="User" size="small" variant="outlined" />
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
        <Card sx={{ flex: 1, borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ px: 2.5, py: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t("profile.personalInfo")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("profile.title")}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ px: 2.5 }}>
              <InfoRow
                icon={<PersonOutlineIcon fontSize="small" />}
                label={t("profile.firstName")}
                value={data?.firstName}
              />
              <InfoRow
                icon={<PersonOutlineIcon fontSize="small" />}
                label={t("profile.lastName")}
                value={data?.lastName}
              />
              <InfoRow
                icon={<BadgeOutlinedIcon fontSize="small" />}
                label={t("auth.username")}
                value={`@${data?.username}`}
              />

              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ py: 1.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.secondary",
                  }}
                >
                  <WcOutlinedIcon fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <Typography variant="body2" color="text.secondary">
                    {t("profile.gender")}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {data?.gender}
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderRadius: 3 }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ px: 2.5, py: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                {t("profile.email")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                User communication
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ px: 2.5 }}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ py: 1.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "text.secondary",
                  }}
                >
                  <EmailOutlinedIcon fontSize="small" />
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, wordBreak: "break-word" }}
                >
                  {data?.email}
                </Typography>
              </Stack>
            </Box>

            <Divider />

            <Box sx={{ px: 2.5, py: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                href={`mailto:${data?.email}`}
                startIcon={<EmailOutlinedIcon />}
              >
                Send Email
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};

export default UserInfo;
