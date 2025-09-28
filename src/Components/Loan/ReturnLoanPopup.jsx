import ReactDOM from "react-dom";
import {
    Box,
    Typography,
    Checkbox,
    FormControlLabel,
    Button
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme.js";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const ReturnLoanPopup = ({ open, onClose, onConfirm, damaged, setDamaged }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    if (!open) return null;

    return ReactDOM.createPortal(
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1300,
            }}
        >
            <Box
                sx={{
                    backgroundColor: colors.primary[400],
                    padding: "30px",
                    borderRadius: "10px",
                    width: "400px",
                    maxWidth: "90vw",
                    boxShadow: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography variant="h6" textAlign="center">
                    Confirmar devolución
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={damaged}
                            onChange={(e) => setDamaged(e.target.checked)}
                            icon={<CheckBoxOutlineBlankIcon />}
                            checkedIcon={<CloseIcon sx={{ color: "#d32f2f" }} />}
                        />
                    }
                    label="La herramienta está dañada"
                />

                <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onClose}
                        sx={{ fontWeight: "bold" }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onConfirm}
                        sx={{
                            backgroundColor: "#e0e0e0",
                            color: "#212121",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#d5d5d5",
                            },
                        }}
                    >
                        Confirmar
                    </Button>
                </Box>
            </Box>
        </Box>,
        document.body
    );
};

export default ReturnLoanPopup;