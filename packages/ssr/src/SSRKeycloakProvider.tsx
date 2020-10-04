import type {
  AuthClient,
  AuthClientInitOptions,
  AuthProviderProps,
  AuthClientEvent,
  AuthClientError,
  AuthClientTokens,
} from '@react-keycloak/core'
import type { KeycloakConfig, KeycloakInstance } from 'keycloak-js'
import * as React from 'react'

import type { TokenPersistor } from './persistors/types'

import { getKeycloakInstance } from './internals/keycloak'
import { KeycloakProvider } from './internals/KeycloakProvider'

import type { SSRAuthClient } from './types'

export interface SSRKeycloakProviderProps<T extends SSRAuthClient>
  extends Omit<AuthProviderProps<T>, 'authClient'> {
  persistor: TokenPersistor

  keycloakConfig: KeycloakConfig
}

interface SSRKeycloakProviderState {
  initOptions: AuthClientInitOptions

  keycloak: AuthClient
}

export class SSRKeycloakProvider extends React.PureComponent<
  SSRKeycloakProviderProps<SSRAuthClient>,
  SSRKeycloakProviderState
> {
  constructor(props: SSRKeycloakProviderProps<SSRAuthClient>) {
    super(props)

    const { initOptions, keycloakConfig, persistor } = props
    const cachedTokens = persistor.getTokens()

    this.state = {
      keycloak: getKeycloakInstance(keycloakConfig, persistor),
      initOptions: {
        ...cachedTokens,
        ...initOptions,
      },
    }
  }

  onEvent = (event: AuthClientEvent, error?: AuthClientError) => {
    if (event === 'onReady') {
      if (!(this.state.keycloak as KeycloakInstance).authenticated) {
        this.props?.persistor?.resetTokens()
      }
    }

    // Propagate events up
    this.props?.onEvent?.(event, error)
  }

  onTokens = (tokens: AuthClientTokens) => {
    // Persist updated tokens
    this.props?.persistor?.setTokens(tokens)

    // Propagate events up
    this.props?.onTokens?.(tokens)
  }

  render() {
    const { children, persistor, ...providerProps } = this.props
    const { initOptions, keycloak } = this.state

    return (
      <KeycloakProvider
        {...providerProps}
        authClient={keycloak}
        initOptions={initOptions}
        onEvent={this.onEvent}
        onTokens={this.onTokens}
      >
        {children}
      </KeycloakProvider>
    )
  }
}
