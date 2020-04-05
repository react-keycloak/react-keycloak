// Type definitions for @react-keycloak/nextjs
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { Component, ComponentType } from 'react'
import {
  IReactKeycloakContextProps,
  KeycloakEventHandler,
  KeycloakLoadingCheck,
  KeycloakTokens,
  KeycloakTokensHandler,
} from '@react-keycloak/core'
import {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakInstance,
} from 'keycloak-js'

/**
 * TokenPersistor
 */
export interface TokenPersistor {
  setTokens: (tokens: KeycloakTokens) => void

  getTokens: () => KeycloakTokens

  resetTokens: () => void
}

/**
 * SSRKeycloakProviderProps
 */
export interface SSRKeycloakProviderProps {
  /**
   * The KeycloakJS config to setup a Keycloak instance with.
   */
  keycloakConfig: KeycloakConfig

  /**
   * The token Persistor
   */
  persistor: TokenPersistor

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
export class SSRKeycloakProvider extends Component<SSRKeycloakProviderProps> {}

/**
 * Props injected by withKeycloak HOC
 */
export interface ReactKeycloakInjectedProps {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak: KeycloakInstance

  /**
   * Boolean indicating whenever the Keycloak instance has been initialized by KeycloakProvider
   */
  keycloakInitialized: boolean

  /**
   * Boolean indicating whenever the component is been rendered server-side or client-side
   */
  isServer: boolean
}

/**
 * Makes the Keycloak instance and initialization state available to the wrapped component.
 */
export function withKeycloak(
  component: ComponentType<ReactKeycloakInjectedProps>
): ComponentType

/**
 * Props returned by useKeycloak hook
 */
export type SSRKeycloakContextProps = IReactKeycloakContextProps & {
  /**
   * Boolean indicating whenever the component is been rendered server-side or client-side
   */
  isServer: boolean
}

export type ReactKeycloakHookResult = SSRKeycloakContextProps &
  [KeycloakInstance, boolean, boolean]

/**
 * Return the Keycloak instance and initialization state.
 */
export function useKeycloak(): ReactKeycloakHookResult

/**
 * Cookies set by Persistors.Cookies
 */
export interface KeycloakCookies {
  kcToken?: string
  kcIdToken?: string
}

/**
 * Persistors
 */
export class Persistors {
  static Cookies: (serverSideCookies?: KeycloakCookies) => TokenPersistor
}
