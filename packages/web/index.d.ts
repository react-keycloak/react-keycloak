// Type definitions for @react-keycloak/web
// Project: https://github.com/react-keycloak/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4

import {
  IReactKeycloakContextProps,
  ProviderProps as KeycloakProviderProps,
} from '@react-keycloak/core'
import { KeycloakInstance } from 'keycloak-js'
import { Component, ComponentType } from 'react'

export {
  KeycloakEvent,
  KeycloakEventHandler,
  KeycloakLoadingCheck,
  KeycloakTokens,
  KeycloakTokensHandler,
} from '@react-keycloak/core'

/**
 * Makes the Keycloak instance available to the withKeycloak() and useKeycloak() calls in the component hierarchy below.
 */
export class KeycloakProvider extends Component<KeycloakProviderProps> {}

/**
 * Props injected by withKeycloak HOC
 */
export type ReactKeycloakInjectedProps = {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak: KeycloakInstance

  /**
   * Boolean indicating whenever the Keycloak instance has been initialized by KeycloakProvider
   */
  keycloakInitialized: boolean
}

/**
 * Makes the Keycloak instance and initialization state available to the wrapped component.
 */
export function withKeycloak(
  component: ComponentType<ReactKeycloakInjectedProps>
): ComponentType

/**
 *
 */
export type ReactKeycloakHookResult = IReactKeycloakContextProps &
  [KeycloakInstance, boolean]

/**
 * Return the Keycloak instance and initialization state.
 */
export function useKeycloak(): ReactKeycloakHookResult
