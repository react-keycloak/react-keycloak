import { useContext } from 'react'

import { reactKeycloakWebContext } from './context'

export function useKeycloak() {
  const { initialized, authClient } = useContext(reactKeycloakWebContext)
  return Object.assign([authClient, initialized], {
    initialized,
    keycloak: authClient,
  })
}
