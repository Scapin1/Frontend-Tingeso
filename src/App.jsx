
import { Route, Routes } from 'react-router-dom'
import { useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./theme.js";
import { useKeycloak } from "@react-keycloak/web";
import SidebarMenu from "./Components/General/Sidebar.jsx";
import { useState, Suspense, lazy } from "react";
import Topbar from "./Components/General/Topbar.jsx";

import Loading from "./Components/General/Loading.jsx";
import Restricted from "./Components/General/Restricted.jsx";

// Lazy Load Components
const Home = lazy(() => import('./Components/General/Home.jsx'));
const Tools = lazy(() => import('./Components/Tools/Tools.jsx'));
const ToolsAdd = lazy(() => import('./Components/Tools/ToolsAdd.jsx'));
const LoanTool = lazy(() => import('./Components/Loan/LoanTool.jsx'));
const Clients = lazy(() => import('./Components/Clients/Clients.jsx'));
const ClientsAdd = lazy(() => import('./Components/Clients/ClientsAdd.jsx'));
const Loans = lazy(() => import('./Components/Loan/Loans.jsx'));
const Kardex = lazy(() => import('./Components/Kardex/Kardex.jsx'));
const ToolLoansDashboard = lazy(() => import('./Components/Data/ToolLoansDashboard.jsx'));

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const { keycloak, initialized } = useKeycloak()
    if (!initialized) {
        return <Loading />;
    }
    const isLoggedIn = keycloak.authenticated;
    const roles = keycloak.realmAccess?.roles || [];
    const PrivateRoute = ({ element, rolesAllowed }) => {
        if (!isLoggedIn) {
            keycloak.login();
            return null
        }
        if (rolesAllowed && !rolesAllowed.some(role => roles.includes(role))) {
            return <Restricted />;
        }
        return element;
    }

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                    <SidebarMenu isSidebar={isSidebar} />
                    <main className="content">
                        <Topbar setSidebar={setIsSidebar} />
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<PrivateRoute element={<Home />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
                                <Route path="/tools" element={<PrivateRoute element={<Tools />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
                                <Route path="/tools/add" element={<PrivateRoute element={<ToolsAdd />} rolesAllowed={["ADMIN"]} />} />
                                <Route path="/loanTool" element={<PrivateRoute element={<LoanTool />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
                                <Route path="/clients" element={<PrivateRoute element={<Clients />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
                                <Route path="/clients/add" element={<PrivateRoute element={<ClientsAdd />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
                                <Route path="/loanTool" element={<PrivateRoute element={<LoanTool />} rolesAllowed={["ADMIN"]} />} />
                                <Route path="/loans" element={<PrivateRoute element={<Loans />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
                                <Route path="/kardex" element={<PrivateRoute element={<Kardex />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
                                <Route path="/data" element={<PrivateRoute element={<ToolLoansDashboard />} rolesAllowed={["ADMIN", "EMPLOYEE"]} />} />
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}

export default App
