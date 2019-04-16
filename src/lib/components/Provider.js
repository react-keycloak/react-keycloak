import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactKeycloakContext from './Context';

const initialState = {
  initialized: false,
  token: undefined,
};

class KeycloakProvider extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);

    const { keycloak } = props;
    if (!keycloak) {
      throw new Error("KeycloakProvider requires 'keycloak' prop to be defined");
    }
  }

  componentDidMount() {
    this._isMounted = true;
    this.init();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate({ keycloak: prevKeycloak }) {
    if (this.props.keycloak !== prevKeycloak) {
      // De-init previous Keycloak instance
      prevKeycloak.onReady = null;
      prevKeycloak.onAuthSuccess = null;
      prevKeycloak.onAuthError = null;
      prevKeycloak.onAuthRefreshSuccess = null;
      prevKeycloak.onAuthRefreshError = null;
      prevKeycloak.onAuthLogout = null;
      prevKeycloak.onTokenExpired = null;

      // Reset state
      this.setState({ ...initialState });
      // Init new Keycloak instance
      this.init();
    }
  }

  init() {
    const { initConfig, keycloak } = this.props;

    // Attach Keycloak listeners
    keycloak.onReady = this.updateState;
    keycloak.onAuthSuccess = this.updateState;
    keycloak.onAuthError = this.onKeycloakError;
    keycloak.onAuthRefreshSuccess = this.updateState;
    keycloak.onAuthRefreshError = this.onKeycloakError;
    keycloak.onAuthLogout = this.updateState;
    keycloak.onTokenExpired = this.refreshKeycloakToken;

    keycloak.init({ ...initConfig });
  }

  onKeycloakError = error => {
    console.error('KeycloakProvider error:', error);
    const { onError } = this.props;
    onError && onError(error);
  };

  updateState = () => {
    const { keycloak, onToken } = this.props;
    const { initialized: prevInitialized, token: prevToken } = this.state;
    const { token: newToken } = keycloak;

    // Avoid double-refresh if state hasn't changed
    if (!prevInitialized || newToken !== prevToken) {
      this.setState({
        initialized: true,
        token: newToken,
      });
    }

    // Notify token listener, if any
    if (newToken !== prevToken) {
      onToken && onToken(newToken);
    }
  };

  refreshKeycloakToken = () => {
    const { keycloak } = this.props;
    keycloak.updateToken();
  };

  render() {
    const { children, keycloak, LoadingComponent } = this.props;
    const { initialized } = this.state;

    if (!initialized && !!LoadingComponent) {
      return LoadingComponent;
    }

    return (
      <ReactKeycloakContext.Provider value={{ initialized, keycloak }}>
        {children}
      </ReactKeycloakContext.Provider>
    );
  }
}

KeycloakProvider.propTypes = {
  children: PropTypes.element.isRequired,
  keycloak: PropTypes.shape({
    init: PropTypes.func.isRequired,
    updateToken: PropTypes.func.isRequired,
  }).isRequired,
  initConfig: PropTypes.shape({}),
  LoadingComponent: PropTypes.element,
  onError: PropTypes.func,
  onToken: PropTypes.func,
};

KeycloakProvider.defaultProps = {
  initConfig: {
    onLoad: 'check-sso',
  },
  LoadingComponent: null,
  onError: null,
  onToken: null,
};

export default KeycloakProvider;
