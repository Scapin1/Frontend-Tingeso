import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ClientEditButton({ onClick }) {
    return (
        <Tooltip title="Editar">
            <IconButton onClick={onClick}>
                <EditIcon />
            </IconButton>
        </Tooltip>
    );
}