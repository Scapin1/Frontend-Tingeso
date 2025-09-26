import { Box, Typography } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";

const Restricted = () => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="300px">
        <BlockIcon color="error" sx={{ fontSize: 60 }} />
        <Typography variant="h5" mt={2} color="error">
            Acceso restringido
        </Typography>
        <Typography variant="body1" mt={1}>
            No tienes permisos para ver esta página.
        </Typography>
    </Box>
);

export default Restricted;