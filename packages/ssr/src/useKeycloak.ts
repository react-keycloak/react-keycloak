import { useContext } from 'react'

import { reactKeycloakSsrContext } from './internals/context'

export function useKeycloak() {
  const { initialized, authClient } = useContext(reactKeycloakSsrContext)
  return Object.assign([authClient, initialized], {
    initialized,
    keycloak: authClient,
  })
}
