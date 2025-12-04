import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    Avatar,
    useTheme,
    CircularProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import loanService from "../../services/loan.service";
import { tokens } from "../../theme";

const RankingMostOverdueTools = ({ sx }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loanService.getToolWithMostOverdues()
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : [res.data];
                setTools(data);
            })
            .catch(() => setError("No se pudo cargar la información de herramientas con más atrasos."))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card
            sx={{
                background: colors.primary[600],
                color: theme.palette.text.primary,
                borderRadius: 3,
                boxShadow: 3,
                minHeight: 250,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                ...sx
            }}
        >
            <CardContent
                sx={{
                    width: '100%',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexGrow: 1
                }}
            >
                <Typography
                    variant="h5"
                    color={colors.redAccent[400]}
                    gutterBottom
                    fontWeight={700}
                    textAlign="center"
                    sx={{ mb: 2 }}
                >
                    Ranking: Más Atrasos
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <CircularProgress color="error" size={32} />
                    </Box>
                ) : error ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography color={colors.redAccent[100]}>{error}</Typography>
                    </Box>
                ) : !tools || tools.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography variant="body1" color={colors.redAccent[100]}>
                            No hay datos de atrasos.
                        </Typography>
                    </Box>
                ) : (
                    <List sx={{ width: '100%' }}>
                        {tools.slice(0, 5).map((tool, index) => (
                            <ListItem key={index} disableGutters divider={index !== tools.length - 1}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.redAccent[400], width: 40, height: 40 }}>
                                        <ErrorIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" fontWeight={600} color={colors.grey[100]}>
                                            {tool.toolName}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color={colors.redAccent[100]}>
                                            {tool.overdueCount} Atrasos
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    );
};

export default RankingMostOverdueTools;
