// Type definitions for @react-keycloak/nextjs
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { ComponentType } from 'react'
import {
  IReactKeycloakContextProps,
  KeycloakEventHandler,
  KeycloakTokens,
} from '@react-keycloak/core'
import {
  KeycloakConfig,
  KeycloakInitOptions,
  KeycloakInstance,
} from 'keycloak-js'
import { AppContext, AppType } from 'next'

export type NextJSKeycloakLoadingCheck = (
  keycloak: KeycloakInstance,
  isAuthenticated: boolean
) => boolean

export type KeycloakTokensHandler = (tokens: KeycloakTokens) => void

export interface ReactKeycloakProviderProps {
  /**
   * The KeycloakJS config to be used when initializing Keycloak instance.
   */
  initConfig?: KeycloakInitOptions

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: NextJSKeycloakLoadingCheck

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

export class AppTypeWithKeycloak<P = {}, CP = {}, S = {}> extends AppType<
  P & ReactKeycloakInjectedProps,
  CP,
  S
> {
  static getKeycloakInitConfig?: typeof appgetKeycloakInitConfig
}

/**
 * NextJS App Wrapper
 */
export function appWithKeycloak<P = {}, CP = {}, S = {}>(
  options: KeycloakConfig,
  providerProps?: ReactKeycloakProviderProps
): (app: AppTypeWithKeycloak<P, CP, S>) => AppType

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
   * Boolean indicating whenever the user is authenticated by Keycloak instance or by Server cookie
   */
  isAuthenticated: boolean
}

/**
 * Makes the Keycloak instance and initialization state available to the wrapped component.
 */
export function withKeycloak(
  component: ComponentType<ReactKeycloakInjectedProps>
): ComponentType

export type INextJSKeycloakContextProps = IReactKeycloakContextProps & {
  /**
   * Boolean indicating whenever the user is authenticated by Keycloak instance or by Server cookie
   */
  isAuthenticated: boolean
}

export type ReactKeycloakHookResult = INextJSKeycloakContextProps &
  [KeycloakInstance, boolean, boolean]

/**
 * Return the Keycloak instance and initialization state.
 */
export function useKeycloak(): ReactKeycloakHookResult
