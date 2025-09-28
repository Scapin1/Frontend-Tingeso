import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BuildIcon from "@mui/icons-material/Build";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';

const stateConfig = {
    NORMAL: {
        label: "NORMAL",
        icon: <CheckCircleIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#43a047", color: "#fff", fontWeight: 600 },
    },
    IN_REPAIR: {
        label: "IN_REPAIR",
        icon: <BuildIcon sx={{ color: "#fff" }} />,
        sx: { backgroundColor: "#fbc02d", color: "#fff", fontWeight: 600 },
    },
    FINISHED: {
        label: "FINISHED",
        icon: <RemoveDoneIcon sx={{color: "#fff"}}/>,
        sx: {backgroundColor: "#1e88e5", color: "#fff",}
    },
};

const LoanStateChip = ({ state }) => {
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

export default LoanStateChip;