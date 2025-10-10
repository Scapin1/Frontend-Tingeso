
import Home from './Components/General/Home.jsx';
import {Route, Routes} from 'react-router-dom'
import {useMode} from "./theme.js";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {ColorModeContext} from "./theme.js";
import Tools from "./Components/Tools/Tools.jsx";
import {useKeycloak} from "@react-keycloak/web";
import SidebarMenu from "./Components/General/Sidebar.jsx";
import {useState} from "react";
import Topbar from "./Components/General/Topbar.jsx";
import Dragon from "./Components/Other/Dragon.jsx";
import LoanTool from "./Components/Loan/LoanTool.jsx";
import ToolsAdd from "./Components/Tools/ToolsAdd.jsx";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import Loading from "./Components/General/Loading.jsx";
import Restricted from "./Components/General/Restricted.jsx";
import Clients from "./Components/Clients/Clients.jsx";
import ClientsAdd from "./Components/Clients/ClientsAdd.jsx";
import Loans from "./Components/Loan/Loans.jsx";
import Kardex from "./Components/Kardex/Kardex.jsx";
import ToolLoansDashboard from "./Components/Data/ToolLoansDashboard.jsx";

function App() {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);
    const {keycloak, initialized} = useKeycloak()
    if (!initialized) {
        return <Loading/>;
    }
    const isLoggedIn = keycloak.authenticated;
    const roles = keycloak.realmAccess?.roles || [];
    const PrivateRoute = ({element,rolesAllowed}) => {
        if (!isLoggedIn) {
            keycloak.login();
            return null
        }
        if (rolesAllowed && !rolesAllowed.some(role => roles.includes(role))) {
            return <Restricted/>;
        }
        return element;
    }

return (
    <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
            <SidebarMenu isSidebar={isSidebar}/>
                <main className="content">
                    <Topbar setSidebar={setIsSidebar}/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<PrivateRoute element={<Home />} rolesAllowed={["ADMIN","EMPLOYEE"]} />} />
                        <Route path="/tools" element={<PrivateRoute element={<Tools />} rolesAllowed={["ADMIN","EMPLOYEE"]} />} />
                        <Route path="/tools/add" element={<PrivateRoute element={<ToolsAdd />} rolesAllowed={["ADMIN"]} />} />
                        <Route path="/loanTool" element={<PrivateRoute element={<LocalizationProvider dateAdapter={AdapterDayjs}> <LoanTool /> </LocalizationProvider>} rolesAllowed={["ADMIN","EMPLOYEE"]} />} />
                        <Route path="/clients" element={<PrivateRoute element={<Clients/>} rolesAllowed={["ADMIN","EMPLOYEE"]} />} />
                        <Route path="/clients/add" element={<PrivateRoute element={<ClientsAdd/>} rolesAllowed={["ADMIN","EMPLOYEE"]} />} />
                        <Route path="/dragon" element={<PrivateRoute element={<Dragon/>} rolesAllowed={["ADMIN"]} />} />
                        <Route path="/loanTool" element={<PrivateRoute element={<LoanTool/>} rolesAllowed={["ADMIN"]} />} />
                        <Route path="/loans" element={<PrivateRoute element={<Loans />} rolesAllowed={["ADMIN","EMPLOYEE"]} />} />
                        <Route path="/kardex" element={<PrivateRoute element={<Kardex />} rolesAllowed={["ADMIN","EMPLOYEE"]} />} />
                        <Route path="/data" element={<PrivateRoute element={<ToolLoansDashboard />} rolesAllowed={["ADMIN","EMPLOYEE"]} />} />
                    </Routes>
                </main>
            </div>
        </ThemeProvider>
    </ColorModeContext.Provider>
    )
}

export default App
