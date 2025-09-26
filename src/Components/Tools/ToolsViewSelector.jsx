import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const ToolViewSelector = ({ viewMode, setViewMode }) => (
    <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_, value) => value && setViewMode(value)}
        size="small"
    >
        <ToggleButton value="grouped">Grouped</ToggleButton>
        <ToggleButton value="individual">Individual</ToggleButton>
    </ToggleButtonGroup>
);

export default ToolViewSelector;