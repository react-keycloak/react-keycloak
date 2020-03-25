const serverEnv = (key, def) => process?.env?.[key] ?? def

function getKeycloakConfig() {
  return typeof window !== 'undefined' && window.env !== 'undefined'
    ? {
        // client
        url: window.env
          ? window.env.KEYCLOAK_URL
          : serverEnv('KEYCLOAK_URL', 'http://localhost:8080/auth'),
        clientId: window.env
          ? window.env.KEYCLOAK_CLIENT_ID
          : serverEnv('KEYCLOAK_CLIENT_ID', 'react-test'),
        realm: window.env
          ? window.env.KEYCLOAK_REALM
          : serverEnv('KEYCLOAK_REALM', 'Test'),
      }
    : {
        // server
        url: serverEnv('KEYCLOAK_URL', 'http://localhost:8080/auth'),
        clientId: serverEnv('KEYCLOAK_CLIENT_ID', 'react-test'),
        realm: serverEnv('KEYCLOAK_REALM', 'Test'),
      }
}

export { getKeycloakConfig }
