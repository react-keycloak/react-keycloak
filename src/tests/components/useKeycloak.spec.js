import React from 'react'
import * as rtl from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import { useKeycloak, KeycloakProvider } from '../../lib'

import { createKeycloakStub } from '../utils'

const createHookWrapper = () => ({ children }) =>
  <KeycloakProvider keycloak={createKeycloakStub()}>
    {children}
  </KeycloakProvider>

describe('useKeycloak hook', () => {
  afterEach(rtl.cleanup)

  it('should return Keycloak (as object)', () => {
    const { result } = renderHook(() => useKeycloak(), {
      wrapper: createHookWrapper()
    })

    const { keycloak } = result.current

    expect(keycloak).toBeDefined()
    expect(keycloak).toBeInstanceOf(Object)
  })

  it('should return initialized (as object)', () => {
    const { result } = renderHook(() => useKeycloak(), {
      wrapper: createHookWrapper()
    })

    const { initialized } = result.current

    expect(initialized).toBeDefined()
    expect(initialized).toBe(false)
  })

  it('should return Keycloak (as array[0])', () => {
    const { result } = renderHook(() => useKeycloak(), {
      wrapper: createHookWrapper()
    })

    const [keycloak] = result.current

    expect(keycloak).toBeDefined()
    expect(keycloak).toBeInstanceOf(Object)
  })

  it('should return initialized (as array[1])', () => {
    const { result } = renderHook(() => useKeycloak(), {
      wrapper: createHookWrapper()
    })

    const [, initialized] = result.current

    expect(initialized).toBeDefined()
    expect(initialized).toBe(false)
  })
})
