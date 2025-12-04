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
                minHeight: 250,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
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
                    color={colors.greenAccent[400]}
                    gutterBottom
                    fontWeight={700}
                    textAlign="center"
                    sx={{ mb: 2 }}
                >
                    Ranking: Más Prestadas
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <CircularProgress color="inherit" size={32} />
                    </Box>
                ) : tools && tools.length > 0 ? (
                    <List sx={{ width: '100%' }}>
                        {tools.slice(0, 5).map((tool, index) => (
                            <ListItem key={index} disableGutters divider={index !== tools.length - 1}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.greenAccent[500], width: 40, height: 40 }}>
                                        <BuildIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography variant="h6" fontWeight={600} color={colors.grey[100]}>
                                            {tool.toolName}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2" color={colors.greenAccent[400]}>
                                            {tool.requestCount} préstamos
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography variant="body1" color={theme.palette.text.secondary}>
                            No hay datos disponibles
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default RankingMostRequestedTools;
