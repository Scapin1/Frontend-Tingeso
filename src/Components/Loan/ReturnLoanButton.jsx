import { IconButton, Tooltip } from "@mui/material";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { useState } from "react";
import loanService from "../../services/loan.service.js";
import ReturnLoanPopup from "./ReturnLoanPopup.jsx";

const ReturnLoanButton = ({ loanId, status, onReturned }) => {
    const disabled = status === "FINISHED" || status === "IN_REPAIR";
    const [open, setOpen] = useState(false);
    const [damaged, setDamaged] = useState(false);

    const handleConfirm = () => {
        loanService.returnLoan(loanId, damaged)
            .then(() => {
                if (typeof onReturned === "function") {
                    onReturned(); // refresca la vista desde el componente padre
                }
            })
            .catch((err) => console.error("Error al devolver préstamo:", err));
        setOpen(false);
        setDamaged(false);
    };

    return (
        <>
            <Tooltip title={disabled ? "Préstamo ya finalizado" : "Devolver préstamo"}>
                <span>
                    <IconButton
                        onClick={() => setOpen(true)}
                        disabled={disabled}
                        size="small"
                        sx={{
                            backgroundColor: disabled ? "#424242" : "#d32f2f",
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: disabled ? "#424242" : "#b71c1c",
                            },
                            borderRadius: "6px",
                        }}
                    >
                        <AssignmentReturnIcon />
                    </IconButton>
                </span>
            </Tooltip>

            <ReturnLoanPopup
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleConfirm}
                damaged={damaged}
                setDamaged={setDamaged}
            />
        </>
    );
};

export default ReturnLoanButton;