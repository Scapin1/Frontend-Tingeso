import { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import ClientService from "../../services/client.service.js";

const ClientSelector = ({ value, onChange, error, helperText, onBlur }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ClientService.getAll().then(response => {
            setClients(response.data);
            setLoading(false);
        });
    }, []);

    return (
        <Autocomplete
            options={clients || []}
            getOptionLabel={option =>
                option.name ? `${option.name} (${option.rut})` : option.rut || ""
            }
            filterOptions={(options, { inputValue }) =>
                options.filter(
                    o =>
                        o.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
                        o.rut?.toLowerCase().includes(inputValue.toLowerCase())
                )
            }
            loading={loading}
            value={value}
            onChange={(_, val) => onChange(val)}
            isOptionEqualToValue={(option, val) => option.id === val?.id}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Cliente"
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

export default ClientSelector;