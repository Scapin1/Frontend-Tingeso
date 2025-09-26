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
                backgroundColor: colors.primary[400],
                borderRadius: 2,
                boxShadow: 2,
                p: 4,
            }}
        >
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ color: colors.greenAccent[500] }}
            >
                ToolRent: Tu solución para la gestión de arriendo de herramientas
            </Typography>
            <Typography variant="body1" sx={{ color: colors.grey[100] }}>
                Bienvenido a ToolRent, la plataforma integral que automatiza y optimiza el arriendo de herramientas para construcción, reparaciones y proyectos domésticos. Nuestra solución digital te permite gestionar solicitudes, entregas y devoluciones de manera eficiente y transparente.
            </Typography>
            <Typography
                variant="h6"
                gutterBottom
                sx={{ mt: 3, color: colors.greenAccent[400] }}
            >
                ¿Qué te ofrece ToolRent?
            </Typography>
            <List>
                {[
                    "Gestión digital de inventario en tiempo real.",
                    "Automatización de solicitudes, entregas y devoluciones.",
                    "Aplicación automática de reglas de negocio y multas.",
                    "Reportes estratégicos para la toma de decisiones.",
                    "Control y trazabilidad del estado de cada herramienta.",
                    "Mejora la experiencia de tus clientes y la eficiencia operativa.",
                ].map((text, idx) => (
                    <ListItem key={idx}>
                        <ListItemIcon>
                            <CheckCircleIcon sx={{ color: colors.greenAccent[500] }} />
                        </ListItemIcon>
                        <ListItemText
                            primary={text}
                            primaryTypographyProps={{ sx: { color: colors.grey[100] } }}
                        />
                    </ListItem>
                ))}
            </List>
            <Typography variant="body1" sx={{ mt: 2, color: colors.grey[100] }}>
                Con ToolRent, tu negocio estará preparado para crecer, reducir pérdidas y ofrecer un servicio confiable y competitivo.
            </Typography>
        </Container>
    );
};

export default Home;
