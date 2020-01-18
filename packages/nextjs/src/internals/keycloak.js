import React from 'react'

const noops = {
  string: () => 'noop',
  boolean: () => true
}

// this is a fake Keycloak instance we use to initialize Keycloak on the server.
// This gets over-written as soon as Keycloak is initialized on the client.
const KeycloakStub = {
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
  authenticated: false
}

const Keycloak = typeof window !== 'undefined' ? require('keycloak-js') : null

export const getKeycloakInstance = initOptions =>
  typeof window === 'undefined' ? KeycloakStub : new Keycloak(initOptions)

export const KeycloakContext = React.createContext({
  keycloakInitialized: false,
  keycloak: KeycloakStub
})
