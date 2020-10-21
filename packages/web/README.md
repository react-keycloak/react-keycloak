![React Keycloak](/art/react-keycloak-logo.png?raw=true 'React Keycloak Logo')

# React Keycloak <!-- omit in toc -->

> React bindings for [Keycloak](https://www.keycloak.org/)

[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/web?label=npm%20%7C%20web)](https://www.npmjs.com/package/@react-keycloak/web)

[![License](https://img.shields.io/github/license/react-keycloak/react-keycloak.svg)](https://github.com/react-keycloak/react-keycloak/blob/master/LICENSE.md)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![GitHub contributors](https://img.shields.io/github/contributors/react-keycloak/react-keycloak)](https://github.com/react-keycloak/react-keycloak/graphs/contributors)
[![Github Issues](https://img.shields.io/github/issues/react-keycloak/react-keycloak.svg)](https://github.com/react-keycloak/react-keycloak/issues)

[![Gitter](https://img.shields.io/gitter/room/react-keycloak/community)](https://gitter.im/react-keycloak/community)

---

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Getting Started](#getting-started)
  - [Setup Keycloak instance](#setup-keycloak-instance)
  - [Setup KeycloakProvider](#setup-keycloakprovider)
  - [Hook Usage](#hook-usage)
  - [External Usage (Advanced)](#external-usage-advanced)
- [Examples](#examples)
- [Guides and Articles](#guides-and-articles)
- [Contributing](#contributing)
- [License](#license)

---

## Install

React Keycloak requires:

- React **16.8** or later
- `keycloak-js` **9.0.2** or later

```shell
yarn add @react-keycloak/web
```

or

```shell
npm install --save @react-keycloak/web
```

## Getting Started

### Setup Keycloak instance

Create a `keycloak.js` file in the `src` folder of your project (where `App.js` is located) with the following content

```js
import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak()

export default keycloak
```

### Setup KeycloakProvider

Wrap your App inside `ReactKeycloakProvider` and pass the `keycloak` instance as prop

```js
import { ReactKeycloakProvider } from '@react-keycloak/web'

import keycloak from './keycloak'

// Wrap everything inside KeycloakProvider
const App = () => {
  return <ReactKeycloakProvider authClient={keycloak}>...</ReactKeycloakProvider>
}
```

**N.B.** If your using other providers (such as `react-redux`) it is recommended to place them inside `ReactKeycloakProvider`.

`ReactKeycloakProvider` automatically invokes `keycloak.init()` method when needed and supports the following props:

- `initOptions`, contains the object to be passed to `keycloak.init()` method, by default the following is used

      {
        onLoad: 'check-sso',
      }

  for more options see [Keycloak docs](https://www.keycloak.org/docs/latest/securing_apps/index.html#init-options).

- `LoadingComponent`, a component to be displayed while `keycloak` is being initialized, if not provided child components will be rendered immediately. Defaults to `null`

- `isLoadingCheck`, an optional loading check function to customize LoadingComponent display condition. Return `true` to display LoadingComponent, `false` to hide it.

  Can be implemented as follow

  ```js
  ;(keycloak) => !keycloak.authenticated
  ```

- `onEvent`, an handler function that receives events launched by `keycloak`, defaults to `null`.

  It can be implemented as follow

  ```js
  ;(event, error) => {
    console.log('onKeycloakEvent', event, error)
  }
  ```

  Published events are:

  - `onReady`
  - `onInitError`
  - `onAuthSuccess`
  - `onAuthError`
  - `onAuthRefreshSuccess`
  - `onAuthRefreshError`
  - `onTokenExpired`
  - `onAuthLogout`

- `onTokens`, an handler function that receives `keycloak` tokens as an object every time they change, defaults to `null`.

  Keycloak tokens are returned as follow

  ```json
  {
    "idToken": string,
    "refreshToken": string,
    "token": string
  }
  ```

### Hook Usage

When a component requires access to `Keycloak`, you can use the `useKeycloak` Hook.

```js
import { useKeycloak } from '@react-keycloak/web'

export default () => {
  // Using Object destructuring
  const { keycloak, initialized } = useKeycloak()

  // Here you can access all of keycloak methods and variables.
  // See https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference

  return (
    <div>
      <div>{`User is ${
        !keycloak.authenticated ? 'NOT ' : ''
      }authenticated`}</div>

      {!!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}
    </div>
  )
}
```

### External Usage (Advanced)

If you need to access `keycloak` instance from non-`React` files (such as `sagas`, `utils`, `providers` ...), you can import the instance directly from the `keycloak.js` file.

The instance will be initialized by `react-keycloak` but you'll need to be carefull when using the instance and avoid setting/overriding any props, you can however freely access the exposed methods (such as `refreshToken`, `login`, etc...).

## Examples

See inside `examples` folder of [`@react-keycloak/react-keycloak-examples`](https://github.com/react-keycloak/react-keycloak-examples) repository for various demo implementing this library main features.

## Guides and Articles

- Migration guide for `@react-keycloak/web` `v2.x to v3.x` can be found here [MIGRATION.md](https://github.com/react-keycloak/react-keycloak/blob/master/packages/web/MIGRATION.md).

- [Secure React Routes & Component with Keycloak](https://medium.com/@cagline/authenticate-and-authorize-react-routes-component-with-keycloak-666e85662636), a (slightly outdated) guide on how to setup `Keycloak` and create secured contents in a `React` app, thanks to [@cagline](https://github.com/cagline) for the detailed article.

## Contributing

See the [contributing guide](https://github.com/react-keycloak/react-keycloak/blob/master/CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

If you found this project to be helpful, please consider buying me a coffee.

[![buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/4f18nT0Nk)
