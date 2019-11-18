import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';

import ReactKeycloakContext from './Context';

const initialState = {
  initialized: false,
  isLoading: true,
  token: undefined,
};

const defaultInitConfig = {
  onLoad: 'check-sso',
  promiseType: 'native',
};

class KeycloakProvider extends PureComponent {
  state = { ...initialState };

  constructor(props) {
    super(props);

    const { keycloak } = props;
    if (!keycloak) {
      throw new Error(
        "KeycloakProvider requires 'keycloak' prop to be defined",
      );
    }
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate({ keycloak: prevKeycloak, initConfig: prevInitConfig }) {
    if (
      this.props.keycloak !== prevKeycloak ||
      !isEqual(this.props.initConfig, prevInitConfig)
    ) {
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
    keycloak.onReady = this.updateState('onReady');
    keycloak.onAuthSuccess = this.updateState('onAuthSuccess');
    keycloak.onAuthError = this.onKeycloakError('onAuthError');
    keycloak.onAuthRefreshSuccess = this.updateState('onAuthRefreshSuccess');
    keycloak.onAuthRefreshError = this.onKeycloakError('onAuthRefreshError');
    keycloak.onAuthLogout = this.updateState('onAuthLogout');
    keycloak.onTokenExpired = this.refreshKeycloakToken('onTokenExpired');

    keycloak.init({ ...defaultInitConfig, ...initConfig });
  }

  onKeycloakError = event => error => {
    const { onError, onEvent } = this.props;

    // @Deprecated: Remove on next major
    /* istanbul ignore next */
    onError && onError(error);

    // Notify Events listener
    onEvent && onEvent(event, error);
  };

  updateState = event => () => {
    const { keycloak, onEvent, onToken, onTokens, isLoadingCheck } = this.props;
    const {
      initialized: prevInitialized,
      isLoading: prevLoading,
      token: prevToken,
    } = this.state;
    const { idToken, refreshToken, token: newToken } = keycloak;

    // Notify Events listener
    onEvent && onEvent(event);

    // Check Loading state
    const isLoading = isLoadingCheck ? isLoadingCheck(keycloak) : false;

    // Avoid double-refresh if state hasn't changed
    if (
      !prevInitialized ||
      isLoading !== prevLoading ||
      newToken !== prevToken
    ) {
      this.setState({
        initialized: true,
        isLoading,
        token: newToken,
      });
    }

    // Notify token listener, if any
    if (newToken !== prevToken) {
      // @Deprecated: Remove on next major
      /* istanbul ignore next */
      onToken && onToken(newToken);

      onTokens &&
        onTokens({
          idToken,
          refreshToken,
          token: newToken,
        });
    }
  };

  refreshKeycloakToken = event => () => {
    const { keycloak, onEvent } = this.props;
    // Notify Events listener
    onEvent && onEvent(event);

    // Refresh Keycloak token
    keycloak.updateToken();
  };

  render() {
    const { children, keycloak, LoadingComponent } = this.props;
    const { initialized, isLoading } = this.state;

    if (!!LoadingComponent && (!initialized || isLoading)) {
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
  isLoadingCheck: PropTypes.func,
  LoadingComponent: PropTypes.element,
  onError: PropTypes.func,
  onEvent: PropTypes.func,
  onToken: PropTypes.func,
};

KeycloakProvider.defaultProps = {
  initConfig: {
    onLoad: 'check-sso',
    promiseType: 'native',
  },
  isLoadingCheck: null,
  LoadingComponent: null,
  onError: null,
  onEvent: null,
  onToken: null,
};

export default KeycloakProvider;
