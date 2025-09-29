import React from "react";
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
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate();

    const handleFormSubmit = async (values) => {
        await LoanService.addLoan({
            returnDate: values.returnDate,
            loanDate: dayjs().format("YYYY-MM-DD"),
            status: "NORMAL",
            toolLoaned: {name: values.tool.name},
            client: {id: values.client.id},
        }).catch((err) => {
            alert("Error registering loan: " + err.response.data.message);
        });
        navigate("/loans");
    };

    return (
        <Box m="20px">
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
                                onChange={val => setFieldValue("tool", val)}
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
                                    setFieldValue("returnDate", date.format("YYYY-MM-DD"));
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