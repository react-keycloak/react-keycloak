import React from 'react'
import Link from 'next/link'

import { withKeycloak } from '@react-keycloak/nextjs'

export const Header = withKeycloak(({ keycloak }) => {
  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <Link href="/">
        <a className="my-0 mr-md-auto font-weight-bold text-dark">
          Next.js + Keycloak
        </a>
      </Link>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link href="/profile">
          <a className="p-2 text-dark">Profile</a>
        </Link>
      </nav>
      {keycloak.authenticated ? (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createAccountUrl()
              }
            }}
          >
            My Account
          </button>

          <button
            type="button"
            className="mx-2 btn btn-outline-danger"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLogoutUrl()
              }
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="mx-2 btn btn-outline-primary"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createRegisterUrl()
              }
            }}
          >
            Signup
          </button>

          <button
            type="button"
            className="mx-2 btn btn-outline-success"
            onClick={() => {
              if (keycloak) {
                window.location.href = keycloak.createLoginUrl()
              }
            }}
          >
            Login
          </button>
        </>
      )}
    </header>
  )
})
