// Type definitions for react-keycloak 8.0.1-191210
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { Component, ComponentType } from 'react'
import { IReactKeycloakContextProps } from '@react-keycloak/core'
import { AppType } from 'next'
import {
  KeycloakConfig,
  KeycloakError,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakPromiseType
} from 'keycloak-js'

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
   * Boolean indicating whenever the user is authenticated by Keycloak instance or by Server cookie
   */
  isAuthenticated: boolean
}

/**
 * Makes the Keycloak instance and initialization state available to the wrapped component.
 */
export function withKeycloak<TPromise extends KeycloakPromiseType = 'native'>(
  component: ComponentType<ReactKeycloakInjectedProps<TPromise>>
): ComponentType

export type INextJSKeycloakContextProps<
  TPromise extends KeycloakPromiseType = 'native'
> = IReactKeycloakContextProps & {
  /**
   * Boolean indicating whenever the user is authenticated by Keycloak instance or by Server cookie
   */
  isAuthenticated: boolean
}

export type ReactKeycloakHookResult<
  TPromise extends KeycloakPromiseType = 'native'
> = INextJSKeycloakContextProps<TPromise> &
  [KeycloakInstance<TPromise>, boolean, boolean]

/**
 * Return the Keycloak instance and initialization state.
 */
export function useKeycloak<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
>(): ReactKeycloakHookResult<TPromise>

export function appWithKeycloak<
  TPromise extends KeycloakPromiseType = 'native'
>(
  options: KeycloakConfig
): (app: AppType<ReactKeycloakInjectedProps<TPromise>>) => AppType
