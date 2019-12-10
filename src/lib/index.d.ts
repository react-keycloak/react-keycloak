// Type definitions for react-keycloak 8.0.1-191210
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { Component, ComponentType } from 'react';
import { KeycloakInitOptions, KeycloakInstance } from 'keycloak-js';

export interface ReactKeycloakContextValue<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
> {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak: KeycloakInstance<TPromise>;

  /**
   * Boolean indicating whenever the Keycloak instance has been initialized by KeycloakProvider
   */
  initialized: boolean;
}

export interface KeycloakTokens {
  /**
   * Current idToken returned by Keycloak.
   */
  idToken: string;

  /**
   * Current refreshToken returned by Keycloak.
   */
  refreshToken: string;

  /**
   * Current JWT token returned by Keycloak.
   */
  token: string;
}

export type KeycloakLoadingCheck<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
> = (keycloak: KeycloakInstance<TPromise>) => boolean;

export type KeycloakEvent =
  | 'onReady'
  | 'onAuthSuccess'
  | 'onAuthError'
  | 'onAuthRefreshSuccess'
  | 'onAuthRefreshError'
  | 'onAuthLogout'
  | 'onTokenExpired';

export type KeycloakEventHandler = (
  eventType: KeycloakEvent,
  error?: Error,
) => void;

export type KeycloakTokensHandler = (tokens: KeycloakTokens) => void;

export interface ProviderProps<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
> {
  /**
   * The single Keycloak instance to be used by your application.
   */
  keycloak: KeycloakInstance<TPromise>;

  /**
   * The KeycloakJS config to be used when initializing Keycloak instance.
   */
  initConfig?: KeycloakInitOptions;

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: KeycloakLoadingCheck<TPromise>;

  /**
   * An optional component to display while Keycloak instance is being initialized.
   */
  LoadingComponent?: JSX.Element;

  /**
   * An optional function to receive Keycloak events as they happen.
   */
  onEvent?: KeycloakEventHandler;

  /**
   * An optional function to receive Keycloak tokens when changed.
   */
  onTokens?: KeycloakTokensHandler;
}

/**
 * Makes the Keycloak instance available to the withKeycloak() and useKeycloak() calls in the component hierarchy below.
 */
export class KeycloakProvider<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
> extends Component<ProviderProps<TPromise>> {}

/**
 * Props injected by withKeycloak HOC
 */
export interface ReactKeycloakInjectedProps<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
> {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak: KeycloakInstance<TPromise>;

  /**
   * Boolean indicating whenever the Keycloak instance has been initialized by KeycloakProvider
   */
  keycloakInitialized: boolean;
}

/**
 * Makes the Keycloak instance and initialization state available to the wrapped component.
 */
export function withKeycloak<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
>(
  component: ComponentType<ReactKeycloakInjectedProps<TPromise>>,
): ComponentType;

/**
 *
 */
export type ReactKeycloakHookResult<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
> = ReactKeycloakContextValue<TPromise> & [KeycloakInstance<TPromise>, boolean];

/**
 * Return the Keycloak instance and initialization state.
 */
export function useKeycloak<
  TPromise extends Keycloak.KeycloakPromiseType = 'native'
>(): ReactKeycloakHookResult<TPromise>;
