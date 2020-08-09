import { createAuthProvider } from '@react-keycloak/core'

import { reactKeycloakWebContext } from './context'

export const ReactKeycloakProvider = createAuthProvider(reactKeycloakWebContext)
