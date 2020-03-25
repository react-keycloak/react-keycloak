import * as React from 'react'
import PropTypes from 'prop-types'

import { getKeycloakStub, getKeycloakInstance } from './internals/keycloak'
import { KeycloakProvider } from './internals/KeycloakProvider'
import { KeycloakStubProvider } from './internals/KeycloakStubProvider'

class SSRKeycloakProvider extends React.PureComponent {
  constructor(props) {
    super(props)

    const { initConfig, keycloakConfig, persistor } = props
    const cachedTokens = persistor.getTokens()

    this.state = {
      keycloakStub: getKeycloakStub(persistor),
      keycloak: getKeycloakInstance(keycloakConfig),
      initConfig: {
        ...cachedTokens,
        ...initConfig,
      },
    }
  }

  onEvent = (event, error) => {
    if (event === 'onReady') {
      if (!this.state.keycloak.authenticated) {
        this.props?.persistor?.resetTokens()
      }
    }

    // Propagate events up
    this.props?.onEvent?.(event, error)
  }

  onTokens = (tokens) => {
    // Persist updated tokens
    this.props?.persistor?.setTokens(tokens)

    // Propagate events up
    this.props?.onTokens?.(tokens)
  }

  render() {
    const { children, persistor, ...providerProps } = this.props // eslint-disable-line no-unused-vars
    const { initConfig, keycloak, keycloakStub } = this.state

    return (
      <KeycloakStubProvider keycloakStub={keycloakStub}>
        <KeycloakProvider
          keycloak={keycloak}
          {...providerProps}
          initConfig={initConfig}
          onEvent={this.onEvent}
          onTokens={this.onTokens}
        >
          {children}
        </KeycloakProvider>
      </KeycloakStubProvider>
    )
  }
}

SSRKeycloakProvider.propTypes = {
  children: PropTypes.element.isRequired,
  initConfig: PropTypes.shape({}),
  keycloakConfig: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({
    setTokens: PropTypes.func.isRequired,
    getTokens: PropTypes.func.isRequired,
    resetTokens: PropTypes.func.isRequired,
  }).isRequired,
}

export default SSRKeycloakProvider
