import { useContext } from 'react'

import { reactKeycloakSsrContext } from './internals/context'
import { isServer } from './internals/utils'

import type { SSRAuthClient } from './types'

export type useKeycloakHookResults<T extends SSRAuthClient> = {
  initialized: boolean

  keycloak?: T
}

export function useKeycloak<
  T extends SSRAuthClient = SSRAuthClient
>(): useKeycloakHookResults<T> {
  const { initialized, authClient } = useContext(reactKeycloakSsrContext)
  const initializedVar = initialized || isServer()

  return {
    initialized: initializedVar,
    keycloak: authClient as T | undefined,
  }
}
