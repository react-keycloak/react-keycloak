![React Keycloak](/art/react-keycloak-logo.png?raw=true 'React Keycloak Logo')

# React Keycloak <!-- omit in toc -->

> SSR bindings for [Keycloak](https://www.keycloak.org/)

[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/ssr?label=npm%20%7C%20ssr)](https://www.npmjs.com/package/@react-keycloak/ssr)

[![License](https://img.shields.io/github/license/react-keycloak/react-keycloak.svg)](https://github.com/react-keycloak/react-keycloak/blob/master/LICENSE.md)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![GitHub contributors](https://img.shields.io/github/contributors/react-keycloak/react-keycloak)](https://github.com/react-keycloak/react-keycloak/graphs/contributors)
[![Github Issues](https://img.shields.io/github/issues/react-keycloak/react-keycloak.svg)](https://github.com/react-keycloak/react-keycloak/issues)

[![Gitter](https://img.shields.io/gitter/room/react-keycloak/community)](https://gitter.im/react-keycloak/community)

---

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Support](#support)
- [Getting Started](#getting-started)
  - [Setup](#setup)
  - [HOC Usage](#hoc-usage)
  - [Hook Usage](#hook-usage)
- [Examples](#examples)
- [Other Resources](#other-resources)
  - [Securing NextJS API](#securing-nextjs-api)
  - [External Usage (Advanced)](#external-usage-advanced)
- [Contributing](#contributing)
- [License](#license)

---

## Install

React Keycloak requires:

- React **16.0** or later
- `keycloak-js` **9.0.2** or later

```shell
yarn add @react-keycloak/ssr
```

or

```shell
npm install --save @react-keycloak/ssr
```

## Support

| version | keycloak-js version |
| ------- | ------------------- |
| v1.0.0+ | 9.0.2+              |

## Getting Started

This module has been created to support `NextJS` and `Razzle`, other SSR frameworks might be working as well.

### Setup

Follow the guide related to your SSR Framework and note that `SSRKeycloakProvider` also accepts all the properties of [`KeycloakProvider`](https://github.com/react-keycloak/react-keycloak/blob/master/packages/web/README.md#setup-keycloakprovider).

#### NextJS

Requires NextJS **9** or later

Create the `_app.tsx` file under `pages` folder and wrap your App inside `SSRKeycloakProvider` component and pass `keycloakConfig` and a `TokenPersistor`.

**Note:** `@react-keycloak/ssr` provides a default `TokenPersistor` which works with `cookies` (exported as `ServerPersistors.SSRCookies`).

The following examples will be based on that.

```tsx
import cookie from 'cookie'
import * as React from 'react'
import type { IncomingMessage } from 'http'
import type { AppProps, AppContext } from 'next/app'

import { SSRKeycloakProvider, ServerPersistors } from '@react-keycloak/ssr'
import type { KeycloakCookies } from  '@react-keycloak/ssr'

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
      persistor={ServerPersistors.SSRCookies(cookies)}
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

#### Razzle

Requires `Razzle` **3** or later

> **N.B:** This setup requires you to install [`cookie-parser`](https://github.com/expressjs/cookie-parser) middleware.

Edit your app `server.js` as follow

```js
...

import { ServerPersistors, SSRKeycloakProvider } from '@react-keycloak/ssr'

// Create a function to retrieve Keycloak configuration parameters -- 'see examples/razzle-app'
import { getKeycloakConfig } from './utils'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cookieParser()) // 1. Add cookieParser Express middleware
  .get('/*', (req, res) => {
    const context = {}

    // 2. Create an instance of ServerPersistors.ExpressCookies passing the current request
    const cookiePersistor = ServerPersistors.ExpressCookies(req)

    // 3. Wrap the App inside SSRKeycloakProvider
    const markup = renderToString(
      <SSRKeycloakProvider
        keycloakConfig={getKeycloakConfig()}
        persistor={cookiePersistor}
      >
        <StaticRouter context={context} location={req.url}>
          <App />
        </StaticRouter>
      </SSRKeycloakProvider>
    )
    ...
  })

...
```

Edit your `client.js` as follow

```js
import { ClientPersistors, SSRKeycloakProvider } from '@react-keycloak/ssr'

// Create a function to retrieve Keycloak configuration parameters -- 'see examples/razzle-app'
import { getKeycloakConfig } from './utils'

// 1. Wrap the App inside SSRKeycloakProvider
hydrate(
  <SSRKeycloakProvider
    keycloakConfig={getKeycloakConfig()}
    persistor={ClientPersistors.Cookies}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SSRKeycloakProvider>,
  document.getElementById('root')
)
...
```

### HOC Usage

When a page requires access to `Keycloak`, wrap it inside the `withKeycloak` HOC.

**Note:** When running server-side not all properties and method of the `keycloak` instance might be available (`token`, `idToken` and `refreshToken` are available if persisted and `authenticated` is set accordingly).

```tsx
import { withKeycloak } from '@react-keycloak/ssr'

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

See inside `examples/nextjs-app` and `examples/razzle-app` folders of [`@react-keycloak/react-keycloak-examples`](https://github.com/react-keycloak/react-keycloak-examples) repository for sample implementations.

## Other Resources

### Securing NextJS API

Whilst `@react-keycloak/ssr` can help you secure the Frontend part of a `NextJS` app if you also want to secure `NextJS`-exposed APIs you can follow the sample in [this issue](https://github.com/react-keycloak/react-keycloak/issues/44#issuecomment-579877959).

Thanks to [@webdeb](https://github.com/webdeb) for reporting the issue and helping develop a solution.

### External Usage (Advanced)

If you need to access `keycloak` instance from non-`React` files (such as `sagas`, `utils`, `providers` ...), you can retrieve the instance using the exported `getKeycloakInstance()` method.

The instance will be initialized by `react-keycloak` but you'll need to be carefull when using the instance, expecially server-side, and avoid setting/overriding any props, you can however freely access the exposed methods (such as `refreshToken`, `login`, etc...).

**Note:** This approach is NOT recommended on the server-side because can lead to `token leakage` issues (see [this issue](https://github.com/react-keycloak/react-keycloak/issues/65) for more details).

Thanks to [@webdeb](https://github.com/webdeb) for requesting this feature and helping develop and test the solution.

## Contributing

See the [contributing guide](https://github.com/react-keycloak/react-keycloak/blob/master/CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

If you found this project to be helpful, please consider buying me a coffee.

[![buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/4f18nT0Nk)
