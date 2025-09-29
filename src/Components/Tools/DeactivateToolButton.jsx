import { IconButton, Tooltip } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const DeactivateToolButton = ({ onDeactivate, disabled }) => (
    <Tooltip title="Dar de baja">
    <span>
        <IconButton
            color="error"
            onClick={onDeactivate}
            disabled={disabled}
            size="small"
        >
        <RemoveCircleOutlineIcon />
        </IconButton>
    </span>
    </Tooltip>
);

export default DeactivateToolButton;