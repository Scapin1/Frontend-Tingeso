import React, { useState, useEffect } from "react";
import {Autocomplete, Box, Button} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ToolSelector from "./ToolSelector.jsx";
import ClientSelector from "./ClientSelector.jsx";
import LoanService from "../../services/loan.service.js";
import { useNavigate } from "react-router-dom";
import keycloak from "../../services/keycloak.js";
import ErrorSnackbar from "../General/ErrorSnackbar";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const validationSchema = yup.object().shape({
    tool: yup.object().required("Herramienta requerida"),
    client: yup.object().required("Cliente requerido"),
    returnDate: yup.string().required("Fecha requerida"),
});

const initialValues = {
    tool: null,
    client: null,
    returnDate: "",
};

const LoanTool = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [openError, setOpenError] = useState(false);
    const [estimatedCost, setEstimatedCost] = useState(null);
    const [selectedTool, setSelectedTool] = useState(null);
    const [selectedReturnDate, setSelectedReturnDate] = useState("");

    useEffect(() => {
        if (!selectedTool || !selectedReturnDate) {
            setEstimatedCost(null);
            return;
        }
        const dailyFee = selectedTool.rentalFee;
        if (!dailyFee) {
            setEstimatedCost(null);
            return;
        }
        const today = dayjs().startOf('day');
        const returnDate = dayjs(selectedReturnDate).startOf('day');
        const days = returnDate.diff(today, 'day');
        if (days <= 0) {
            setEstimatedCost(null);
            return;
        }
        setEstimatedCost(days * dailyFee);
    }, [selectedTool, selectedReturnDate]);

    const handleFormSubmit = async (values) => {
        try {
            setError("");
            setOpenError(false);
            await LoanService.addLoan({
                returnDate: values.returnDate,
                loanDate: dayjs().format("YYYY-MM-DD"),
                status: "NORMAL",
                toolLoaned: {name: values.tool.name},
                client: {id: values.client.id},
            }, keycloak.tokenParsed.preferred_username);
            navigate("/loans");
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Error al registrar el préstamo");
            setOpenError(true);
        }
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenError(false);
    };

    return (
        <Box m="20px">
            {openError && (
                <ErrorSnackbar
                    message={error}
                    open={openError}
                    onClose={handleCloseError}
                />
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleFormSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    setFieldValue,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <ToolSelector
                                value={values.tool}
                                onChange={val => {
                                    setFieldValue("tool", val);
                                    setSelectedTool(val);
                                }}
                                error={touched.tool && errors.tool}
                                helperText={touched.tool && errors.tool}
                                onBlur={handleBlur}
                            />
                            <ClientSelector
                                value={values.client}
                                onChange={val => setFieldValue("client", val)}
                                error={touched.client && errors.client}
                                helperText={touched.client && errors.client}
                                onBlur={handleBlur}
                            />
                            <DatePicker
                                label="Fecha de devolución estimada"
                                value={values.returnDate ? dayjs(values.returnDate) : null}
                                minDate={dayjs().add(1, 'day')}
                                views={['year', 'month', 'day']}
                                format={"YYYY-MM-DD"}
                                onChange={date => {
                                    const formatted = date.format("YYYY-MM-DD");
                                    setFieldValue("returnDate", formatted);
                                    setSelectedReturnDate(formatted);
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        variant: "filled",
                                        name: "returnDate",
                                        error: !!touched.returnDate && !!errors.returnDate,
                                        helperText: touched.returnDate && errors.returnDate,
                                        sx: { gridColumn: "span 4" },
                                    },
                                }}
                            />
                        </Box>
                        {estimatedCost !== null && (
                            <Box
                                mt={2}
                                mb={2}
                                sx={{
                                    color: colors.grey[100],
                                    border: `1px solid ${colors.greenAccent[700]}`,
                                    borderRadius: '6px',
                                    padding: '6px 14px',
                                    fontWeight: 500,
                                    fontSize: '0.98rem',
                                    display: 'inline-block',
                                    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.04)'
                                }}
                            >
                                <span style={{fontWeight: 600}}>Costo estimado:</span> {estimatedCost.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                            </Box>
                        )}
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="primary" variant="contained">
                                Registrar Préstamo
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default LoanTool;