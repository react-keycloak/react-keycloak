import type { KeycloakInstance } from 'keycloak-js'
import hoistStatics from 'hoist-non-react-statics'
import * as React from 'react'

import { ReactKeycloakWebContextConsumer } from './context'

export interface KeycloakInjectedProps {
  keycloak?: KeycloakInstance

  keycloakInitialized: boolean
}

interface IReactKeycloakWebContextProps {
  keycloak?: KeycloakInstance

  initialized: boolean
}

const getDisplayName = (name: string) => `WithKeycloak(${name})`

export function withKeycloak<P extends KeycloakInjectedProps>(
  WrappedComponent: React.ComponentType<P>
) {
  const displayName = getDisplayName(
    WrappedComponent.displayName || WrappedComponent.name
  )

  const WithKeycloakComponent = class extends React.PureComponent {
    static WrappedComponent = WrappedComponent

    static displayName = displayName

    renderWrappedComponent = ({
      initialized,
      keycloak,
    }: IReactKeycloakWebContextProps) => (
      <WrappedComponent
        {...(this.props as P)}
        keycloak={keycloak}
        keycloakInitialized={initialized}
      />
    )

    render() {
      return (
        <ReactKeycloakWebContextConsumer>
          {this.renderWrappedComponent}
        </ReactKeycloakWebContextConsumer>
      )
    }
  }

  return hoistStatics(WithKeycloakComponent, WrappedComponent)
}
