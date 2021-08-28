export interface AuthClientError {
  error: string

  error_description: string
}

export interface AuthClientInitOptions {
  [paramName: string]: any
}

/**
 * A client for the Auth server.
 */
export interface AuthClient {
  /**
   * The base64 encoded token that can be sent in the Authorization header in
   * requests to services.
   */
  token?: string

  /**
   * The base64 encoded refresh token that can be used to retrieve a new token.
   */
  refreshToken?: string

  /**
   * The base64 encoded ID token.
   */
  idToken?: string

  /**
   * Called when the adapter is initialized.
   */
  onReady?(authenticated?: boolean): void

  /**
   * Called when a user is successfully authenticated.
   */
  onAuthSuccess?(): void

  /**
   * Called if there was an error during authentication.
   */
  onAuthError?(errorData: AuthClientError): void

  /**
   * Called when the token is refreshed.
   */
  onAuthRefreshSuccess?(): void

  /**
   * Called if there was an error while trying to refresh the token.
   */
  onAuthRefreshError?(): void

  /**
   * Called if the user is logged out (will only be called if the session
   * status iframe is enabled, or in Cordova mode).
   */
  onAuthLogout?(): void

  /**
   * Called when the access token is expired. If a refresh token is available
   * the token can be refreshed with Auth#updateToken, or in cases where
   * it's not (ie. with implicit flow) you can redirect to login screen to
   * obtain a new access token.
   */
  onTokenExpired?(): void

  /**
   * Called to initialize the adapter.
   * @param initOptions Initialization options.
   * @returns A promise to set functions to be invoked on success or error.
   */
  init(initOptions: AuthClientInitOptions): Promise<boolean>

  /**
   * If the token expires within `minValidity` seconds, the token is refreshed.
   * If the session status iframe is enabled, the session status is also
   * checked.
   *
   * @returns A promise to set functions that can be invoked if the token is
   *          still valid, or if the token is no longer valid.
   */
  updateToken(minValidity: number): Promise<boolean>
}

/**
 * Set of tokens provided by AuthClient
 */
export type AuthClientTokens = Pick<
  AuthClient,
  'idToken' | 'refreshToken' | 'token'
>

/**
 * ReactAuth event types
 */
export type AuthClientEvent =
  | 'onReady'
  | 'onInitError'
  | 'onAuthSuccess'
  | 'onAuthError'
  | 'onAuthRefreshSuccess'
  | 'onAuthRefreshError'
  | 'onAuthLogout'
  | 'onTokenExpired'
