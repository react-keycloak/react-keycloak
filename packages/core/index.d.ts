// Type definitions for @react-keycloak/core
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { Component } from 'react'
import {
  KeycloakError,
  KeycloakInitOptions,
  KeycloakInstance,
} from 'keycloak-js'

/**
 * ReactKeycloak Context props
 */
export interface IReactKeycloakContextProps {
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
 * Create a React context with Keycloak instance
 * @param initialContext initial context value
 */
export function createReactKeycloakContext(
  initialContext?: IReactKeycloakContextProps
): React.Context<IReactKeycloakContextProps>

export interface KeycloakTokens {
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

export type KeycloakLoadingCheck = (keycloak: KeycloakInstance) => boolean

export type KeycloakEvent =
  | 'onReady'
  | 'onAuthSuccess'
  | 'onAuthError'
  | 'onAuthRefreshSuccess'
  | 'onAuthRefreshError'
  | 'onAuthLogout'
  | 'onTokenExpired'

export type KeycloakEventHandler = (
  eventType: KeycloakEvent,
  error?: KeycloakError
) => void

export type KeycloakTokensHandler = (tokens: KeycloakTokens) => void

export interface ProviderProps {
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
 * Create a ReactKeycloak Provider component to wrap the app
 * @param ReactKeycloakContext A ReactKeycloak context instance
 */
export function createReactKeycloakProvider(
  ReactKeycloakContext: React.Context<IReactKeycloakContextProps>
): KeycloakProvider
