import React from 'react';
import Keycloak from 'keycloak-js';

import { KeycloakProvider } from '../lib';

import KeycloakRealmForm from './components/KeycloakRealmForm';
import { AppRouter } from './routes';

const keycloakProviderInitConfig = {
  onLoad: 'login-required',
};

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    const keycloakSettings = localStorage.getItem('kcSettings');

    this.state = {
      keycloak: !!keycloakSettings
        ? new Keycloak({ ...JSON.parse(keycloakSettings) })
        : null,
    };
  }

  setupKeycloakWithConfig = keycloakConfig => {
    // ... Validate Keycloak realm...

    // Store Keycloak realm name
    localStorage.setItem('kcSettings', JSON.stringify(keycloakConfig));

    // Setup a Keycloak instance
    this.setState({
      keycloak: new Keycloak({ ...keycloakConfig }),
    });
  };

  onKeycloakEvent = (event, error) => {
    console.log('onKeycloakEvent', event, error);
    // On Logout
    if (event === 'onAuthLogout') {
      // Cleanup stored Keycloak realm name
      localStorage.removeItem('kcSettings');

      // Cleanup keycloak instance
      this.setState({
        keycloak: null,
      });
    }
  };

  onKeycloakTokens = tokens => {
    console.log('onKeycloakTokens', tokens);
  };

  render() {
    const { keycloak } = this.state;

    if (!keycloak) {
      return (
        <KeycloakRealmForm onKeycloakConfig={this.setupKeycloakWithConfig} />
      );
    }

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

export default App;
