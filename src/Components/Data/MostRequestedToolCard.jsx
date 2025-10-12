import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    useTheme,
    CircularProgress
} from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import { tokens } from "../../theme";
import kardexService from "../../Services/kardex.service.js";

const MostRequestedToolCard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [toolInfo, setToolInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        kardexService.getMostRequestedTool()
            .then(response => setToolInfo(response.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card
            sx={{
                background: colors.primary[400],
                color: theme.palette.text.primary,
                borderRadius: 3,
                boxShadow: 3,
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CardContent
                sx={{
                    width: '100%',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ bgcolor: colors.greenAccent[500], width: 50, height: 50, mb: 2 }}>
                    <BuildIcon fontSize="large" />
                </Avatar>
                <Typography
                    variant="subtitle1"
                    color={colors.greenAccent[400]}
                    gutterBottom
                    fontWeight={700}
                >
                    Herramienta más Préstada
                </Typography>
                {loading ? (
                    <CircularProgress color="inherit" size={32} sx={{ mt: 2 }} />
                ) : toolInfo && toolInfo.toolName ? (
                    <Box textAlign="center">
                        <Typography variant="h6" fontWeight={700} color={colors.blueAccent[200]}>
                            {toolInfo.toolName}
                        </Typography>
                        <Typography variant="body2" color={colors.greenAccent[200]} fontWeight={500}>
                            {toolInfo.requestCount} préstamos
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        No hay datos de herramientas
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default MostRequestedToolCard;
