import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import keycloak from "./services/keycloak.js";
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {BrowserRouter} from "react-router-dom";


createRoot(document.getElementById('root')).render(
    <ReactKeycloakProvider authClient={keycloak}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReactKeycloakProvider>,
)
