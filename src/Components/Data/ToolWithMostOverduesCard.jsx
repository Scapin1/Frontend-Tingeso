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
import ErrorIcon from '@mui/icons-material/Error';
import BuildIcon from '@mui/icons-material/Build';
import loanService from "../../services/loan.service";
import { tokens } from "../../theme";

const ToolWithMostOverduesCard = ({ sx }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [tool, setTool] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loanService.getToolWithMostOverdues()
            .then(res => setTool(res.data))
            .catch(() => setError("No se pudo cargar la información de herramienta con más atrasos."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card
            sx={{
                background: colors.primary[600],
                color: colors.primary[300],
                borderRadius: 3,
                boxShadow: 3,
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                ...sx
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
                <Avatar sx={{ bgcolor: colors.redAccent[400], width: 50, height: 50, mb: 2 }}>
                    <ErrorIcon fontSize="large" />
                </Avatar>
                <Typography
                    variant="subtitle1"
                    color={colors.redAccent[400]}
                    gutterBottom
                    fontWeight={700}
                >
                    Herramienta con más atrasos
                </Typography>
                {loading ? (
                    <CircularProgress color="error" size={28} />
                ) : error ? (
                    <Typography color={colors.redAccent[100]}>{error}</Typography>
                ) : !tool || !tool.toolName ? (
                    <Typography color={colors.redAccent[100]}>No hay datos de atrasos.</Typography>
                ) : (
                    <Box textAlign="center">
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>{tool.toolName}</Typography>
                            <Typography variant="body2" color={colors.redAccent[100]}>
                                {tool.overdueCount} Atrasos
                            </Typography>
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default ToolWithMostOverduesCard;
