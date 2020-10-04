import type { AuthClient } from '@react-keycloak/core'
import { useContext } from 'react'

import { reactKeycloakWebContext } from './context'

export type useKeycloakHookResults<T extends AuthClient> = {
  initialized: boolean

  keycloak?: T
}

export function useKeycloak<T extends AuthClient>(): useKeycloakHookResults<T> {
  const { initialized, authClient } = useContext(reactKeycloakWebContext)
  return {
    initialized,
    keycloak: authClient as T | undefined,
  }
}
