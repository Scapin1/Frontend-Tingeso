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
                    sx={{
                        color: colors.greenAccent[400],
                        fontWeight: 700,
                        textAlign: 'center',
                        mb: 2
                    }}
                >
                    Clientes con más pedidos
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <CircularProgress color="inherit" size={32} />
                    </Box>
                ) : clients && clients.length > 0 ? (
                    <List sx={{ width: '100%' }}>
                        {clients.map((client, idx) => (
                            <ListItem key={client.id || idx} disableGutters divider={idx !== clients.length - 1}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: colors.blueAccent[500], width: 40, height: 40 }}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 600, color: colors.grey[100] }}
                                        >
                                            {client.clientRut}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography
                                            variant="body2"
                                            sx={{ color: colors.greenAccent[400], fontWeight: 500 }}
                                        >
                                            {client.loanCount} pedidos
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
                            No hay datos de clientes
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default TopClientsList;
