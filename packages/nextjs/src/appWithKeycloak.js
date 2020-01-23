import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'

import { getKeycloakInstance } from './internals/keycloak'
import KeycloakProvider from './internals/keycloakProvider'
import ServerProvider from './internals/serverProvider'
import { checkIfUserAuthenticated, setCookie } from './internals/utils'

const appWithKeycloak = keycloakInitOptions => WrappedComponent => {
  const keycloak = getKeycloakInstance(keycloakInitOptions)

  async function getComponentInitialProps({ Component, ctx }) {
    return Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
  }

  class AppWithKeycloak extends React.Component {
    static async getInitialProps(appContext) {
      const { isAuthenticated } = checkIfUserAuthenticated(appContext)
      const cmpInitialProps = await getComponentInitialProps(appContext)

      return {
        pageProps: {
          ...cmpInitialProps,
          isAuthenticated
        }
      }
    }

    constructor(props) {
      super(props)

      this.state = {
        isAuthenticated: props?.pageProps?.isAuthenticated ?? 'false'
      }
    }

    onEvent = (event, error) => {
      if (error) {
        return console.error(error)
      }

      if (event === 'onAuthSuccess') {
        this.setState({
          isAuthenticated: 'true'
        })

        setCookie('isAuthenticated', 'true')
      }

      if (event === 'onAuthLogout') {
        this.setState({
          isAuthenticated: 'false'
        })

        setCookie('isAuthenticated', 'false')
      }

      if (event === 'onReady') {
        const isAuthenticated = keycloak.authenticated ? 'true' : 'false'

        this.setState({
          isAuthenticated
        })

        setCookie('isAuthenticated', isAuthenticated)
      }
    }

    render() {
      const { pageProps, ...props } = this.props
      const { isAuthenticated } = this.state

      const { isAuthenticated: isAuthProp, ...childPageProps } = pageProps

      return (
        <ServerProvider isAuthenticated={isAuthenticated || isAuthProp}>
          <KeycloakProvider keycloak={keycloak} onEvent={this.onEvent}>
            <WrappedComponent {...props} pageProps={childPageProps} />
          </KeycloakProvider>
        </ServerProvider>
      )
    }
  }

  AppWithKeycloak.propTypes = {
    pageProps: PropTypes.shape({
      isAuthenticated: PropTypes.string.isRequired
    }).isRequired
  }

  return hoistStatics(AppWithKeycloak, WrappedComponent, {
    getInitialProps: true
  })
}

export default appWithKeycloak
