// Type definitions for @react-keycloak/razzle
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { ComponentType } from 'react'
import {
  IReactKeycloakContextProps,
  KeycloakTokens,
  KeycloakProvider
} from '@react-keycloak/core'
import {
  KeycloakConfig,
  KeycloakInstance,
  KeycloakPromiseType
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
 * SSRKeycloakProvider
 */
export interface SSRKeycloakProvider<
  TPromise extends KeycloakPromiseType = 'native'
> extends KeycloakProvider<TPromise> {
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
 * Props injected by withKeycloak HOC
 */
export interface ReactKeycloakInjectedProps<
  TPromise extends KeycloakPromiseType = 'native'
> {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak: KeycloakInstance<TPromise>

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
export function withKeycloak<TPromise extends KeycloakPromiseType = 'native'>(
  component: ComponentType<ReactKeycloakInjectedProps<TPromise>>
): ComponentType

/**
 * Props returned by useKeycloak hook
 */
export type ISSRKeycloakContextProps<
  TPromise extends KeycloakPromiseType = 'native'
> = IReactKeycloakContextProps<TPromise> & {
  /**
   * Boolean indicating whenever the component is been rendered server-side or client-side
   */
  isServer: boolean
}

export type ReactKeycloakHookResult<
  TPromise extends KeycloakPromiseType = 'native'
> = ISSRKeycloakContextProps<TPromise> &
  [KeycloakInstance<TPromise>, boolean, boolean]

/**
 * Return the Keycloak instance and initialization state.
 */
export function useKeycloak<
  TPromise extends KeycloakPromiseType = 'native'
>(): ReactKeycloakHookResult<TPromise>
