import {Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import toolService from "../../services/tool.service.js";
import {useNavigate} from "react-router-dom";
import keycloak from "../../services/keycloak.js";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useState } from "react";
import ErrorSnackbar from "../General/ErrorSnackbar";


function formatCLP(value) {
    if (!value) return "";
    // Elimina todo lo que no sea número
    const numeric = value.replace(/\D/g, "");
    if (!numeric) return "";
    // Formatea como peso chileno sin decimales
    return new Intl.NumberFormat("es-CL").format(Number(numeric));
}

const ToolsAdd = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    return (
        <Box m="20px">
            <ErrorSnackbar
                message={error}
                open={openError}
                onClose={() => setOpenError(false)}
            />
            <Formik
                initialValues={{
                    name: "",
                    quantity: 0,
                    repoFee: 0,
                    category: "",
                }}
                validationSchema={yup.object().shape({
                    name: yup.string().required("Requerido"),
                    category: yup.string().required("Requerido"),
                    repoFee: yup
                        .string()
                        .required("Requerido")
                        .test("is-valid", "Debe ser un número mayor a 0", val => !!val && Number(val.replace(/\D/g, "")) > 0),
                    quantity: yup
                        .number()
                        .required("Requerido")
                        .min(0, "Debe ser un número mayor o igual a 0"),
                })}
                onSubmit={async values => {
                    values.repoFee = Number(values.repoFee.replace(/\D/g, ""));
                    try {
                        await toolService.add(values, keycloak.tokenParsed.preferred_username);
                        navigate("/tools");
                    } catch (error) {
                        setError(error?.response?.data?.message || error?.message || "Error al crear herramienta");
                        setOpenError(true);
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box display="grid" gap="30px" gridTemplateColumns="repeat(4, minmax(0, 1fr))">
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Nombre herramienta"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={touched.name && errors.name}
                                helperText={touched.name && errors.name}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Categoría"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.category}
                                name="category"
                                error={!!touched.category && !!errors.category}
                                helperText={touched.category && errors.category}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Costo de reposición"
                                onBlur={handleBlur}
                                onChange={e => {
                                    const formatted = formatCLP(e.target.value);
                                    handleChange({
                                        target: {
                                            name: "repoFee",
                                            value: formatted,
                                        },
                                    });
                                }}
                                value={values.repoFee}
                                name="repoFee"
                                error={touched.repoFee && errors.repoFee}
                                helperText={touched.repoFee && errors.repoFee}
                                sx={{ gridColumn: "span 2" }}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                slotProps={{
                                    input: {
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }
                                }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Cantidad"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.quantity}
                                name="quantity"
                                error={touched.quantity && errors.quantity}
                                helperText={touched.quantity && errors.quantity}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Crear herramienta
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default ToolsAdd;