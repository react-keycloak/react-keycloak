import { isServer } from './utils'

const noops = {
  string: () => '',
  boolean: () => true,
}

// Keycloak singleton
let keycloakInstance

// KeycloakStub singleton
let keycloakStubInstance

// this is a fake Keycloak instance we use to initialize Keycloak on the server.
// This gets over-written as soon as Keycloak is initialized on the client.
export const getKeycloakStub = (persistor) => {
  const kcTokens = persistor.getTokens()

  if (!keycloakStubInstance) {
    keycloakStubInstance = {
      login: () => Promise.resolve(),
      logout: () => Promise.resolve(),
      register: () => Promise.resolve(),
      accountManagement: () => Promise.resolve(),
      init: () => Promise.resolve(),
      createLoginUrl: noops.string,
      createLogoutUrl: noops.string,
      createAccountUrl: noops.string,
      createRegisterUrl: noops.string,
      isTokenExpired: noops.boolean,
      updateToken: () => Promise.resolve(),
      clearToken: noops.string,
      hasRealmRole: noops.boolean,
      hasResourceRole: noops.boolean,
      loadUserProfile: () => Promise.resolve(),
      loadUserInfo: () => Promise.resolve(),
      authenticated: !!kcTokens.token,
      idToken: kcTokens.idToken,
      token: kcTokens.token,
      refreshToken: kcTokens.refreshToken,
    }
  }

  return keycloakStubInstance
}

const Keycloak = !isServer() ? require('keycloak-js') : null

export const getKeycloakInstance = (keycloakConfig, recreate = false) => {
  const isServerCheck = isServer()

  if (recreate || (!keycloakInstance && !isServerCheck)) {
    keycloakInstance = new Keycloak(keycloakConfig)
  }

  return !isServerCheck ? keycloakInstance : keycloakStubInstance
}
