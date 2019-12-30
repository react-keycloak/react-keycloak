import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'

import { getKeycloakInstance } from './internals/keycloak'
import KeycloakProvider from './internals/keycloakProvider'
import ServerProvider from './internals/serverProvider'
import { checkIfUserAuthenticated, setCookie } from './internals/utils'

const appWithKeycloak = keycloakInitOptions => WrappedComponent => {
  const keycloak = getKeycloakInstance(keycloakInitOptions)

  async function getPageProps({ Component, ctx }) {
    return Component.getInitialProps ? Component.getInitialProps(ctx) : {}
  }

  class AppWithKeycloak extends React.Component {
    static async getInitialProps(appContext) {
      const { isServer, isAuthenticated } = checkIfUserAuthenticated(appContext)

      return {
        pageProps: {
          ...getPageProps(appContext),
          isAuthenticated,
          isServer
        }
      }
    }

    state = {
      isAuthenticated: 'false'
    }

    onEvent = (event, error) => {
      if (error) {
        return console.error(error)
      }

      if (event === 'onAuthSuccess') {
        setCookie('isAuthenticated', 'true')
        this.setState({
          isAuthenticated: 'true'
        })
      }

      if (event === 'onAuthLogout') {
        setCookie('isAuthenticated', 'false')
        this.setState({
          isAuthenticated: 'false'
        })
      }

      if (event === 'onReady') {
        // make sure our cookie state never falls out of sync with our actual
        // keycloak state by checking on every page refresh
        if (keycloak.authenticated) {
          this.setState({
            isAuthenticated: 'true'
          })
          return setCookie('isAuthenticated', 'true')
        }

        setCookie('isAuthenticated', 'false')
        this.setState({
          isAuthenticated: 'false'
        })
      }
    }

    render() {
      const { pageProps, ...props } = this.props
      const { isAuthenticated } = this.state

      const {
        isAuthenticated: isAuthenticatedProp,
        isServer,
        ...childPageProps
      } = pageProps

      return (
        <ServerProvider
          isAuthenticated={isAuthenticated || isAuthenticatedProp}
          isServer={isServer}
        >
          <KeycloakProvider keycloak={keycloak} onEvent={this.onEvent}>
            <WrappedComponent {...props} pageProps={childPageProps} />
          </KeycloakProvider>
        </ServerProvider>
      )
    }
  }

  AppWithKeycloak.propTypes = {
    pageProps: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
      isServer: PropTypes.bool.isRequired
    }).isRequired
  }

  return hoistStatics(AppWithKeycloak, WrappedComponent, {
    getInitialProps: true
  })
}

export default appWithKeycloak
