import * as React from 'react'
import { createReactKeycloakContext } from '@react-keycloak/core'

import { isServer } from './utils'

// Context to hold Keycloak and his state
export const KeycloakContext = createReactKeycloakContext({
  initialized: isServer()
})

// Context to hold KeycloakStub instance
export const KeycloakStubContext = React.createContext({
  keycloak: null
})
