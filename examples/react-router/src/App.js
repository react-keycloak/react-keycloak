import React from 'react'
import Keycloak from 'keycloak-js'
import { KeycloakProvider } from '@react-keycloak/web'

import { AppRouter } from './routes'

const keycloak = new Keycloak({
  realm: process.env.REACT_APP_KEYCLOAK_REALM,
  url: process.env.REACT_APP_KEYCLOAK_URL,
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
})

const keycloakProviderInitConfig = {
  onLoad: 'check-sso',
}

class App extends React.PureComponent {
  onKeycloakEvent = (event, error) => {
    console.log('onKeycloakEvent', event, error)
  }

  onKeycloakTokens = (tokens) => {
    console.log('onKeycloakTokens', tokens)
  }

  render() {
    return (
      <KeycloakProvider
        keycloak={keycloak}
        initConfig={keycloakProviderInitConfig}
        onEvent={this.onKeycloakEvent}
        onTokens={this.onKeycloakTokens}
      >
        <AppRouter />
      </KeycloakProvider>
    )
  }
}

export default App
