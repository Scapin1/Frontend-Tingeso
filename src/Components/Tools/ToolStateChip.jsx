import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BuildIcon from "@mui/icons-material/Build";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TimelapseIcon from '@mui/icons-material/Timelapse';

const stateConfig = {
    AVAILABLE: {
        label: "Disponible",
        icon: <CheckCircleIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#43a047", color: "#fff", fontWeight: 600 },
    },
    WRITTEN_OFF: {
        label: "De Baja",
        icon: <CancelIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#e53935", color: "#fff", fontWeight: 600 },
    },
    IN_REPAIR: {
        label: "En Reparación",
        icon: <BuildIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#fbc02d", color: "#fff", fontWeight: 600 },
    },
    LOANED: {
        label: "Prestado",
        icon: <TimelapseIcon sx={{color: "#fff"}}/>,
        sx: {backgroundColor: "#1e88e5", color: "#fff",}
    },
};

const ToolStateChip = ({ state }) => {
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

export default ToolStateChip;