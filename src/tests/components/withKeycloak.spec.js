import React from 'react'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { KeycloakProvider, withKeycloak } from '../../lib'

import { createChild, createKeycloakStub } from '../utils'

describe('withKeycloak HOC', () => {
  afterEach(rtl.cleanup)

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
