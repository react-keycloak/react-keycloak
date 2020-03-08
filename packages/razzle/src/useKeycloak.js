import { useContext } from 'react'

import { KeycloakContext, KeycloakStubContext } from './internals/context'
import { isServer } from './internals/utils'

function useKeycloak() {
  const keycloakStub = useContext(KeycloakStubContext)
  const { initialized, keycloak } = useContext(KeycloakContext)

  const isServerCheck = isServer()
  const kcInstance = !initialized || isServerCheck ? keycloakStub : keycloak
  const kcInitialized = initialized || isServerCheck

  return Object.assign([kcInstance, kcInitialized, isServerCheck], {
    initialized: kcInitialized,
    isServer: isServerCheck,
    keycloak: kcInstance
  })
}

export default useKeycloak
