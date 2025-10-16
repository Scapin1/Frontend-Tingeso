import {Box, useTheme, TextField, Alert,} from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme.js";
import toolService from "../../services/tool.service.js";
import {useKeycloak} from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
import ToolViewSelector from "./ToolsViewSelector.jsx";
import GroupedToolsTable from "./GroupedToolsTable.jsx";
import IndividualToolsTable from "./IndividualToolsTable.jsx";




const Tools = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [tools, setTools] = useState([]);
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState("grouped");
    const { keycloak } = useKeycloak()
    const Roles = keycloak.realmAccess?.roles || null;

    useEffect(() => {
        init(viewMode);
    }, [viewMode]);

    const filteredTools = tools.filter((tool) =>
        Object.values(tool)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const init = (mode) => {
        const fetcher = mode === "grouped" ? toolService.getAllList : toolService.getAll;
        fetcher()
            .then((response) => {
                setTools(response.data.map((tool, idx) => ({ ...tool, id: idx + 1 })));
            })
            .catch((error) => {
                <Alert severity="error">{error.response.data.message}</Alert>
            });
    };

    return (
        <Box m="50px">
            <Box mb={2} display="flex" justifyContent="flex-end" gap={2}>
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    sx={{ background: colors.primary[600], borderRadius: 1 }}
                />
                {Roles.includes("ADMIN") && (
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <ToolViewSelector viewMode={viewMode} setViewMode={setViewMode} />
                        <button
                            style={{
                                padding: "10px 20px",
                                background: colors.greenAccent[600],
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                fontWeight: "bold"
                            }}
                            onClick={() => {navigate('/tools/add')}}
                        >
                            Nueva Herramienta
                        </button>
                    </Box>
                )}
            </Box>
            {viewMode === "grouped" ? (
                <GroupedToolsTable tools={filteredTools} />
            ) : (
                <IndividualToolsTable
                    tools={filteredTools}
                    onToolDeactivated={() => init(viewMode)}
                />
            )}
        </Box>
    );
};

export default Tools;