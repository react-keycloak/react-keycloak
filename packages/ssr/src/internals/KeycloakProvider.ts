import { createAuthProvider } from '@react-keycloak/core'

import { reactKeycloakSsrContext } from './context'

export const KeycloakProvider = createAuthProvider(reactKeycloakSsrContext)
