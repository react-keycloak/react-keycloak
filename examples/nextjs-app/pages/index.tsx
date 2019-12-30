import * as React from 'react'
import { KeycloakTokenParsed } from 'keycloak-js'
import { NextPage } from 'next'

import { withKeycloak } from '@react-keycloak/nextjs'

import { Layout } from '../components/Layout'

type ParsedToken = KeycloakTokenParsed & {
  email?: string
  preferred_username?: string
  name?: string
  given_name?: string
  family_name?: string
}

const IndexPage: NextPage = withKeycloak(({ keycloak }) => {
  const loggedinState = keycloak?.authenticated ? (
    <span className="text-success">logged in</span>
  ) : (
    <span className="text-danger">not logged in</span>
  )

  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed
  const welcomeMessage =
    keycloak && parsedToken
      ? `Welcome back ${parsedToken?.name ?? ''}!`
      : 'Welcome visitor. Please login to continue.'

  return (
    <Layout title="Home | Next.js + Keycloak Example">
      <h1 className="mt-5">Hello Next.js + Keycloak 👋</h1>
      <div className="mb-5 lead text-muted">
        This is an example of a Next.js site using Keycloak.
      </div>

      <p>You are: {loggedinState}</p>
      <p>{welcomeMessage}</p>
    </Layout>
  )
})

export default IndexPage
