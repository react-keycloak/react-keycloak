import * as React from 'react'
import isEqual from 'react-fast-compare'

import { IReactKeycloakContextProps } from './context'
import {
  KeycloakClient,
  KeycloakError,
  KeycloakEvent,
  KeycloakInitOptions,
  KeycloakTokens,
} from './types'

/**
 * Props that can be passed to KeycloakProvider
 */
export type KeycloakProviderProps = {
  /**
   * The single Keycloak instance to be used by your application.
   */
  keycloak: KeycloakClient

  /**
   * A flag to enable automatic token refresh. Defaults to true.
   * This is useful if you need to disable it (not recommended).
   *
   * @default true
   */
  autoRefreshToken?: boolean

  /**
   * The KeycloakJS config to be used when initializing Keycloak instance.
   */
  initOptions?: KeycloakInitOptions

  /**
   * An optional loading check function to customize LoadingComponent display condition.
   * Return `true` to display LoadingComponent, `false` to hide it.
   *
   * @param {KeycloakClient} keycloak the current KeycloakClient instance.
   *
   * @returns {boolean} Set to true to display LoadingComponent, false to hide it.
   */
  isLoadingCheck?: (keycloak: KeycloakClient) => boolean

  /**
   * An optional component to display while Keycloak instance is being initialized.
   */
  LoadingComponent?: JSX.Element

  /**
   * An optional function to receive Keycloak events as they happen.
   */
  onEvent?: (eventType: KeycloakEvent, error?: KeycloakError) => void

  /**
   * An optional function to receive Keycloak tokens when changed.
   *
   * @param {KeycloakTokens} tokens The current Keycloak tokens set.
   */
  onTokens?: (tokens: KeycloakTokens) => void
}

type KeycloakProviderState = {
  initialized: boolean
  isLoading: boolean
  token?: string
}

/**
 * Create a ReactKeycloakProvider component to wrap a React app with, it will take care of common Keycloak
 * lifecycle handling (such as initialization and token refresh).
 *
 * @param ReactKeycloakContext the ReactKeycloak context to be used by the created ReactKeycloakProvider
 *
 * @returns {ReactKeycloakProvider} the ReactKeycloakProvider component
 */
export function createReactKeycloakProvider(
  ReactKeycloakContext: React.Context<IReactKeycloakContextProps>
) {
  const defaultInitOptions: KeycloakInitOptions = {
    onLoad: 'check-sso',
  }

  const initialState: KeycloakProviderState = {
    initialized: false,
    isLoading: true,
    token: undefined,
  }

  return class KeycloakProvider extends React.PureComponent<
    KeycloakProviderProps,
    KeycloakProviderState
  > {
    state = {
      ...initialState,
    }

    componentDidMount() {
      this.init()
    }

    componentDidUpdate({
      keycloak: prevKeycloak,
      initOptions: prevInitOptions,
    }: KeycloakProviderProps) {
      const { initOptions, keycloak } = this.props
      if (keycloak !== prevKeycloak || !isEqual(initOptions, prevInitOptions)) {
        // De-init previous Keycloak instance
        prevKeycloak.onReady = undefined
        prevKeycloak.onAuthSuccess = undefined
        prevKeycloak.onAuthError = undefined
        prevKeycloak.onAuthRefreshSuccess = undefined
        prevKeycloak.onAuthRefreshError = undefined
        prevKeycloak.onAuthLogout = undefined
        prevKeycloak.onTokenExpired = undefined

        // Reset state
        this.setState({ ...initialState })
        // Init new Keycloak instance
        this.init()
      }
    }

    init() {
      const { initOptions, keycloak } = this.props

      // Attach Keycloak listeners
      keycloak.onReady = this.updateState('onReady')
      keycloak.onAuthSuccess = this.updateState('onAuthSuccess')
      keycloak.onAuthError = this.onKeycloakError('onAuthError')
      keycloak.onAuthRefreshSuccess = this.updateState('onAuthRefreshSuccess')
      keycloak.onAuthRefreshError = this.onKeycloakError('onAuthRefreshError')
      keycloak.onAuthLogout = this.updateState('onAuthLogout')
      keycloak.onTokenExpired = this.refreshKeycloakToken('onTokenExpired')

      keycloak
        .init({ ...defaultInitOptions, ...initOptions })
        .catch(this.onKeycloakError('onInitError'))
    }

    onKeycloakError = (event: KeycloakEvent) => (error?: KeycloakError) => {
      const { onEvent } = this.props
      // Notify Events listener
      onEvent && onEvent(event, error)
    }

    updateState = (event: KeycloakEvent) => () => {
      const { keycloak, onEvent, onTokens, isLoadingCheck } = this.props
      const {
        initialized: prevInitialized,
        isLoading: prevLoading,
        token: prevToken,
      } = this.state
      const { idToken, refreshToken, token: newToken } = keycloak

      // Notify Events listener
      onEvent && onEvent(event)

      // Check Loading state
      const isLoading = isLoadingCheck ? isLoadingCheck(keycloak) : false

      // Avoid double-refresh if state hasn't changed
      if (
        !prevInitialized ||
        isLoading !== prevLoading ||
        newToken !== prevToken
      ) {
        this.setState({
          initialized: true,
          isLoading,
          token: newToken,
        })
      }

      // Notify token listener, if any
      if (newToken !== prevToken) {
        onTokens &&
          onTokens({
            idToken,
            refreshToken,
            token: newToken,
          })
      }
    }

    refreshKeycloakToken = (event: KeycloakEvent) => () => {
      const { autoRefreshToken, keycloak, onEvent } = this.props
      // Notify Events listener
      onEvent && onEvent(event)

      if (autoRefreshToken !== false) {
        // Refresh Keycloak token
        keycloak.updateToken(5)
      }
    }

    render() {
      const { children, keycloak, LoadingComponent } = this.props
      const { initialized, isLoading } = this.state

      if (!!LoadingComponent && (!initialized || isLoading)) {
        return LoadingComponent
      }

      return (
        <ReactKeycloakContext.Provider value={{ initialized, keycloak }}>
          {children}
        </ReactKeycloakContext.Provider>
      )
    }
  }
}

export default createReactKeycloakProvider
