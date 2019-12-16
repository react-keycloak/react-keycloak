import React from 'react'

export function createReactKeycloakContext(initialContext) {
  return React.createContext({
    initialized: false,
    ...initialContext
  })
}

export default createReactKeycloakContext
