import { Box, Divider, Stack, Typography } from "@mui/material";

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ py: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          {icon}
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{ fontWeight: 500, wordBreak: "break-word" }}
        >
          {value}
        </Typography>
      </Stack>
      <Divider />
    </>
  );
}

export default InfoRow;
