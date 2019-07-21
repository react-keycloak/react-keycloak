import React, { Component } from 'react'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import ReactKeycloakContext from '../../lib/components/Context'
import KeycloakProvider from '../../lib/components/Provider'

import { createKeycloakStub } from '../utils'

const createChild = () => {
  class Child extends Component {
    render () {
      return (
        <ReactKeycloakContext.Consumer>
          {({ keycloak }) => {
            return (
              <div data-testid='keycloak'>
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

describe('KeycloakProvider', () => {
  afterEach(rtl.cleanup)

  describe('on initialization', () => {
    it('should enforce a single child', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const keycloakStub = createKeycloakStub()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub}>
          <div />
          <div />
        </KeycloakProvider>
      )

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should throw if no Keycloak instance is provided', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      expect(() =>
        rtl.render(
          <KeycloakProvider>
            <div />
          </KeycloakProvider>
        )
      ).toThrow()

      expect(consoleSpy).toHaveBeenCalled()
      consoleSpy.mockRestore()
    })

    it('should init Keycloak instance', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const keycloakStub = createKeycloakStub()
      const keycloakInitSpy = jest
        .spyOn(keycloakStub, 'init')
        .mockImplementation()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub}>
          <div />
        </KeycloakProvider>
      )

      expect(consoleSpy).toHaveBeenCalledTimes(0)
      consoleSpy.mockRestore()

      expect(keycloakInitSpy).toHaveBeenCalledTimes(1)
      expect(keycloakInitSpy).toHaveBeenCalledWith({
        onLoad: 'check-sso'
      })
      keycloakInitSpy.mockRestore()
    })

    it('should attach Keycloak handlers', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      const keycloakStub = createKeycloakStub()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub}>
          <div />
        </KeycloakProvider>
      )

      expect(consoleSpy).toHaveBeenCalledTimes(0)
      consoleSpy.mockRestore()

      expect(keycloakStub.onReady).toBeDefined()
      expect(keycloakStub.onAuthSuccess).toBeDefined()
      expect(keycloakStub.onAuthError).toBeDefined()
      expect(keycloakStub.onAuthRefreshSuccess).toBeDefined()
      expect(keycloakStub.onAuthRefreshError).toBeDefined()
      expect(keycloakStub.onAuthLogout).toBeDefined()
      expect(keycloakStub.onTokenExpired).toBeDefined()
    })

    it('should diplay LoadingComponent if provided', () => {
      const keycloakStub = createKeycloakStub()

      const tester = rtl.render(
        <KeycloakProvider
          keycloak={keycloakStub}
          LoadingComponent={
            <span data-testid='LoadingComponent'>Loading...</span>
          }
        >
          <div />
        </KeycloakProvider>
      )

      expect(tester.getByTestId('LoadingComponent')).toBeVisible()
      expect(tester.getByTestId('LoadingComponent')).toHaveTextContent(
        'Loading...'
      )
    })
  })

  describe('on update', () => {
    it('should detach Keycloak handlers', () => {
      // Setup
      const keycloakStub = createKeycloakStub()
      const newKeycloakStub = createKeycloakStub()

      let externalSetState
      class MockApp extends Component {
        constructor () {
          super()
          this.state = {
            keycloak: keycloakStub
          }
          externalSetState = this.setState.bind(this)
        }

        render () {
          const { keycloak } = this.state
          return (
            <KeycloakProvider keycloak={keycloak}>
              <div />
            </KeycloakProvider>
          )
        }
      }

      rtl.render(<MockApp />)

      expect(keycloakStub.onReady).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthSuccess).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthError).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthRefreshSuccess).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthRefreshError).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthLogout).toBeInstanceOf(Function)
      expect(keycloakStub.onTokenExpired).toBeInstanceOf(Function)

      rtl.act(() => {
        externalSetState({ keycloak: newKeycloakStub })
      })

      // Check that old Keycloak handlers have been detached
      expect(keycloakStub.onReady).toBeNull()
      expect(keycloakStub.onAuthSuccess).toBeNull()
      expect(keycloakStub.onAuthError).toBeNull()
      expect(keycloakStub.onAuthRefreshSuccess).toBeNull()
      expect(keycloakStub.onAuthRefreshError).toBeNull()
      expect(keycloakStub.onAuthLogout).toBeNull()
      expect(keycloakStub.onTokenExpired).toBeNull()

      // Check that new Keycloak handlers have been attached
      expect(newKeycloakStub.onReady).toBeInstanceOf(Function)
      expect(newKeycloakStub.onAuthSuccess).toBeInstanceOf(Function)
      expect(newKeycloakStub.onAuthError).toBeInstanceOf(Function)
      expect(newKeycloakStub.onAuthRefreshSuccess).toBeInstanceOf(Function)
      expect(newKeycloakStub.onAuthRefreshError).toBeInstanceOf(Function)
      expect(newKeycloakStub.onAuthLogout).toBeInstanceOf(Function)
      expect(newKeycloakStub.onTokenExpired).toBeInstanceOf(Function)
    })
  })

  it('should add the keycloak instance to context', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const keycloakStub = createKeycloakStub()
    const Child = createChild()

    const tester = rtl.render(
      <KeycloakProvider keycloak={keycloakStub}>
        <Child />
      </KeycloakProvider>
    )

    expect(consoleSpy).toHaveBeenCalledTimes(0)
    consoleSpy.mockRestore()

    expect(tester.getByTestId('keycloak')).toHaveTextContent(
      'keycloak: present'
    )
  })

  describe('on Keycloak events', () => {
    it('should notify listeners for onReady event', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub} onEvent={onEventListener}>
          <div />
        </KeycloakProvider>
      )

      rtl.act(() => {
        keycloakStub.onReady()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onReady')
    })

    it('should notify listeners for onAuthSuccess events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub} onEvent={onEventListener}>
          <div />
        </KeycloakProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthSuccess()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onAuthSuccess')
    })

    it('should notify listeners for onAuthError events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub} onEvent={onEventListener}>
          <div />
        </KeycloakProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthError('StubError')
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onAuthError', 'StubError')
    })

    it('should notify listeners for onAuthRefreshSuccess events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub} onEvent={onEventListener}>
          <div />
        </KeycloakProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthRefreshSuccess()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onAuthRefreshSuccess')
    })

    it('should notify listeners for onAuthRefreshError events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub} onEvent={onEventListener}>
          <div />
        </KeycloakProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthRefreshError('StubError')
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith(
        'onAuthRefreshError',
        'StubError'
      )
    })

    it('should notify listeners for onAuthLogout events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub} onEvent={onEventListener}>
          <div />
        </KeycloakProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthLogout()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onAuthLogout')
    })

    it('should call keycloak.updateToken on onTokenExpired event', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

      const keycloakStub = createKeycloakStub()
      const keycloakUpdateTokenSpy = jest
        .spyOn(keycloakStub, 'updateToken')
        .mockImplementation()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub}>
          <div />
        </KeycloakProvider>
      )

      rtl.act(() => {
        keycloakStub.onTokenExpired()
      })

      expect(consoleSpy).toHaveBeenCalledTimes(0)
      consoleSpy.mockRestore()

      expect(keycloakUpdateTokenSpy).toHaveBeenCalledTimes(1)
      keycloakUpdateTokenSpy.mockRestore()
    })

    it('should return Keycloak tokens when they change', () => {
      const keycloakStub = createKeycloakStub()
      const onTokensListener = jest.fn()

      rtl.render(
        <KeycloakProvider keycloak={keycloakStub} onTokens={onTokensListener}>
          <div />
        </KeycloakProvider>
      )

      rtl.act(() => {
        keycloakStub.idToken = 'fakeIdToken'
        keycloakStub.refreshToken = 'fakeRefreshToken'
        keycloakStub.token = 'fakeToken'

        keycloakStub.onAuthRefreshSuccess()
      })

      expect(onTokensListener).toHaveBeenCalledTimes(1)
      expect(onTokensListener).toHaveBeenCalledWith({
        idToken: 'fakeIdToken',
        refreshToken: 'fakeRefreshToken',
        token: 'fakeToken'
      })
    })
  })
})
