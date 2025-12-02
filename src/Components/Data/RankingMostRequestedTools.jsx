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
import BuildIcon from "@mui/icons-material/Build";
import { tokens } from "../../theme";
import kardexService from "../../Services/kardex.service.js";

const RankingMostRequestedTools = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        kardexService.getMostRequestedTool()
            .then(response => {
                // Ensure response is an array
                const data = Array.isArray(response.data) ? response.data : [response.data];
                setTools(data);
            })
            .catch(err => {
                console.error("Error fetching most requested tools:", err);
                setTools([]);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card
            sx={{
                background: colors.primary[600],
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
                <Typography
                    variant="subtitle1"
                    color={colors.greenAccent[400]}
                    gutterBottom
                    fontWeight={700}
                >
                    Ranking: Más Prestadas
                </Typography>
                {loading ? (
                    <CircularProgress color="inherit" size={32} sx={{ mt: 2 }} />
                ) : tools && tools.length > 0 ? (
                    <List sx={{ width: '100%' }}>
                        {tools.slice(0, 5).map((tool, index) => (
                            <ListItem key={index} disableGutters>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.greenAccent[500], width: 30, height: 30 }}>
                                        <BuildIcon fontSize="small" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" fontWeight={600} color={colors.blueAccent[300]}>
                                            {tool.toolName}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color={colors.greenAccent[100]}>
                                            {tool.requestCount} préstamos
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" color={theme.palette.text.secondary}>
                        No hay datos de herramientas
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default RankingMostRequestedTools;
