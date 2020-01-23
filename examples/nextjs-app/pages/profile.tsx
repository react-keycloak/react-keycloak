import * as React from 'react'
import { NextPage } from 'next'
import { KeycloakTokenParsed } from 'keycloak-js'

import { withKeycloak } from '@react-keycloak/nextjs'

import { Layout } from '../components/Layout'

type ParsedToken = KeycloakTokenParsed & {
  email?: string
  preferred_username?: string
  given_name?: string
  family_name?: string
}

const ProfilePage: NextPage = withKeycloak(({ keycloak }) => {
  const parsedToken: ParsedToken | undefined = keycloak?.tokenParsed

  const profile = keycloak?.authenticated ? (
    <ul>
      <li>
        <span className="font-weight-bold mr-1">Email:</span>
        <span className="text-muted">{parsedToken?.email ?? ''}</span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">Username:</span>
        <span className="text-muted">
          {parsedToken?.preferred_username ?? ''}
        </span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">First Name:</span>
        <span className="text-muted">{parsedToken?.given_name ?? ''}</span>
      </li>
      <li>
        <span className="font-weight-bold mr-1">Last Name:</span>
        <span className="text-muted">{parsedToken?.family_name ?? ''}</span>
      </li>
    </ul>
  ) : (
    <span>Please login to view profile.</span>
  )

  return (
    <Layout title="Profile | Next.js + Keycloak Example">
      <h1 className="my-5">User Profile</h1>
      {profile}
    </Layout>
  )
})

export default ProfilePage
