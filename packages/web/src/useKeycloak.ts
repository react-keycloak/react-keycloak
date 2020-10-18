import { useContext } from 'react'

import { reactKeycloakWebContext } from './context'

export function useKeycloak() {
  const ctx = useContext(reactKeycloakWebContext)

  if (!ctx) {
    throw new Error(
      'useKeycloak hook must be used inside ReactKeycloakProvider context'
    )
  }

  if (!ctx.authClient) {
    throw new Error('authClient has not been assigned to ReactKeycloakProvider')
  }

  const { authClient, initialized } = ctx
  return {
    initialized,
    keycloak: authClient,
  }
}
