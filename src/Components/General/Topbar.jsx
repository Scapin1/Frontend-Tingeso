import { Box, IconButton, useTheme } from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ColorModeContext, tokens} from "../../theme.js";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import keycloak from "../../services/keycloak.js";
import {redirect} from "react-router-dom";


const Topbar = () => {
    const theme = useTheme();
    const [isAuthenticated, setIsAuthenticated] = useState(keycloak.authenticated);
    const colorMode = useContext(ColorModeContext);
    const colors = tokens(theme.palette.mode);

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
        keycloak.logout({redirectUri:"http://localhost:5173/" });
    };

    return (
        <Box display="flex" justifyContent="right" p={2} bgcolor={colors.primary[600]} width="100%" >
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                ) : (
                    <LightModeOutlinedIcon />
                )}
            </IconButton>
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
