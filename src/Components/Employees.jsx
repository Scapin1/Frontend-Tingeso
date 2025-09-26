import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid} from "@mui/x-data-grid";
import { tokens } from "../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import userService from "../services/user.service";
import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button ,Select, MenuItem } from "@mui/material";



const Team = () => {
    const theme = useTheme();
    const [employees, setEmployees] = useState([]);
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ firstName: "", lastName: "", email: "", role: "", password: "" });
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        await userService
            .register(form)
            .then((response) => {
                console.log("User created successfully:", response.data);
                init();
                handleClose();
            }).catch((error) => {
                console.error("There was an error!", error);
            });
    };
    const init = () => {
        userService
            .get()
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
        };
        useEffect(() => {
            init();
        }, []);
        const columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center"
        },
        {
            field: "firstName",
            headerName: "First Name",
            align: "center",
            flex: 1,
            cellClassName: "name-column--cell",
            headerAlign: "center"
        },
        {
            field: "lastName",
            headerName: "Last Name",
            headerAlign: "center",
            align: "center",
            flex: 1
        },
        {
            field: "email",
            headerName: "Email",
            headerAlign: "center",
            align: "center",
            flex: 1
        },
        {
            field: "role",
            headerName: "Access Level",
            flex: 1,
            headerAlign: "center",
            renderCell: ({ row: { role } }) => {
            return (
                <Box
                width="60%"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                backgroundColor={
                    role === "ADMIN"
                    ? colors.greenAccent[600]
                    : colors.greenAccent[700]
                }
                borderRadius="4px"
                >
                {role === "ADMIN" && <AdminPanelSettingsOutlinedIcon />}
                {role === "EMPLOYEE" && <LockOpenOutlinedIcon />}
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                    {role}
                </Typography>
                </Box>
            );
            },
        },
    ];

    return (
        <Box m="20px">
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
            <DataGrid rows={employees} columns={columns} showToolbar />
            </Box>
            <>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <button
                        style={{
                            padding: "10px 20px",
                            background: colors.greenAccent[600],
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                        onClick={handleOpen}
                    >
                        Create New Employee
                    </button>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Create New Employee</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            label="First Name"
                            name="firstName"
                            fullWidth
                            value={form.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Last Name"
                            name="lastName"
                            fullWidth
                            value={form.lastName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            name="email"
                            fullWidth
                            value={form.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            value={form.password}
                            onChange={handleChange}
                        />
                        <Select
                            margin="dense"
                            label="Role"
                            name="role"
                            fullWidth
                            value={form.role}
                            onChange={handleChange}
                            displayEmpty
                        >
                            <MenuItem value=""><em>Select Role</em></MenuItem>
                            <MenuItem value="ADMIN">ADMIN</MenuItem>
                            <MenuItem value="EMPLOYEE">EMPLOYEE</MenuItem>
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        </Box>
    );
};

export default Team;
