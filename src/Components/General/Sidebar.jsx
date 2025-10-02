import {useEffect, useState} from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import HandymanIcon from "@mui/icons-material/Handyman";
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import * as React from "react";
import keycloak from "../../services/keycloak.js";
import { useNavigate } from "react-router-dom";

const Item = ({ title, to ,icon ,selected, setSelected }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => {setSelected(title); navigate(to);}}
            icon={icon}
        >
            <Typography>{title}</Typography>
        </MenuItem>
    );
};

const SidebarMenu = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [userName, setUserName] = useState("");
    useEffect(() => {
        if (keycloak.authenticated && keycloak.tokenParsed) {
            setUserName(keycloak.tokenParsed.preferred_username || keycloak.tokenParsed.name || "");
        } else {
            setUserName("");
        }
    }, [location, keycloak.authenticated]);

    return (
        <Box>
            <Sidebar collapsed={isCollapsed}
                rootStyles={{
                    [`.${sidebarClasses.container}`]: {
                        backgroundColor: colors.primary[400],
                        backgroundImage: "none",
                        boxShadow: "none",
                    },
                }}
            >
            <Menu iconShape="square"
                menuItemStyles={{
                    button: ({ active, disabled }) => ({
                        color: disabled ? colors.grey[300] : colors.grey[100],
                        backgroundColor: active ? colors.primary[600] : "transparent",
                        "&:hover": {
                            color: colors.primary[400],
                            backgroundColor: colors.primary[500],
                        },
                    }),
                }}
            >
            {/* LOGO AND MENU ICON */}
            <MenuItem
                onClick={() => setIsCollapsed(!isCollapsed)}
                icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                style={{
                    margin: "10px 0 20px 0",
                    color: colors.grey[100],
                }}
            >
                {!isCollapsed && (
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        ml="15px"
                    >
                        <Typography variant="h3" color={colors.grey[100]}>
                            ToolRent
                        </Typography>
                        <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                            <MenuOutlinedIcon />
                        </IconButton>
                    </Box>
                )}
            </MenuItem>

            {!isCollapsed && (
                <Box mb="25px" display="flex" flexDirection="column" alignItems="center">
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            background: colors.primary[600],
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 1,
                        }}
                    >
                        <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                            {userName.charAt(0).toUpperCase()}
                        </Typography>
                    </Box>
                    <Typography
                        variant="h6"
                        color={colors.grey[100]}
                        fontWeight="bold"
                        sx={{ textAlign: "center", textTransform: "capitalize" }}
                    >
                        {userName}
                    </Typography>
                </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                <Item
                    title="Inicio"
                    to="/home"
                    icon={<HomeOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Información
                </Typography>
                <Item
                    title="Información Clientes"
                    to="/clients"
                    icon={<ContactsOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Herramientas"
                    to="/tools"
                    icon={<HandymanIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Prestamos
                </Typography>
                <Item
                    title="Nuevo Préstamo"
                    to="/loanTool"
                    icon={<CreditScoreIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Prestamos Activos"
                    to="/loans"
                    icon={<ChecklistRtlIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Reportes y Estadísticas
                </Typography>
                <Item
                    title="kardex"
                    to="/kardex"
                    icon={<Inventory2OutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Pie Chart"
                    to="/pie"
                    icon={<PieChartOutlineOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Line Chart"
                    to="/line"
                    icon={<TimelineOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Geography Chart"
                    to="/geography"
                    icon={<MapOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                </Box>
            </Menu>
            </Sidebar>
        </Box>
    );
};

export default SidebarMenu;
