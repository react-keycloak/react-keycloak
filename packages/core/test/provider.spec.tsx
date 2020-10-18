import * as React from 'react'
import * as rtl from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { createKeycloakStub, createChild, flushPromises } from './test-utils'

import { createAuthContext, IAuthContextProps } from '../src/context'
import { createAuthProvider } from '../src/provider'
import { AuthClient, AuthClientInitOptions } from '../src/types'

afterEach(require('@testing-library/react').cleanup)

describe('AuthProvider', () => {
  let keycloakCtx: React.Context<IAuthContextProps<AuthClient>>

  beforeEach(() => {
    keycloakCtx = createAuthContext()
  })

  describe('on initialization', () => {
    it('should init Keycloak instance', () => {
      const keycloakStub = createKeycloakStub()
      const keycloakInitSpy = jest
        .spyOn(keycloakStub, 'init')
        .mockResolvedValue(true)

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub}>
          <div />
        </AuthProvider>
      )

      expect(keycloakInitSpy).toHaveBeenCalledTimes(1)
      expect(keycloakInitSpy).toHaveBeenCalledWith({
        onLoad: 'check-sso',
      })

      keycloakInitSpy.mockRestore()
    })

    it('should notify error during init Keycloak instance', async () => {
      const eventListener = jest.fn()
      const keycloakStub = createKeycloakStub()
      const keycloakInitSpy = jest
        .spyOn(keycloakStub, 'init')
        .mockRejectedValue({
          error: 'StubError',
          error_description: 'A stub error',
        })

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={eventListener}>
          <div />
        </AuthProvider>
      )

      await flushPromises()

      expect(keycloakInitSpy).toHaveBeenCalledTimes(1)
      expect(keycloakInitSpy).toHaveBeenCalledWith({
        onLoad: 'check-sso',
      })

      expect(eventListener).toHaveBeenCalledTimes(1)
      expect(eventListener).toHaveBeenCalledWith('onInitError', {
        error: 'StubError',
        error_description: 'A stub error',
      })

      keycloakInitSpy.mockRestore()
    })

    it('should attach Keycloak handlers', () => {
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub}>
          <div />
        </AuthProvider>
      )

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

      const AuthProvider = createAuthProvider(keycloakCtx)

      const tester = rtl.render(
        <AuthProvider
          authClient={keycloakStub}
          LoadingComponent={
            <span data-testid="LoadingComponent">Loading...</span>
          }
        >
          <div />
        </AuthProvider>
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

      const AuthProvider = createAuthProvider(keycloakCtx)

      let externalSetState: (newState: { authClient: AuthClient }) => void
      class MockApp extends React.Component<
        {},
        {
          authClient: AuthClient
        }
      > {
        constructor(props: {}) {
          super(props)
          this.state = {
            authClient: keycloakStub,
          }
          externalSetState = this.setState.bind(this)
        }

        render() {
          const { authClient } = this.state
          return (
            <AuthProvider authClient={authClient}>
              <div />
            </AuthProvider>
          )
        }
      }

      rtl.render(<MockApp />)

      // Check that Keycloak init has been called once
      expect(keycloakStub.init).toHaveBeenCalledTimes(1)

      // Check that Keycloak handlers have been set
      expect(keycloakStub.onReady).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthSuccess).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthError).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthRefreshSuccess).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthRefreshError).toBeInstanceOf(Function)
      expect(keycloakStub.onAuthLogout).toBeInstanceOf(Function)
      expect(keycloakStub.onTokenExpired).toBeInstanceOf(Function)

      rtl.act(() => {
        externalSetState({ authClient: newKeycloakStub })
      })

      // Check that old Keycloak handlers have been detached
      expect(keycloakStub.onReady).toBeUndefined()
      expect(keycloakStub.onAuthSuccess).toBeUndefined()
      expect(keycloakStub.onAuthError).toBeUndefined()
      expect(keycloakStub.onAuthRefreshSuccess).toBeUndefined()
      expect(keycloakStub.onAuthRefreshError).toBeUndefined()
      expect(keycloakStub.onAuthLogout).toBeUndefined()
      expect(keycloakStub.onTokenExpired).toBeUndefined()

      // Check that new Keycloak init has been called once
      expect(newKeycloakStub.init).toHaveBeenCalledTimes(1)

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

  describe('on initConfig change', () => {
    it('should re-init Keycloak', () => {
      // Setup
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      let externalSetState: (newState: {
        initOptions: AuthClientInitOptions
      }) => void
      class MockApp extends React.Component<
        {},
        { initOptions: AuthClientInitOptions }
      > {
        constructor(props: {}) {
          super(props)

          this.state = {
            initOptions: {
              onLoad: 'check-sso',
            },
          }

          externalSetState = this.setState.bind(this)
        }

        render() {
          const { initOptions } = this.state
          return (
            <AuthProvider authClient={keycloakStub} initOptions={initOptions}>
              <div />
            </AuthProvider>
          )
        }
      }

      rtl.render(<MockApp />)

      rtl.act(() => {
        externalSetState({ initOptions: { onLoad: 'login-required' } })
      })

      // Check that Keycloak init has been called twice
      expect(keycloakStub.init).toHaveBeenCalledTimes(2)
    })

    it('should not re-init Keycloak if content is same', () => {
      // Setup
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      let externalSetState: (newState: {
        initOptions: AuthClientInitOptions
      }) => void
      class MockApp extends React.Component<
        {},
        { initOptions: AuthClientInitOptions }
      > {
        constructor(props: {}) {
          super(props)

          this.state = {
            initOptions: {
              onLoad: 'check-sso',
            },
          }

          externalSetState = this.setState.bind(this)
        }

        render() {
          const { initOptions } = this.state
          return (
            <AuthProvider authClient={keycloakStub} initOptions={initOptions}>
              <div />
            </AuthProvider>
          )
        }
      }

      rtl.render(<MockApp />)

      rtl.act(() => {
        externalSetState({ initOptions: { onLoad: 'check-sso' } })
      })

      // Check that Keycloak init has been called once
      expect(keycloakStub.init).toHaveBeenCalledTimes(1)
    })
  })

  it('should add the Keycloak instance to context', () => {
    const keycloakStub = createKeycloakStub()

    const AuthProvider = createAuthProvider(keycloakCtx)
    const Child = createChild(keycloakCtx)

    const tester = rtl.render(
      <AuthProvider authClient={keycloakStub}>
        <Child />
      </AuthProvider>
    )

    expect(tester.getByTestId('keycloak')).toHaveTextContent(
      'authClient: present'
    )
  })

  describe('on Keycloak events', () => {
    it('should notify listeners for onReady event', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={onEventListener}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onReady!()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onReady')
    })

    it('should notify listeners for onAuthSuccess events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={onEventListener}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthSuccess!()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onAuthSuccess')
    })

    it('should notify listeners for onAuthError events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={onEventListener}>
          <div />
        </AuthProvider>
      )

      const stubKeycloakError = {
        error: 'StubError',
        error_description: 'A stub error',
      }

      rtl.act(() => {
        keycloakStub.onAuthError!(stubKeycloakError)
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith(
        'onAuthError',
        stubKeycloakError
      )
    })

    it('should notify listeners for onAuthRefreshSuccess events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={onEventListener}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthRefreshSuccess!()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onAuthRefreshSuccess')
    })

    it('should notify listeners for onAuthRefreshError events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={onEventListener}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthRefreshError!()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith(
        'onAuthRefreshError',
        undefined
      )
    })

    it('should notify listeners for onAuthLogout events', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={onEventListener}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onAuthLogout!()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onAuthLogout')
    })

    it('should call keycloak.updateToken on onTokenExpired event', () => {
      const keycloakStub = createKeycloakStub()
      const keycloakUpdateTokenSpy = jest
        .spyOn(keycloakStub, 'updateToken')
        .mockImplementation()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onTokenExpired!()
      })

      expect(keycloakUpdateTokenSpy).toHaveBeenCalledTimes(1)
      keycloakUpdateTokenSpy.mockRestore()
    })

    it('should NOT call keycloak.updateToken on onTokenExpired event if autoRefreshToken is false', () => {
      const keycloakStub = createKeycloakStub()
      const keycloakUpdateTokenSpy = jest
        .spyOn(keycloakStub, 'updateToken')
        .mockImplementation()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} autoRefreshToken={false}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onTokenExpired!()
      })

      expect(keycloakUpdateTokenSpy).not.toHaveBeenCalled()
      keycloakUpdateTokenSpy.mockRestore()
    })

    it('should return Keycloak tokens when they change', () => {
      const keycloakStub = createKeycloakStub()
      const onTokensListener = jest.fn()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onTokens={onTokensListener}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.idToken = 'fakeIdToken'
        keycloakStub.refreshToken = 'fakeRefreshToken'
        keycloakStub.token = 'fakeToken'

        keycloakStub.onAuthRefreshSuccess!()
      })

      expect(onTokensListener).toHaveBeenCalledTimes(1)
      expect(onTokensListener).toHaveBeenCalledWith({
        idToken: 'fakeIdToken',
        refreshToken: 'fakeRefreshToken',
        token: 'fakeToken',
      })
    })

    it('should notify listeners when tokens expire', () => {
      const onEventListener = jest.fn()
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={onEventListener}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onTokenExpired!()
      })

      expect(onEventListener).toHaveBeenCalledTimes(1)
      expect(onEventListener).toHaveBeenCalledWith('onTokenExpired')
    })

    it('should not update state twice if tokens are unchanged', () => {
      const keycloakStub = createKeycloakStub()
      const onEventListener = jest.fn()

      const AuthProvider = createAuthProvider(keycloakCtx)

      const setStateSpy = jest.spyOn(AuthProvider.prototype, 'setState')

      rtl.render(
        <AuthProvider authClient={keycloakStub} onEvent={onEventListener}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.idToken = 'fakeIdToken'
        keycloakStub.refreshToken = 'fakeRefreshToken'
        keycloakStub.token = 'fakeToken'

        keycloakStub.onReady!()
      })

      rtl.act(() => {
        keycloakStub.idToken = 'fakeIdToken'
        keycloakStub.refreshToken = 'fakeRefreshToken'
        keycloakStub.token = 'fakeToken'

        keycloakStub.onAuthRefreshSuccess!()
      })

      expect(onEventListener).toHaveBeenCalledTimes(2)
      expect(onEventListener).toHaveBeenNthCalledWith(1, 'onReady')
      expect(onEventListener).toHaveBeenNthCalledWith(2, 'onAuthRefreshSuccess')

      expect(setStateSpy).toHaveBeenCalledTimes(1)
      expect(setStateSpy).toHaveBeenNthCalledWith(1, {
        initialized: true,
        isAuthenticated: true,
        isLoading: false,
      })

      // Remove setStateSpy mock
      setStateSpy.mockRestore()
    })
  })

  describe('if a custom isLoadingCheck is provided', () => {
    it('should call the isLoadingCheck function', () => {
      const isLoadingCheck = jest.fn().mockImplementation(() => true)
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      rtl.render(
        <AuthProvider authClient={keycloakStub} isLoadingCheck={isLoadingCheck}>
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onReady!()
      })

      expect(isLoadingCheck).toHaveBeenCalledTimes(1)
      expect(isLoadingCheck).toHaveBeenCalledWith(keycloakStub)
    })

    it('should display LoadingComponent if the isLoadingCheck function returns true', () => {
      const isLoadingCheck = jest.fn().mockImplementation(() => true)
      const keycloakStub = createKeycloakStub()

      const AuthProvider = createAuthProvider(keycloakCtx)

      const tester = rtl.render(
        <AuthProvider
          authClient={keycloakStub}
          isLoadingCheck={isLoadingCheck}
          LoadingComponent={
            <span data-testid="LoadingComponent">Loading...</span>
          }
        >
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.onReady!()
      })

      expect(isLoadingCheck).toHaveBeenCalledTimes(1)
      expect(isLoadingCheck).toHaveBeenCalledWith(keycloakStub)

      expect(tester.getByTestId('LoadingComponent')).toBeVisible()
      expect(tester.getByTestId('LoadingComponent')).toHaveTextContent(
        'Loading...'
      )
    })

    it('should not update state twice if loading state is unchanged', () => {
      const isLoadingCheck = jest.fn().mockImplementation(() => true)
      const keycloakStub = createKeycloakStub()
      const onEventListener = jest.fn()

      const AuthProvider = createAuthProvider(keycloakCtx)
      const setStateSpy = jest.spyOn(AuthProvider.prototype, 'setState')

      rtl.render(
        <AuthProvider
          authClient={keycloakStub}
          onEvent={onEventListener}
          isLoadingCheck={isLoadingCheck}
        >
          <div />
        </AuthProvider>
      )

      rtl.act(() => {
        keycloakStub.idToken = 'fakeIdToken'
        keycloakStub.refreshToken = 'fakeRefreshToken'
        keycloakStub.token = 'fakeToken'

        keycloakStub.onReady!()
      })

      rtl.act(() => {
        keycloakStub.idToken = 'fakeIdToken'
        keycloakStub.refreshToken = 'fakeRefreshToken'
        keycloakStub.token = 'fakeToken'

        keycloakStub.onAuthRefreshSuccess!()
      })

      expect(onEventListener).toHaveBeenCalledTimes(2)
      expect(onEventListener).toHaveBeenNthCalledWith(1, 'onReady')
      expect(onEventListener).toHaveBeenNthCalledWith(2, 'onAuthRefreshSuccess')

      expect(setStateSpy).toHaveBeenCalledTimes(1)
      expect(setStateSpy).toHaveBeenNthCalledWith(1, {
        initialized: true,
        isAuthenticated: true,
        isLoading: true,
      })

      // Remove setStateSpy mock
      setStateSpy.mockRestore()
    })
  })
})
