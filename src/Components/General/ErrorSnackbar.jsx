import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const ErrorSnackbar = ({ message, open, onClose, autoHideDuration = 4000, severity = "error" }) => (
    <Snackbar
        open={open}
        autoHideDuration={autoHideDuration}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
        <MuiAlert elevation={6} variant="filled" severity={severity} sx={{ width: '100%' }} onClose={onClose}>
            {message}
        </MuiAlert>
    </Snackbar>
);

export default ErrorSnackbar;

