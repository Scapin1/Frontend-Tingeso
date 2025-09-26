import { Box, IconButton, useTheme } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import { ColorModeContext, tokens } from "../../theme.js";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import keycloak from "../../services/keycloak.js";


const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isAuthenticated, setIsAuthenticated] = useState(keycloak.authenticated);
    const colorMode = useContext(ColorModeContext);

    useEffect(() => {
        const handleAuth = () => {
            setIsAuthenticated(keycloak.authenticated);
        };
        keycloak.onAuthSuccess = handleAuth;
        keycloak.onAuthLogout = handleAuth;
        return () => {
            keycloak.onAuthSuccess = null;
            keycloak.onAuthLogout = null;
        };
    }, []);

    const handleLogin = () => {
        keycloak.login();
    };

    const handleLogout = () => {
        keycloak.logout();
    };

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            {/* SEARCH BAR */}
            <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            {/* ICONS */}
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                    ) : (
                    <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton>
                    {isAuthenticated ?
                        <LogoutIcon onClick={handleLogout} />
                        :
                        <LoginIcon onClick={handleLogin} />
                    }
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
