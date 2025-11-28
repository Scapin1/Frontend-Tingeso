import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme.js";

const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Container
            maxWidth="md"
            sx={{
                mt: 6,
                backgroundColor: colors.primary[600],
                borderRadius: 2,
                boxShadow: 2,
                p: 4,
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ color: colors.greenAccent[600] }}
            >
                Sistema ToolRent · Panel Interno de Gestión
            </Typography>

            <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                Bienvenido al sistema interno de ToolRent. Esta plataforma está diseñada exclusivamente para empleados autorizados, facilitando la administración eficiente del ciclo completo de arriendo de herramientas: desde la solicitud hasta la devolución.
            </Typography>

            <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 3, color: colors.greenAccent[600] }}
            >
                Funcionalidades clave
            </Typography>

            <List>
                {[
                    "Visualización y control del inventario en tiempo real.",
                    "Gestión de solicitudes, entregas y devoluciones con trazabilidad completa.",
                    "Aplicación automática de reglas operativas, multas y bloqueos.",
                    "Reportes operativos y estratégicos para supervisores y gerencia.",
                    "Historial detallado por herramienta, cliente y operación.",
                    "Validaciones integradas para evitar errores y duplicaciones.",
                ].map((text, idx) => (
                    <ListItem key={idx}>
                        <ListItemIcon>
                            <CheckCircleIcon sx={{ color: colors.greenAccent[500] }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={text}
                            sx={{ color: colors.grey[100] }}
                        />
                    </ListItem>
                ))}
            </List>

            <Typography variant="body1" sx={{ mt: 2, color: colors.grey[100] }}>
                Recuerda que todas las acciones quedan registradas. Usa este sistema de forma responsable y conforme a los protocolos internos. Para soporte técnico o dudas operativas, contacta al área de sistemas.
            </Typography>
        </Container>
    );
};

export default Home;
