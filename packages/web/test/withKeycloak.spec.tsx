import React from 'react'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { createChild, createKeycloakStub } from './test-utils'

import { ReactKeycloakProvider, withKeycloak } from '../src'

afterEach(require('@testing-library/react').cleanup)

describe('withKeycloak HOC', () => {
  it('should pass Keycloak to component props', () => {
    const keycloakStub = createKeycloakStub()
    const Container = withKeycloak(createChild(['keycloak']))

    const tester = rtl.render(
      <ReactKeycloakProvider authClient={keycloakStub}>
        <Container />
      </ReactKeycloakProvider>
    )

    expect(tester.getByTestId('keycloak')).toHaveTextContent('keycloak')
  })

  it('should pass keycloakInitialized to component props', () => {
    const keycloakStub = createKeycloakStub()
    const Container = withKeycloak(createChild(['keycloakInitialized']))

    const tester = rtl.render(
      <ReactKeycloakProvider authClient={keycloakStub}>
        <Container />
      </ReactKeycloakProvider>
    )

    expect(tester.getByTestId('keycloak')).toHaveTextContent(
      'keycloakInitialized'
    )
  })
})
