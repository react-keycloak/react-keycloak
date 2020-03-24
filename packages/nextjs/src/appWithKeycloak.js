import React from "react";
import hoistStatics from "hoist-non-react-statics";
import PropTypes from "prop-types";

import { getKeycloakInstance } from "./internals/keycloak";
import KeycloakProvider from "./internals/keycloakProvider";
import ServerProvider from "./internals/serverProvider";
import { checkIfUserAuthenticated, setCookie, removeCookie } from "./internals/utils";
import { TOKEN_COOKIES_AGE } from "~/env";
import jsCookies from "js-cookies";
import { login,logout } from "~/components/hoc/withAuthSync";

const appWithKeycloak = (
  keycloakInitOptions,
  providerProps = {}
) => NextApp => {
  const keycloak = getKeycloakInstance(keycloakInitOptions);

  async function getComponentInitialProps({ Component, ctx }) {
    return Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
  }

  async function getKeycloakInitialProps(appContext) {
    return NextApp.getKeycloakInitConfig
      ? await NextApp.getKeycloakInitConfig(appContext)
      : {};
  }
  async function getNextAppInitialProps(appContext){
    return NextApp.getInitialProps ? await NextApp.getInitialProps(appContext) : null;
  }
  class AppWithKeycloak extends React.Component {
    static async getInitialProps(appContext) {

      const { isAuthenticated } = checkIfUserAuthenticated(appContext);
      const [cmpInitialProps, keycloakInitConfig,pageProps] = await Promise.all([
        getComponentInitialProps(appContext),
        getKeycloakInitialProps(appContext),
        getNextAppInitialProps(appContext)
      ]);

      return {
        pageProps: {
          ...cmpInitialProps,
          isAuthenticated,
          ...pageProps
        },
        keycloakInitConfig
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        isAuthenticated: props?.pageProps?.isAuthenticated ?? "null",
        keycloakInitConfig: {
          ...(providerProps?.initConfig ?? {}),
          ...(props?.keycloakInitConfig ?? {})
        }
      };
    }

    onEvent = async(event, error) => {
      if (error) {
        return console.error(error);
      }

      if (event === "onAuthSuccess") {

        this.setState({
          isAuthenticated: "true"
        });

        const user = await keycloak.loadUserInfo();
        const expDate = keycloak.tokenParsed.exp * 1000;
        setCookie("isAuthenticated", "true",expDate);
        jsCookies.setItem("user", JSON.stringify(user), expDate, "/");
         login(keycloak.token, expDate);
      }

      if (event === "onAuthLogout") {
        this.setState({
          isAuthenticated: "false"
        });

      }

      if (event === "onReady") {
        const isAuthenticated = keycloak.authenticated ? "true" : "false";
        this.setState({
          isAuthenticated
        });
      }

      // Propagate events up
      providerProps?.onEvent?.(event, error);
    };

    isLoadingCheck = keycloak => {
      const { pageProps } = this.props;
      const { isAuthenticated } = this.state;
      
      const { isAuthenticated: isAuthProp } = pageProps;

      if (providerProps?.isLoadingCheck) {
        return providerProps.isLoadingCheck(
          keycloak,
          isAuthenticated || isAuthProp
        );
      }

      return false;
    };

    render() {
      // eslint-disable-next-line no-unused-vars
      const { keycloakInitConfig: kcInitCfg, pageProps, ...props } = this.props;
      const { isAuthenticated, keycloakInitConfig } = this.state;

      const { isAuthenticated: isAuthProp, ...childPageProps } = pageProps;

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
      );
    }
  }

  AppWithKeycloak.propTypes = {
    pageProps: PropTypes.shape({
      isAuthenticated: PropTypes.string.isRequired
    }).isRequired,
    keycloakInitConfig: PropTypes.shape({}).isRequired
  };

  return hoistStatics(AppWithKeycloak, NextApp, {
    getInitialProps: true
  });
};

export default appWithKeycloak;
