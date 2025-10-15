import Keycloak from "keycloak-js";

const KEYCLOAK_URL = import.meta.env.VITE_KEYCLOAK_URL;

const keycloak = new Keycloak({
    url: KEYCLOAK_URL,
    realm: 'ToolRent',
    clientId: 'FrontEnd'
});

export default keycloak;