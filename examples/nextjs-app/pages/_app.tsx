import React from 'react'
import App from 'next/app'

import { appWithKeycloak } from '@react-keycloak/nextjs'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default appWithKeycloak({
  realm: process.env.KEYCLOAK_REALM as string,
  url: process.env.KEYCLOAK_URL as string,
  clientId: process.env.KEYCLOAK_CLIENT_ID as string
})(MyApp)
