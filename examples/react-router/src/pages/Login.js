import React, { useCallback } from 'react'
import { Redirect, withRouter } from 'react-router-dom'

import { withKeycloak } from '@react-keycloak/web'

const LoginPage = withRouter(
  withKeycloak(({ keycloak, location }) => {
    const { from } = location.state || { from: { pathname: '/home' } }
    if (keycloak.authenticated) return <Redirect to={from} />

    const login = useCallback(() => {
      keycloak.login()
    }, [keycloak])

    return (
      <div>
        <button type="button" onClick={login}>
          Login
        </button>
      </div>
    )
  })
)

export default LoginPage
