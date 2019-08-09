// Type definitions for react-keycloak 6.0
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import { Component, ComponentType } from 'react';
import { KeycloakInitOptions, KeycloakInstance } from 'keycloak-js';

export interface ReactKeycloakContextValue {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak: KeycloakInstance;

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

export type KeycloakEvent = "onReady" | "onAuthSuccess" | "onAuthError" | "onAuthRefreshSuccess" | "onAuthRefreshError" | "onAuthLogout" | "onTokenExpired";

export interface ProviderProps {
  /**
   * The single Keycloak instance to be used by your application.
   */
  keycloak: KeycloakInstance;

  /**
   * The KeycloakJS config to be used when initializing Keycloak instance.
   */
  initConfig?: KeycloakInitOptions;

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: (keycloak: KeycloakInstance) => boolean;

  /**
   * An optional component to display while Keycloak instance is being initialized.
   */
  LoadingComponent?: JSX.Element;

  /**
   * An optional function to receive Keycloak errors as they happen.
   * @deprecated migrate to onEvent
   */
  onError?: (error: Error) => void;

  /**
   * An optional function to receive Keycloak events as they happen.
   */
  onEvent?: (eventType: KeycloakEvent, error?: Error) => void;

  /**
   * An optional function to receive Keycloak token when it changes.
   * @deprecated migrate to onTokens
   */
  onToken?: (token: string) => void;

  /**
   * An optional function to receive Keycloak tokens when changed.
   */
  onTokens?: (tokens: KeycloakTokens) => void;
}

/**
 * Makes the Keycloak instance available to the withKeycloak() and useKeycloak() calls in the component hierarchy below.
 */
export class KeycloakProvider extends Component<ProviderProps> {
}

/**
 * Props injected by withKeycloak HOC
 */
export interface ReactKeycloakInjectedProps {
  /**
   * The single Keycloak instance of your application.
   */
  keycloak: KeycloakInstance;

  /**
   * Boolean indicating whenever the Keycloak instance has been initialized by KeycloakProvider
   */
  keycloakInitialized: boolean;
}

/**
 * Makes the Keycloak instance and initialization state available to the wrapped component.
 */
export function withKeycloak(
  component: ComponentType<ReactKeycloakInjectedProps>,
): ComponentType;

/**
 *
 */
export type ReactKeycloakHookResult = ReactKeycloakContextValue & [KeycloakInstance, boolean];

/**
 * Return the Keycloak instance and initialization state.
 */
export function useKeycloak(): ReactKeycloakHookResult;
