![React Keycloak](/art/react-keycloak-logo.png?raw=true 'React Keycloak Logo')

# React Keycloak <!-- omit in toc -->

> [Razzle](https://github.com/jaredpalmer/razzle) bindings for [Keycloak](https://www.keycloak.org/)

[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/razzle?label=npm%20%7C%20razzle)](https://www.npmjs.com/package/@react-keycloak/razzle)

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
- [Support](#support)
- [Getting Started](#getting-started)
  - [Setup Razzle App](#setup-razzle-app)
  - [HOC Usage](#hoc-usage)
  - [Hook Usage](#hook-usage)
- [Examples](#examples)
- [Contributors](#contributors)

---

## Install

React Keycloak requires:

- React **16.0** or later
- razzle **3** or later
- `keycloak-js` **9.0.2** or later

```shell
yarn add @react-keycloak/razzle
```

or

```shell
npm install --save @react-keycloak/razzle
```

## Support

| version | keycloak-js version |
| ------- | ------------------- |
| v2.0.0+ | 9.0.2+              |
| v1.x    | >=8.0.2 <9.0.2      |

## Getting Started

### Setup Razzle App

> **N.B:** This setup requires you to install [`cookie-parser`](https://github.com/expressjs/cookie-parser) middleware.

Edit your app `server.js` as follow

```js
...

import { ServerPersistors, SSRKeycloakProvider } from '@react-keycloak/razzle'

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
import { ClientPersistors, SSRKeycloakProvider } from '@react-keycloak/razzle'

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

```jsx
...

import { withKeycloak } from '@react-keycloak/razzle'

const Home = ({ keycloak, keycloakInitialized: initialized, isServer }) => {
  console.log('Is running on server:', isServer)
  console.log('Keycloak is initialized:', initialized)

  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to Razzle</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/App.js</code> or <code>src/Home.js</code>
        and save to reload.
      </p>

      <div>
        {!keycloak.authenticated ? (
          <button onClick={() => keycloak.login()}>Login</button>
        ) : (
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </div>

      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
    </div>
  )
}

export default withKeycloak(Home)
```

### Hook Usage

Alternately, when a component requires access to `Keycloak`, you can also use the `useKeycloak` Hook.

```jsx
...

import { useKeycloak } from '@react-keycloak/razzle'

const Home = () => {
  const [keycloak, initialized, isServer] = useKeycloak()
  console.log('Is running on server:', isServer)
  console.log('Keycloak is initialized:', initialized)

  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to Razzle</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/App.js</code> or <code>src/Home.js</code>
        and save to reload.
      </p>

      <div>
        {!keycloak.authenticated ? (
          <button onClick={() => keycloak.login()}>Login</button>
        ) : (
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </div>

      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
    </div>
  )
}

export default Home
```

## Examples

See inside `examples/razzle-app` for a sample implementation.

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
