import { Drawer, Box, Typography, Divider } from "@mui/material";
import useEventLog from "../../hooks/useEventLog.ts";

const EventLogPanel = () => {
    const { logs } = useEventLog();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 280,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 300,
                    boxSizing: "border-box",
                    padding: 2,
                    backgroundColor: "#fff",
                    borderRight: "1px solid #ddd",
                },
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <Typography
                    variant="h6"
                    sx={{ marginBottom: 1, color: "saddlebrown", fontWeight: 600 }}
                >
                    YOUR ACTIONS
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
                    {logs.length === 0 ? (
                        <Typography sx={{ color: "#999", fontStyle: "italic" }}>
                            No events yet…
                        </Typography>
                    ) : (
                        logs.map((log, index) => (
                            <Box
                                key={index}
                                sx={{
                                    mb: 1,
                                    p: 1,
                                    borderRadius: 1,
                                    backgroundColor: "#fff4d6",
                                    borderLeft: "4px solid #f5b642",
                                    color: "#5a3e2b",
                                    fontSize: "20px",
                                }}
                            >
                                • {log}
                            </Box>
                        ))
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};

export default EventLogPanel;
