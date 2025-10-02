import { Chip } from "@mui/material";
import BuildIcon from "@mui/icons-material/Build";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const stateConfig = {
    INCOME: {
        label: "Ingreso",
        icon: <AttachMoneyIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#2e7d32", color: "#fff", fontWeight: 600 },
    },
    LOAN: {
        label: "Préstamo",
        icon: <CreditCardIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#0277bd", color: "#fff", fontWeight: 600 },
    },
    RETURN: {
        label: "Devolución",
        icon: <ReplayIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#8e24aa", color: "#fff", fontWeight: 600 }, // swapped with REPAIR
    },
    WRITE_OFF: {
        label: "De baja",
        icon: <DeleteForeverIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#6d4c41", color: "#fff", fontWeight: 600 },
    },
    REPAIR: {
        label: "Reparación",
        icon: <BuildIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#f9a825", color: "#fff", fontWeight: 600 }, // swapped with RETURN
    },
};

const KardexStateChip = ({ state }) => {
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

export default KardexStateChip;