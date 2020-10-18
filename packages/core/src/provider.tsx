import * as React from 'react'
import isEqual from 'react-fast-compare'

import { IAuthContextProps } from './context'
import {
  AuthClient,
  AuthClientError,
  AuthClientEvent,
  AuthClientInitOptions,
  AuthClientTokens,
} from './types'

/**
 * Props that can be passed to AuthProvider
 */
export type AuthProviderProps<T extends AuthClient> = {
  /**
   * The single AuthClient instance to be used by your application.
   */
  authClient: T

  /**
   * A flag to enable automatic token refresh. Defaults to true.
   * This is useful if you need to disable it (not recommended).
   *
   * @default true
   */
  autoRefreshToken?: boolean

  /**
   * The config to be used when initializing AuthClient instance.
   */
  initOptions?: AuthClientInitOptions

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return `true` to display LoadingComponent, `false` to hide it.
   *
   * @param authClient the current AuthClient instance.
   *
   * @returns {boolean} Set to true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: (authClient: T) => boolean

  /**
   * An optional component to display while AuthClient instance is being initialized.
   */
  LoadingComponent?: JSX.Element

  /**
   * An optional function to receive AuthClient events as they happen.
   */
  onEvent?: (eventType: AuthClientEvent, error?: AuthClientError) => void

  /**
   * An optional function to receive AuthClient tokens when changed.
   *
   * @param {AuthClientTokens} tokens The current AuthClient tokens set.
   */
  onTokens?: (tokens: AuthClientTokens) => void
}

type AuthProviderState = {
  initialized: boolean

  isAuthenticated: boolean

  isLoading: boolean
}

/**
 * Create an AuthProvider component to wrap a React app with, it will take care of common AuthClient
 * lifecycle handling (such as initialization and token refresh).
 *
 * @param AuthContext the Auth context to be used by the created AuthProvider
 *
 * @returns the AuthProvider component
 */
export function createAuthProvider<T extends AuthClient>(
  AuthContext: React.Context<IAuthContextProps<T>>
) {
  const defaultInitOptions: AuthClientInitOptions = {
    onLoad: 'check-sso',
  }

  const initialState: AuthProviderState = {
    initialized: false,
    isAuthenticated: false,
    isLoading: true,
  }

  return class KeycloakProvider extends React.PureComponent<
    AuthProviderProps<T>,
    AuthProviderState
  > {
    state = {
      ...initialState,
    }

    componentDidMount() {
      this.init()
    }

    componentDidUpdate({
      authClient: prevAuthClient,
      initOptions: prevInitOptions,
    }: AuthProviderProps<T>) {
      const { initOptions, authClient } = this.props
      if (
        authClient !== prevAuthClient ||
        !isEqual(initOptions, prevInitOptions)
      ) {
        // De-init previous AuthClient instance
        prevAuthClient.onReady = undefined
        prevAuthClient.onAuthSuccess = undefined
        prevAuthClient.onAuthError = undefined
        prevAuthClient.onAuthRefreshSuccess = undefined
        prevAuthClient.onAuthRefreshError = undefined
        prevAuthClient.onAuthLogout = undefined
        prevAuthClient.onTokenExpired = undefined

        // Reset state
        this.setState({ ...initialState })
        // Init new AuthClient instance
        this.init()
      }
    }

    init() {
      const { initOptions, authClient } = this.props

      // Attach Keycloak listeners
      authClient.onReady = this.updateState('onReady')
      authClient.onAuthSuccess = this.updateState('onAuthSuccess')
      authClient.onAuthError = this.onError('onAuthError')
      authClient.onAuthRefreshSuccess = this.updateState('onAuthRefreshSuccess')
      authClient.onAuthRefreshError = this.onError('onAuthRefreshError')
      authClient.onAuthLogout = this.updateState('onAuthLogout')
      authClient.onTokenExpired = this.refreshToken('onTokenExpired')

      authClient
        .init({ ...defaultInitOptions, ...initOptions })
        .catch(this.onError('onInitError'))
    }

    onError = (event: AuthClientEvent) => (error?: AuthClientError) => {
      const { onEvent } = this.props
      // Notify Events listener
      onEvent && onEvent(event, error)
    }

    updateState = (event: AuthClientEvent) => () => {
      const { authClient, onEvent, onTokens, isLoadingCheck } = this.props
      const {
        initialized: prevInitialized,
        isAuthenticated: prevAuthenticated,
        isLoading: prevLoading,
      } = this.state

      // Notify Events listener
      onEvent && onEvent(event)

      // Check Loading state
      const isLoading = isLoadingCheck ? isLoadingCheck(authClient) : false

      // Check if user is authenticated
      const isAuthenticated = isUserAuthenticated(authClient)

      // Avoid double-refresh if state hasn't changed
      if (
        !prevInitialized ||
        isAuthenticated !== prevAuthenticated ||
        isLoading !== prevLoading
      ) {
        this.setState({
          initialized: true,
          isAuthenticated,
          isLoading,
        })
      }

      // Notify token listener, if any
      const { idToken, refreshToken, token } = authClient
      onTokens &&
        onTokens({
          idToken,
          refreshToken,
          token,
        })
    }

    refreshToken = (event: AuthClientEvent) => () => {
      const { autoRefreshToken, authClient, onEvent } = this.props
      // Notify Events listener
      onEvent && onEvent(event)

      if (autoRefreshToken !== false) {
        // Refresh Keycloak token
        authClient.updateToken(5)
      }
    }

    render() {
      const { children, authClient, LoadingComponent } = this.props
      const { initialized, isLoading } = this.state

      if (!!LoadingComponent && (!initialized || isLoading)) {
        return LoadingComponent
      }

      return (
        <AuthContext.Provider value={{ initialized, authClient }}>
          {children}
        </AuthContext.Provider>
      )
    }
  }
}

function isUserAuthenticated(authClient: AuthClient) {
  return !!authClient.idToken && !!authClient.token
}

export default createAuthProvider
