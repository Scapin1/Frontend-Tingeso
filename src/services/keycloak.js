import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: 'http://localhost:9090',
    realm: 'ToolRent',
    clientId: 'FrontEnd'
});

export default keycloak;