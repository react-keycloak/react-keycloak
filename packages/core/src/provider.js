import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'react-fast-compare'

const initialState = {
  initialized: false,
  isLoading: true,
  token: undefined
}

export function createReactKeycloakProvider(ReactKeycloakContext) {
  return class KeycloakProvider extends React.PureComponent {
    static propTypes = {
      children: PropTypes.element.isRequired,
      keycloak: PropTypes.shape({
        init: PropTypes.func.isRequired,
        updateToken: PropTypes.func.isRequired,
        idToken: PropTypes.string,
        refreshToken: PropTypes.string,
        token: PropTypes.string,
        onReady: PropTypes.func,
        onAuthSuccess: PropTypes.func,
        onAuthError: PropTypes.func,
        onAuthRefreshSuccess: PropTypes.func,
        onAuthRefreshError: PropTypes.func,
        onAuthLogout: PropTypes.func,
        onTokenExpired: PropTypes.func
      }).isRequired,
      initConfig: PropTypes.shape({}),
      isLoadingCheck: PropTypes.func,
      LoadingComponent: PropTypes.element,
      onError: PropTypes.func,
      onEvent: PropTypes.func,
      onTokens: PropTypes.func
    }

    static defaultProps = {
      initConfig: {
        onLoad: 'check-sso',
        promiseType: 'native'
      },
      isLoadingCheck: null,
      LoadingComponent: null,
      onError: null,
      onEvent: null,
      onTokens: null
    }

    defaultInitConfig = {
      onLoad: 'check-sso',
      promiseType: 'native'
    }

    state = {
      ...initialState
    }

    componentDidMount() {
      this.init()
    }

    componentDidUpdate({ keycloak: prevKeycloak, initConfig: prevInitConfig }) {
      if (
        this.props.keycloak !== prevKeycloak ||
        !isEqual(this.props.initConfig, prevInitConfig)
      ) {
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
      const { initConfig, keycloak } = this.props

      // Attach Keycloak listeners
      keycloak.onReady = this.updateState('onReady')
      keycloak.onAuthSuccess = this.updateState('onAuthSuccess')
      keycloak.onAuthError = this.onKeycloakError('onAuthError')
      keycloak.onAuthRefreshSuccess = this.updateState('onAuthRefreshSuccess')
      keycloak.onAuthRefreshError = this.onKeycloakError('onAuthRefreshError')
      keycloak.onAuthLogout = this.updateState('onAuthLogout')
      keycloak.onTokenExpired = this.refreshKeycloakToken('onTokenExpired')

      keycloak.init({ ...this.defaultInitConfig, ...initConfig })
    }

    onKeycloakError = event => error => {
      const { onEvent } = this.props
      // Notify Events listener
      onEvent && onEvent(event, error)
    }

    updateState = event => () => {
      const { keycloak, onEvent, onTokens, isLoadingCheck } = this.props
      const {
        initialized: prevInitialized,
        isLoading: prevLoading,
        token: prevToken
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
          token: newToken
        })
      }

      // Notify token listener, if any
      if (newToken !== prevToken) {
        onTokens &&
          onTokens({
            idToken,
            refreshToken,
            token: newToken
          })
      }
    }

    refreshKeycloakToken = event => () => {
      const { keycloak, onEvent } = this.props
      // Notify Events listener
      onEvent && onEvent(event)

      // Refresh Keycloak token
      keycloak.updateToken(5)
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
