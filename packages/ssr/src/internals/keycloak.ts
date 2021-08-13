import type { AuthClient } from '@react-keycloak/core'
import type { KeycloakConfig } from 'keycloak-js'

import type { TokenPersistor } from '../persistors/types'
import type { SSRAuthClient } from '../types'

import { isServer } from './utils'

// Keycloak singleton
let keycloakInstance: AuthClient

// KeycloakStub singleton
let keycloakStubInstance: SSRAuthClient

// this is a fake Keycloak instance we use to initialize Keycloak on the server.
// This gets over-written as soon as Keycloak is initialized on the client.
export const getKeycloakStub = (persistor: TokenPersistor): AuthClient => {
  const kcTokens = persistor.getTokens()

  keycloakStubInstance = {
    init: () => Promise.resolve(true),
    updateToken: () => Promise.resolve(false),
    idToken: kcTokens.idToken,
    token: kcTokens.token,
    refreshToken: kcTokens.refreshToken,
    authenticated: !!kcTokens.idToken && !!kcTokens.token,
  } as unknown as SSRAuthClient

  return keycloakStubInstance
}

const Keycloak = !isServer() ? require('keycloak-js') : null

export const getKeycloakInstance = (
  keycloakConfig: KeycloakConfig,
  persistor?: TokenPersistor,
  recreate = false
) => {
  const isServerCheck = isServer()

  if (recreate || (!keycloakInstance && !isServerCheck)) {
    keycloakInstance = new Keycloak(keycloakConfig)
  }

  return !isServerCheck ? keycloakInstance : getKeycloakStub(persistor!)
}
