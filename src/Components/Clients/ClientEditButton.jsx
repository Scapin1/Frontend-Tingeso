import React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
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