/* istanbul ignore file */

import * as React from 'react'

import { IReactKeycloakContextProps } from '../src/context'
import { KeycloakClient } from '../src/types'

export const createKeycloakStub = (): KeycloakClient => ({
  init: jest.fn().mockResolvedValue(true),
  updateToken: jest.fn(),
})

export const createChild = (
  ReactKeycloakContext: React.Context<IReactKeycloakContextProps>
) => {
  class Child extends React.Component {
    render() {
      return (
        <ReactKeycloakContext.Consumer>
          {({ keycloak }) => {
            return (
              <div data-testid="keycloak">
                keycloak: {keycloak ? 'present' : 'absent'}
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
