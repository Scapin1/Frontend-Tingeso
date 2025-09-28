import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BuildIcon from "@mui/icons-material/Build";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TimelapseIcon from '@mui/icons-material/Timelapse';

const stateConfig = {
    ACTIVE: {
        label: "Activo",
        icon: <CheckCircleIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#43a047", color: "#fff", fontWeight: 600 },
    },
    RESTRICTED: {
        label: "Restringido",
        icon: <CancelIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#e53935", color: "#fff", fontWeight: 600 },
    },
};

const ClientStateChip = ({ state }) => {
    const config = stateConfig[state] || {
        label: state,
        icon: <HelpOutlineIcon />,
        sx: { backgroundColor: "#bdbdbd", color: "#fff", fontWeight: 600 },
    };
    return (
        <Chip
            label={config.label}
            icon={config.icon}
            sx={config.sx}
            size="small"
        />
    );
};

export default ClientStateChip;