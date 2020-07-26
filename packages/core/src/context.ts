import { createContext } from 'react'

import { KeycloakClient } from './types'

/**
 * ReactKeycloak Context props
 */
export type IReactKeycloakContextProps = {
  /**
   * The single Keycloak client of your application.
   */
  keycloak?: KeycloakClient

  /**
   * Boolean indicating whenever the Keycloak client has been initialized by KeycloakProvider
   */
  initialized: boolean
}

/**
 * Create a React context containing a KeycloakClient instance.
 *
 * @param {IReactKeycloakContextProps} initialContext initial context value.
 *
 * @returns {React.Context} the ReactKeycloak context.
 */
export function createReactKeycloakContext(
  initialContext?: Partial<IReactKeycloakContextProps>
): React.Context<IReactKeycloakContextProps> {
  return createContext({
    initialized: false,
    ...initialContext,
  })
}

export default createReactKeycloakContext
