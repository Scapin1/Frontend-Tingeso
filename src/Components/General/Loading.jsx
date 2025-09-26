import { Box, CircularProgress, Typography } from "@mui/material";

const LoadingSpinner = ({ text = "Cargando..." }) => (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px">
        <CircularProgress color="secondary" />
        <Typography variant="subtitle1" mt={2}>{text}</Typography>
    </Box>
);

export default LoadingSpinner;