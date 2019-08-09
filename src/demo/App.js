import Keycloak from 'keycloak-js';
import React from 'react';

import { KeycloakProvider } from '../lib';

import { AppRouter } from './routes';

const keycloak = new Keycloak();

const keycloakProviderInitConfig = {
  onLoad: 'check-sso',
};

class PersistedApp extends React.PureComponent {
  onKeycloakEvent = (event, error) => {
    console.log('onKeycloakEvent', event, error);
  };

  onKeycloakTokens = tokens => {
    console.log('onKeycloakTokens', tokens);
  };

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
    );
  }
}

export default PersistedApp;
