import {useEffect, useState} from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
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
                    title="Home"
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
                    Data
                </Typography>
                <Item
                    title="Manage Team"
                    to="/employees"
                    icon={<PeopleOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Contacts Information"
                    to="/clients"
                    icon={<ContactsOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Tools"
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
                    Pages
                </Typography>
                <Item
                    title="Add Loan"
                    to="/loanTool"
                    icon={<CreditScoreIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="Calendar"
                    to="/calendar"
                    icon={<CalendarTodayOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />
                <Item
                    title="FAQ Page"
                    to="/faq"
                    icon={<HelpOutlineOutlinedIcon />}
                    selected={selected}
                    setSelected={setSelected}
                />

                <Typography
                    variant="h6"
                    color={colors.grey[300]}
                    sx={{ m: "15px 0 5px 20px" }}
                >
                    Charts
                </Typography>
                <Item
                    title="Bar Chart"
                    to="/bar"
                    icon={<BarChartOutlinedIcon />}
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
