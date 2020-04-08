// Type definitions for @react-keycloak/nextjs
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4

import {
  IReactKeycloakContextProps,
  KeycloakTokens,
  ProviderProps as KeycloakProviderProps,
} from '@react-keycloak/core'
import { KeycloakConfig, KeycloakInstance } from 'keycloak-js'
import { Component, ComponentType } from 'react'

export {
  KeycloakEvent,
  KeycloakEventHandler,
  KeycloakLoadingCheck,
  KeycloakTokens,
  KeycloakTokensHandler,
} from '@react-keycloak/core'

/**
 * Omit utility type polyfill for TypeScript 2.8+
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * TokenPersistor
 */
export interface TokenPersistor {
  /**
   * Invoked to store current/updated Keycloak tokens.
   *
   * @param {KeycloakTokens} tokens The current Keycloak tokens set.
   */
  setTokens: (tokens: KeycloakTokens) => void

  /**
   * Invoked to retrieve Keycloak tokens to use.
   *
   * @returns {KeycloakTokens} Keycloak tokens set to be used.
   */
  getTokens: () => KeycloakTokens

  /**
   * Invoked when stored Keycloak tokens should be removed.
   */
  resetTokens: () => void
}

/**
 * SSRKeycloakProviderProps
 */
export type SSRKeycloakProviderProps = Omit<
  KeycloakProviderProps,
  'keycloak'
> & {
  /**
   * The KeycloakJS config to setup a Keycloak instance with.
   */
  keycloakConfig: KeycloakConfig

  /**
   * The token Persistor
   */
  persistor: TokenPersistor
}

/**
 * Makes the Keycloak instance available to the withKeycloak() and useKeycloak() calls in the component hierarchy below.
 */
export class SSRKeycloakProvider extends Component<SSRKeycloakProviderProps> {}

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

/**
 * getKeycloakInstance returns the current Keycloak instance
 *
 * @param {KeycloakConfig} keycloakConfig the Keycloak config to be use on instance creation.
 * @param {boolean} recreate a boolean indicating whenever the Keycloak instance should be recreated, false by default.
 *
 * @returns {KeycloakInstance} the current (or newly created) Keycloak instance
 */
export function getKeycloakInstance(
  keycloakConfig: KeycloakConfig,
  recreate: boolean = false
): KeycloakInstance
