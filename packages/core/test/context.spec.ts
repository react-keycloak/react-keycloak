import { createKeycloakStub } from './test-utils'

import createAuthContext from '../src/context'

afterEach(require('@testing-library/react').cleanup)

describe('createReactKeycloakContext', () => {
  it('should return a new React Context with null', () => {
    const rcContext = createAuthContext()

    expect(rcContext).toBeDefined()
    expect(rcContext.Consumer).toBeDefined()
    expect(rcContext.Provider).toBeDefined()
  })

  it('should return a new React Context with initialized values', () => {
    const rcContext = createAuthContext({
      initialized: false,
      authClient: createKeycloakStub(),
    })

    expect(rcContext).toBeDefined()
    expect(rcContext.Consumer).toBeDefined()
    expect(rcContext.Provider).toBeDefined()
  })
})
