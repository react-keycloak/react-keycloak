import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'

import { SSRKeycloakProvider, Persistors } from '@react-keycloak/nextjs'
import type { KeycloakCookies } from  '@react-keycloak/nextjs'

const keycloakCfg = {
  realm: '',
  url: '',
  clientId: ''
}

interface InitialProps {
  cookies: KeycloakCookies
}

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  return (
    <SSRKeycloakProvider
      keycloakConfig={keycloakCfg}
      persistor={Persistors.Cookies(cookies)}
    >
      <Component {...pageProps} />
    </SSRKeycloakProvider>
  )
}

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {}
  }
  return cookie.parse(req.headers.cookie || '')
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  return {
    cookies: parseCookies(context?.ctx?.req)
  }
}

export default MyApp
