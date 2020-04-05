![React Keycloak](/art/react-keycloak-logo.png?raw=true 'React Keycloak Logo')

# React Keycloak <!-- omit in toc -->

> [NextJS](https://nextjs.org) bindings for [Keycloak](https://www.keycloak.org/)

[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/nextjs?label=npm%20%7C%20nextjs)](https://www.npmjs.com/package/@react-keycloak/nextjs)

[![License](https://img.shields.io/github/license/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak/blob/master/LICENSE.md)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Contributors](https://img.shields.io/badge/contributors-2-orange.svg)](#contributors)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Dependencies](https://img.shields.io/david/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak)
[![Build Status](https://travis-ci.com/panz3r/react-keycloak.svg?branch=master)](https://travis-ci.com/panz3r/react-keycloak)
[![Coverage Status](https://coveralls.io/repos/github/panz3r/react-keycloak/badge.svg?branch=master)](https://coveralls.io/github/panz3r/react-keycloak?branch=master)
[![Github Issues](https://img.shields.io/github/issues/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak/issues)

---

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Getting Started](#getting-started)
  - [Setup NextApp](#setup-nextapp)
  - [HOC Usage](#hoc-usage)
  - [Hook Usage](#hook-usage)
- [Examples](#examples)
- [Other Resources](#other-resources)
  - [Securing NextJS API](#securing-nextjs-api)
- [Contributors](#contributors)

---

## Install

React Keycloak requires:

- React **16.0** or later
- NextJS **9** or later
- `keycloak-js` **8.0.1** or later

```
yarn add @react-keycloak/nextjs
```

or

```
npm install --save @react-keycloak/nextjs
```

## Getting Started

### Setup NextApp

Create the `_app.tsx` file under `pages` folder and wrap your App inside `SSRKeycloakProvider` component and pass `keycloakConfig` and a `TokenPersistor`.

**Note:** `@react-keycloak/nextjs` provides a default `TokenPersistor` which works with `cookies` (exported as `Persistors.Cookies`). The following examples will be based on that.

```tsx
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
```

`SSRKeycloakProvider` also accepts all the properties of [`KeycloakProvider`](https://github.com/panz3r/react-keycloak/blob/master/packages/web/README.md#setup-keycloakprovider).

### HOC Usage

When a page requires access to `Keycloak`, wrap it inside the `withKeycloak` HOC.

**Note:** When running server-side not all properties and method of the `keycloak` instance might be available (`token`, `idToken` and `refreshToken` are available if persisted and `authenticated` is set accordingly).

```tsx
import { withKeycloak } from '@react-keycloak/nextjs'

const IndexPage: NextPage = ({ keycloak }) => {
  const loggedinState = keycloak?.authenticated ? (
    <span className="text-success">logged in</span>
  ) : (
    <span className="text-danger">not logged in</span>
  )

  const welcomeMessage = keycloak
    ? `Welcome back user!`
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
}

export default withKeycloak(IndexPage)
```

### Hook Usage

Alternately, when a component requires access to `Keycloak`, you can also use the `useKeycloak` Hook.

## Examples

See inside `examples/nextjs-app` for a sample implementation.

## Other Resources

### Securing NextJS API

Whilst `@react-keycloak/nextjs` can help you secure the Frontend part of a `NextJS` app if you also want to secure `NextJS`-exposed APIs you can follow the sample in [this issue](https://github.com/panz3r/react-keycloak/issues/44#issuecomment-579877959).

Thanks to [@webdeb](https://github.com/webdeb) for reporting the issue and helping develop a solution.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://panz3r.dev"><img src="https://avatars3.githubusercontent.com/u/1754457?v=4" width="100px;" alt=""/><br /><sub><b>Mattia Panzeri</b></sub></a><br /><a href="#ideas-panz3r" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/panz3r/react-keycloak/commits?author=panz3r" title="Code">💻</a> <a href="https://github.com/panz3r/react-keycloak/commits?author=panz3r" title="Documentation">📖</a> <a href="https://github.com/panz3r/react-keycloak/issues?q=author%3Apanz3r" title="Bug reports">🐛</a> <a href="#maintenance-panz3r" title="Maintenance">🚧</a> <a href="#platform-panz3r" title="Packaging/porting to new platform">📦</a> <a href="#question-panz3r" title="Answering Questions">💬</a> <a href="https://github.com/panz3r/react-keycloak/pulls?q=is%3Apr+reviewed-by%3Apanz3r" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/panz3r/react-keycloak/commits?author=panz3r" title="Tests">⚠️</a> <a href="#example-panz3r" title="Examples">💡</a></td>
    <td align="center"><a href="https://ac-systems.be/"><img src="https://avatars0.githubusercontent.com/u/9079379?v=4" width="100px;" alt=""/><br /><sub><b>JannesD</b></sub></a><br /><a href="https://github.com/panz3r/react-keycloak/issues?q=author%3Ajannes-io" title="Bug reports">🐛</a> <a href="https://github.com/panz3r/react-keycloak/commits?author=jannes-io" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

If you found this project to be helpful, please consider buying me a coffee.

[![buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/4f18nT0Nk)
