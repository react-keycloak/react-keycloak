import Keycloak from 'keycloak-js';
import React from 'react';

import { KeycloakProvider } from '../lib';

import { AppRouter } from './routes';

const keycloak = new Keycloak();

class PersistedApp extends React.PureComponent {
  constructor(props) {
    super(props);

    this.tokens = JSON.parse(localStorage.getItem('kcTokens') || '{}');
  }

  onKeycloakEvent = (event, error) => {
    console.log('onKeycloakEvent', event, error);
    if (event === 'onAuthLogout') {
      localStorage.removeItem('kcTokens');
    }
  }

  onKeycloakTokens = tokens => {
    console.log({ tokens });
    localStorage.setItem('kcTokens', JSON.stringify(tokens));
  }

  render() {
    return (
      <KeycloakProvider
        keycloak={keycloak}
        initConfig={{
          onLoad: 'check-sso',
          ...this.tokens,
        }}
        onEvent={this.onKeycloakEvent}
        onTokens={this.onKeycloakTokens}
      >
        <AppRouter />
      </KeycloakProvider>
    );
  }
}

export default PersistedApp;
