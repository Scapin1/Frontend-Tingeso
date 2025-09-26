import { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import ToolService from "../../services/tool.service.js";

const ToolSelector = ({ value, onChange, error, helperText, onBlur }) => {
    const [tools, setTools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ToolService.getAllList().then(response => {
            setTools(response.data);
            setLoading(false);
        });
    }, []);

    return (
        <Autocomplete
            options={tools || []}
            getOptionLabel={option => option.name || ""}
            loading={loading}
            value={value}
            onChange={(_, val) => onChange(val)}
            isOptionEqualToValue={(option, val) => option.id === val?.id}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Herramienta"
                    variant="filled"
                    onBlur={onBlur}
                    error={!!error}
                    helperText={helperText}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    );
};

export default ToolSelector;