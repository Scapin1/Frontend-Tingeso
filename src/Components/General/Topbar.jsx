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
        <Box display="flex" justifyContent="right" p={2} >
            <IconButton>
                {isAuthenticated ?
                    <LogoutIcon onClick={handleLogout} />
                    :
                    <LoginIcon onClick={handleLogin} />
                }
            </IconButton>
        </Box>
    );
};

export default Topbar;
