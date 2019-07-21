import React, { Component } from 'react'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import KeycloakProvider from '../../lib/components/Provider'
import { withKeycloak } from '../../lib'

const createKeycloakStub = () => ({
  init: () => {},
  updateToken: () => {}
})

const createChild = (testedProps = []) => {
  class Child extends Component {
    render () {
      return (
        <div data-testid='keycloak'>
          {Object.keys(this.props).filter(prop => testedProps.includes(prop))}
        </div>
      )
    }
  }

  return Child
}

describe('withKeycloak HOC', () => {
  afterEach(() => rtl.cleanup())

  it('should pass Keycloak to component props', () => {
    const keycloakStub = createKeycloakStub()
    const Container = withKeycloak(createChild(['keycloak']))

    const tester = rtl.render(
      <KeycloakProvider keycloak={keycloakStub}>
        <Container />
      </KeycloakProvider>
    )

    expect(tester.getByTestId('keycloak')).toHaveTextContent('keycloak')
  })

  it('should pass keycloakInitialized to component props', () => {
    const keycloakStub = createKeycloakStub()
    const Container = withKeycloak(createChild(['keycloakInitialized']))

    const tester = rtl.render(
      <KeycloakProvider keycloak={keycloakStub}>
        <Container />
      </KeycloakProvider>
    )

    expect(tester.getByTestId('keycloak')).toHaveTextContent(
      'keycloakInitialized'
    )
  })
})
