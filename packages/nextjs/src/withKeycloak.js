import * as React from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { KeycloakContext } from './internals/keycloak'
import { ServerContext } from './internals/serverProvider'

const getDisplayName = (name) => `WithKeycloak(${name})`

function withKeycloak(WrappedComponent) {
  const displayName = getDisplayName(
    WrappedComponent.displayName || WrappedComponent.name
  )

  class WithKeycloakComponent extends React.PureComponent {
    renderWrappedComponent = ({ isServer, isAuthenticated }) => ({
      initialized,
      keycloak,
    }) => (
      <WrappedComponent
        {...this.props}
        isAuthenticated={
          // either the client (keycloak.authenticated) or the server (isAuthenticated cookie) has to assert that the user is logged in
          keycloak?.authenticated ||
          ((isServer || !keycloak?.subject) && isAuthenticated === 'true')
        }
        keycloak={keycloak}
        keycloakInitialized={initialized}
      />
    )

    render() {
      return (
        <ServerContext.Consumer>
          {({ isServer, isAuthenticated }) => (
            <KeycloakContext.Consumer>
              {this.renderWrappedComponent({ isServer, isAuthenticated })}
            </KeycloakContext.Consumer>
          )}
        </ServerContext.Consumer>
      )
    }
  }

  WithKeycloakComponent.WrappedComponent = WrappedComponent
  WithKeycloakComponent.displayName = displayName

  return hoistStatics(WithKeycloakComponent, WrappedComponent)
}

export default withKeycloak
