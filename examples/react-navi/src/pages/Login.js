import React from 'react'
import { route } from 'navi'
import { withKeycloak } from '@react-keycloak/web'

const LoginPage = withKeycloak(({ keycloak }) => {
  return (
    <div>
      <button type="button" onClick={() => keycloak.login()}>
        Login
      </button>
    </div>
  )
})

export default route({
  title: 'Login',
  view: <LoginPage />,
})
