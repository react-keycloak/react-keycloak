import type { AuthClient } from '@react-keycloak/core'
import type { KeycloakInstance } from 'keycloak-js'

export interface SSRAuthClient extends AuthClient, KeycloakInstance {
  /** A boolean indicating if the user is authenticated or not. */
  authenticated?: boolean
}
