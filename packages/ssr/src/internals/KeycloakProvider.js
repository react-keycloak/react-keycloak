import { createReactKeycloakProvider } from '@react-keycloak/core'

import { KeycloakContext } from './context'

const KeycloakProvider = createReactKeycloakProvider(KeycloakContext)

export { KeycloakProvider }
