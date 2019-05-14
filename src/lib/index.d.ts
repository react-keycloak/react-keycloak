// Type definitions for react-keycloak 6.0
// Project: https://github.com/panz3r/react-keycloak
// Definitions by: Mattia Panzeri <https://github.com/panz3r>
// TypeScript Version: 3.4
import {Component, ComponentType} from 'react';
import {KeycloakInitOptions, KeycloakInstance} from 'keycloak-js';

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
   * An optional component to display while Keycloak instance is being initialized.
   */
  LoadingComponent?: JSX.Element,

  /**
   * A optional function to receive Keycloak error as they happens.
   */
  onError?: (error: Error) => void;

  /**
   * A optional function to receive Keycloak token when it changes.
   */
  onToken?: (token: string) => void;
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

interface TOriginalProps {
  [key: string]: any;
}

/**
 * Makes the Keycloak instance and initialization state available to the wrapped component.
 */
export function withKeycloak(
  component: ComponentType<TOriginalProps & ReactKeycloakInjectedProps>,
): ComponentType<TOriginalProps>;

/**
 *
 */
export type ReactKeycloakHookResult = ReactKeycloakContextValue & [KeycloakInstance, boolean];

/**
 * Return the Keycloak instance and initialization state.
 */
export function useKeycloak(): ReactKeycloakHookResult;
