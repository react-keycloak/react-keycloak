// Type definitions for @react-keycloak/core
// Project: https://github.com/react-keycloak/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4

import {
  KeycloakError,
  KeycloakInitOptions,
  KeycloakInstance,
} from 'keycloak-js'
import { Component } from 'react'

/**
 * ReactKeycloak Context props
 */
export type IReactKeycloakContextProps = {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak?: KeycloakInstance

  /**
   * Boolean indicating whenever the Keycloak instance has been initialized by KeycloakProvider
   */
  initialized: boolean
}

/**
 * Set of tokens provided by Keycloak
 */
export type KeycloakTokens = {
  /**
   * Current idToken returned by Keycloak.
   */
  idToken: string

  /**
   * Current refreshToken returned by Keycloak.
   */
  refreshToken: string

  /**
   * Current JWT token returned by Keycloak.
   */
  token: string
}

/**
 * A loading check function to customize LoadingComponent display condition.
 *
 * @param {KeycloakInstance} keycloak the current Keycloak instance.
 * @returns {boolean} Set to true to display LoadingComponent, false to hide it.
 */
export type KeycloakLoadingCheck = (keycloak: KeycloakInstance) => boolean

/**
 * ReactKeycloak event types
 */
export type KeycloakEvent =
  | 'onReady'
  | 'onInitError'
  | 'onAuthSuccess'
  | 'onAuthError'
  | 'onAuthRefreshSuccess'
  | 'onAuthRefreshError'
  | 'onAuthLogout'
  | 'onTokenExpired'

/**
 * A function that receives Keycloak events.
 */
export type KeycloakEventHandler = (
  eventType: KeycloakEvent,
  error?: KeycloakError
) => void

/**
 * A function that receives Keycloak tokens.
 *
 * @param {KeycloakTokens} tokens The current Keycloak tokens set.
 */
export type KeycloakTokensHandler = (tokens: KeycloakTokens) => void

/**
 * Props that can be passed to KeycloakProvider
 */
export type ProviderProps = {
  /**
   * The single Keycloak instance to be used by your application.
   */
  keycloak: KeycloakInstance

  /**
   * A flag to enable automatic token refresh. Defaults to true.
   * This is useful if you need to disable it (not recommended).
   */
  autoRefreshToken?: boolean

  /**
   * The KeycloakJS config to be used when initializing Keycloak instance.
   */
  initConfig?: KeycloakInitOptions

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: KeycloakLoadingCheck

  /**
   * An optional component to display while Keycloak instance is being initialized.
   */
  LoadingComponent?: JSX.Element

  /**
   * An optional function to receive Keycloak events as they happen.
   */
  onEvent?: KeycloakEventHandler

  /**
   * An optional function to receive Keycloak tokens when changed.
   */
  onTokens?: KeycloakTokensHandler
}

/**
 * Makes the Keycloak instance available to the withKeycloak() and useKeycloak() calls in the component hierarchy below.
 */
export class KeycloakProvider extends Component<ProviderProps> {}

/**
 * Create a React context with Keycloak instance.
 *
 * @param {IReactKeycloakContextProps} initialContext initial context value.
 * @returns {React.Context} the ReactKeycloak context.
 */
export function createReactKeycloakContext(
  initialContext?: IReactKeycloakContextProps
): React.Context<IReactKeycloakContextProps>

/**
 * Create a ReactKeycloak Provider component to wrap the app
 *
 * @param {React.Context} ReactKeycloakContext A ReactKeycloak context instance.
 * @returns {KeycloakProvider} the provider for the specified ReactKeycloak context.
 */
export function createReactKeycloakProvider(
  ReactKeycloakContext: React.Context<IReactKeycloakContextProps>
): KeycloakProvider
