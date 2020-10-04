import type { AuthClient } from '@react-keycloak/core'

export interface SSRAuthClient extends AuthClient {
  /** A boolean indicating if the user is authenticated or not. */
  authenticated?: boolean
}
