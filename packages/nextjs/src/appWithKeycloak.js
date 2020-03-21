import * as React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'

import { getKeycloakInstance } from './internals/keycloak'
import KeycloakProvider from './internals/keycloakProvider'
import ServerProvider from './internals/serverProvider'
import { checkIfUserAuthenticated, setCookie } from './internals/utils'

const appWithKeycloak = (
  keycloakInitOptions,
  providerProps = {}
) => NextApp => {
  const keycloak = getKeycloakInstance(keycloakInitOptions)

  async function getComponentInitialProps({ Component, ctx }) {
    return Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
  }

  async function getKeycloakInitialProps(appContext) {
    return NextApp.getKeycloakInitConfig
      ? await NextApp.getKeycloakInitConfig(appContext)
      : {}
  }

  class AppWithKeycloak extends React.Component {
    static async getInitialProps(appContext) {
      const { isAuthenticated } = checkIfUserAuthenticated(appContext)
      const [cmpInitialProps, keycloakInitConfig] = await Promise.all([
        getComponentInitialProps(appContext),
        getKeycloakInitialProps(appContext)
      ])

      return {
        pageProps: {
          ...cmpInitialProps,
          isAuthenticated
        },
        keycloakInitConfig
      }
    }

    constructor(props) {
      super(props)

      this.state = {
        isAuthenticated: props?.pageProps?.isAuthenticated ?? 'false',
        keycloakInitConfig: {
          ...(providerProps?.initConfig ?? {}),
          ...(props?.keycloakInitConfig ?? {})
        }
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

      // Propagate events up
      providerProps?.onEvent?.(event, error)
    }

    isLoadingCheck = keycloak => {
      const { pageProps } = this.props
      const { isAuthenticated } = this.state

      const { isAuthenticated: isAuthProp } = pageProps

      if (providerProps?.isLoadingCheck) {
        return providerProps.isLoadingCheck(
          keycloak,
          isAuthenticated || isAuthProp
        )
      }

      return false
    }

    render() {
      // eslint-disable-next-line no-unused-vars
      const { keycloakInitConfig: kcInitCfg, pageProps, ...props } = this.props
      const { isAuthenticated, keycloakInitConfig } = this.state

      const { isAuthenticated: isAuthProp, ...childPageProps } = pageProps

      return (
        <ServerProvider isAuthenticated={isAuthenticated || isAuthProp}>
          <KeycloakProvider
            keycloak={keycloak}
            initConfig={keycloakInitConfig}
            isLoadingCheck={this.isLoadingCheck}
            LoadingComponent={providerProps?.LoadingComponent}
            onEvent={this.onEvent}
            onTokens={providerProps?.onTokens}
          >
            <NextApp {...props} pageProps={childPageProps} />
          </KeycloakProvider>
        </ServerProvider>
      )
    }
  }

  AppWithKeycloak.propTypes = {
    pageProps: PropTypes.shape({
      isAuthenticated: PropTypes.string.isRequired
    }).isRequired,
    keycloakInitConfig: PropTypes.shape({}).isRequired
  }

  return hoistStatics(AppWithKeycloak, NextApp, {
    getInitialProps: true
  })
}

export default appWithKeycloak
