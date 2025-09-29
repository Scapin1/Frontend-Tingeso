import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const ToolViewSelector = ({ viewMode, setViewMode }) => (
    <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_, value) => value && setViewMode(value)}
        size="small"
    >
        <ToggleButton value="grouped">Agrupado</ToggleButton>
        <ToggleButton value="individual">Todas</ToggleButton>
    </ToggleButtonGroup>
);

export default ToolViewSelector;