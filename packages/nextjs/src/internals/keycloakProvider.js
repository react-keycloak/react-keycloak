import { createReactKeycloakProvider } from '@react-keycloak/core'

import { KeycloakContext } from './keycloak'

const reactKeycloakProvider = createReactKeycloakProvider(KeycloakContext)

export default reactKeycloakProvider
