import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: 'http://localhost:9019',
    realm: 'ToolRent',
    clientId: 'FrontEnd'
});

export default keycloak;