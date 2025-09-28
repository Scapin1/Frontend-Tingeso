import { Box, Button, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import ClientService from "../../services/client.service.js";
import { useNavigate } from "react-router-dom";
import formatPhoneNumber from "../Format/PhoneFormatter.js"
import formatRut from "../Format/RutFormatter.js"

const estados = [
    { value: "ACTIVE", label: "Activo" },
    { value: "RESTRICTED", label: "Restringido" },
];

const validationSchema = yup.object().shape({
    firstName: yup.string().required("Requerido"),
    email: yup.string().email("Email inválido").required("Requerido"),
    rut: yup.string().required("Requerido"),
    phoneNumber: yup
        .string()
        .matches(/^\+56 9 \d{4} \d{4}$/, "Teléfono inválido")
        .required("Requerido"),
    clientState: yup.string().required("Requerido"),
});

const ClientsAdd = () => {
    const navigate = useNavigate();

    return (
        <Box m="20px">
            <Formik
                initialValues={{
                    firstName: "",
                    email: "",
                    rut: "",
                    phoneNumber: "",
                    clientState: "",
                }}
                validationSchema={validationSchema}
                onSubmit={values => {
                    values.rut = formatRut(values.rut);
                    ClientService.addClient(values).then(() => {
                        navigate("/clients/");
                    });
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
                                label="Nombre"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={!!touched.firstName && !!errors.firstName}
                                helperText={touched.firstName && errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="email"
                                label="Email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.email}
                                name="email"
                                error={!!touched.email && !!errors.email}
                                helperText={touched.email && errors.email}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="RUT"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={formatRut(values.rut)}
                                name="rut"
                                error={!!touched.rut && !!errors.rut}
                                helperText={touched.rut && errors.rut}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Teléfono"
                                onBlur={handleBlur}
                                onChange={e => {
                                    const formatted = formatPhoneNumber(e.target.value);
                                    handleChange({
                                        target: {
                                            name: "phoneNumber",
                                            value: formatted,
                                        },
                                    });
                                }}
                                value={values.phoneNumber}
                                name="phoneNumber"
                                error={!!touched.phoneNumber && !!errors.phoneNumber}
                                helperText={touched.phoneNumber && errors.phoneNumber}
                                sx={{ gridColumn: "span 2" }}
                                inputMode="tel"
                            />

                            <FormControl
                                fullWidth
                                variant="filled"
                                sx={{ gridColumn: "span 2" }}
                                error={!!touched.clientState && !!errors.clientState}
                            >
                                <InputLabel id="estado-label">Estado</InputLabel>
                                <Select
                                    labelId="estado-label"
                                    id="estado"
                                    value={values.clientState}
                                    name="clientState"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    label="Estado"
                                    variant="filled"
                                >
                                    {estados.map(option => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained" >
                                Crear cliente
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default ClientsAdd;