// Type definitions for react-keycloak 8.0.1-191210
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { Component, ComponentType } from 'react'
import {
  KeycloakError,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakPromiseType
} from 'keycloak-js'

/**
 * ReactKeycloak Context props
 */
export interface IReactKeycloakContextProps<
  TPromise extends KeycloakPromiseType = 'native'
> {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak?: KeycloakInstance<TPromise>

  /**
   * Boolean indicating whenever the Keycloak instance has been initialized by KeycloakProvider
   */
  initialized: boolean
}

/**
 * Create a React context with Keycloak instance
 * @param initialContext initial context value
 */
export function createReactKeycloakContext<
  TPromise extends KeycloakPromiseType = 'native'
>(
  initialContext?: IReactKeycloakContextProps<TPromise>
): React.Context<IReactKeycloakContextProps<TPromise>>

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

export type KeycloakLoadingCheck<
  TPromise extends KeycloakPromiseType = 'native'
> = (keycloak: KeycloakInstance<TPromise>) => boolean

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

export interface ProviderProps<
  TPromise extends KeycloakPromiseType = 'native'
> {
  /**
   * The single Keycloak instance to be used by your application.
   */
  keycloak: KeycloakInstance<TPromise>

  /**
   * The KeycloakJS config to be used when initializing Keycloak instance.
   */
  initConfig?: KeycloakInitOptions

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: KeycloakLoadingCheck<TPromise>

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
export class KeycloakProvider<
  TPromise extends KeycloakPromiseType = 'native'
> extends Component<ProviderProps<TPromise>> {}

/**
 * Create a ReactKeycloak Provider component to wrap the app
 * @param ReactKeycloakContext A ReactKeycloak context instance
 */
export function createReactKeycloakProvider<
  TPromise extends KeycloakPromiseType = 'native'
>(
  ReactKeycloakContext: React.Context<IReactKeycloakContextProps<TPromise>>
): KeycloakProvider<TPromise>
