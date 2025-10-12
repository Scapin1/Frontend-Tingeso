import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    useTheme,
    CircularProgress,
    Box
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { tokens } from "../../theme";
import loanService from "../../Services/loan.service.js";

const TopClientsList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loanService.getTopClients()
            .then(response => setClients(response.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Card
            sx={{
                background: colors.primary[400],
                color: theme.palette.text.primary,
                borderRadius: 3,
                boxShadow: 3,
                minHeight: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CardContent sx={{ width: '100%', p: 3 }}>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: colors.greenAccent[400],
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 1
                    }}
                >
                    Clientes con más pedidos
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight={100}>
                        <CircularProgress color="inherit" size={32} />
                    </Box>
                ) : clients && clients.length > 0 ? (
                    <List>
                        {clients.map((client, idx) => (
                            <ListItem key={client.id || idx}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.blueAccent[500] }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 600, color: colors.blueAccent[200] }}
                                    >
                                        {client.clientRut}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ color: colors.greenAccent[200], fontWeight: 500 }}
                                    >
                                        {client.loanCount} pedidos
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
                        No hay datos de clientes
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default TopClientsList;
