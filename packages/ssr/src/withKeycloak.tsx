import type { KeycloakInstance } from 'keycloak-js'
import hoistStatics from 'hoist-non-react-statics'
import * as React from 'react'

import { ReactKeycloakSSRContextConsumer } from './internals/context'
import { isServer } from './internals/utils'

export interface KeycloakInjectedProps {
  isServer: boolean

  keycloak?: KeycloakInstance

  keycloakInitialized: boolean
}

interface IReactKeycloakSSRContextProps {
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
    }: IReactKeycloakSSRContextProps) => (
      <WrappedComponent
        {...(this.props as P)}
        isServer={isServer()}
        keycloak={keycloak}
        keycloakInitialized={initialized}
      />
    )

    render() {
      return (
        <ReactKeycloakSSRContextConsumer>
          {this.renderWrappedComponent}
        </ReactKeycloakSSRContextConsumer>
      )
    }
  }

  return hoistStatics(WithKeycloakComponent, WrappedComponent)
}
