import * as React from 'react'
import hoistStatics from 'hoist-non-react-statics'

import { KeycloakContext, KeycloakStubContext } from './internals/context'
import { isServer } from './internals/utils'

const getDisplayName = name => `WithKeycloak(${name})`

function withKeycloak(WrappedComponent) {
  const displayName = getDisplayName(
    WrappedComponent.displayName || WrappedComponent.name
  )

  class WithKeycloakComponent extends React.PureComponent {
    renderWrappedComponent = keycloakStub => ({ initialized, keycloak }) => {
      return (
        <WrappedComponent
          {...this.props}
          isServer={isServer()}
          keycloak={!initialized || isServer() ? keycloakStub : keycloak}
          keycloakInitialized={initialized || isServer()}
        />
      )
    }

    render() {
      return (
        <KeycloakStubContext.Consumer>
          {keycloakStub => (
            <KeycloakContext.Consumer>
              {this.renderWrappedComponent(keycloakStub)}
            </KeycloakContext.Consumer>
          )}
        </KeycloakStubContext.Consumer>
      )
    }
  }

  WithKeycloakComponent.WrappedComponent = WrappedComponent
  WithKeycloakComponent.displayName = displayName

  return hoistStatics(WithKeycloakComponent, WrappedComponent)
}

export default withKeycloak
