// Type definitions for react-keycloak 8.0.1-191210
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { Component, ComponentType } from 'react'
import {
  IReactKeycloakContextProps,
  KeycloakEventHandler,
  KeycloakTokens
} from '@react-keycloak/core'
import { AppContext, AppType } from 'next'
import {
  KeycloakConfig,
  KeycloakError,
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakPromiseType
} from 'keycloak-js'

export type NextJSKeycloakLoadingCheck<
  TPromise extends KeycloakPromiseType = 'native'
> = (keycloak: KeycloakInstance<TPromise>, isAuthenticated: boolean) => boolean

export type KeycloakTokensHandler = (tokens: KeycloakTokens) => void

export interface ReactKeycloakProviderProps<
  TPromise extends KeycloakPromiseType = 'native'
> {
  /**
   * The KeycloakJS config to be used when initializing Keycloak instance.
   */
  initConfig?: KeycloakInitOptions

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: NextJSKeycloakLoadingCheck<TPromise>

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

declare function appgetKeycloakInitConfig(
  appContext: AppContext
): Promise<AppInitialProps>

export class AppTypeWithKeycloak<
  P = {},
  CP = {},
  S = {},
  TPromise
> extends AppType<P & ReactKeycloakInjectedProps<TPromise>, CP, S> {
  static getKeycloakInitConfig?: typeof appgetKeycloakInitConfig
}

/**
 * NextJS App Wrapper
 */
export function appWithKeycloak<
  P = {},
  CP = {},
  S = {},
  TPromise extends KeycloakPromiseType = 'native'
>(
  options: KeycloakConfig,
  providerProps?: ReactKeycloakProviderProps<TPromise>
): (app: AppTypeWithKeycloak<P, CP, S, TPromise>) => AppType

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
