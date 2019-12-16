import React from 'react'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { createChild, createKeycloakStub } from '../test-utils'

import { KeycloakProvider, withKeycloak } from '../../src'

describe('withKeycloak HOC', () => {
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
