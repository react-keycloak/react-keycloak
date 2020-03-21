import { createContext } from 'react'

export function createReactKeycloakContext(initialContext) {
  return createContext({
    initialized: false,
    ...initialContext
  })
}

export default createReactKeycloakContext
