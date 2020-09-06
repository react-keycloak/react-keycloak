import { createAuthContext } from '@react-keycloak/core'
import type { AuthClient } from '@react-keycloak/core'

import { isServer } from './utils'

// Context to hold Keycloak and his state
export const reactKeycloakSsrContext = createAuthContext<AuthClient>({
  initialized: isServer(),
})

export const ReactKeycloakSSRContextConsumer = reactKeycloakSsrContext.Consumer
