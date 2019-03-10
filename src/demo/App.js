import Keycloak from 'keycloak-js';
import React from 'react';

import { KeycloakProvider } from '../lib';

import { AppRouter } from './routes';

const keycloak = new Keycloak();

const App = () => (
  <KeycloakProvider keycloak={keycloak}>
    <AppRouter />
  </KeycloakProvider>
);

export default App;
