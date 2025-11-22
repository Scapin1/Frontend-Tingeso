import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
<<<<<<< HEAD
    url: 'http://localhost:9019',
=======
    url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:9090',
>>>>>>> origin/main
    realm: 'ToolRent',
    clientId: 'FrontEnd'
});

export default keycloak;