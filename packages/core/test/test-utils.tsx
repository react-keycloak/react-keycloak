/* istanbul ignore file */

import * as React from 'react'

import { IAuthContextProps } from '../src/context'
import { AuthClient } from '../src/types'

export const createKeycloakStub = (): AuthClient => ({
  init: jest.fn().mockResolvedValue(true),
  updateToken: jest.fn(),
})

export const createChild = (
  ReactKeycloakContext: React.Context<IAuthContextProps<AuthClient>>
) => {
  class Child extends React.Component {
    render() {
      return (
        <ReactKeycloakContext.Consumer>
          {({ authClient }) => {
            return (
              <div data-testid="keycloak">
                authClient: {authClient ? 'present' : 'absent'}
              </div>
            )
          }}
        </ReactKeycloakContext.Consumer>
      )
    }
  }

  return Child
}

export const flushPromises = () => new Promise(setImmediate)
