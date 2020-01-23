import { useContext } from 'react'

import { KeycloakContext } from './internals/keycloak'
import { ServerContext } from './internals/serverProvider'

function useKeycloak() {
  const { isServer, isAuthenticated: serverAuth } = useContext(ServerContext)
  const { initialized, keycloak } = useContext(KeycloakContext)

  // either the client (keycloak.authenticated) or the server (isAuthenticated cookie) has to assert that the user is logged in
  const isAuthenticated =
    keycloak?.authenticated ||
    ((isServer || !keycloak?.subject) && serverAuth === 'true')

  return Object.assign([keycloak, initialized, isAuthenticated], {
    initialized,
    keycloak,
    isAuthenticated
  })
}

export default useKeycloak
