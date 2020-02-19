![React Keycloak](/art/react-keycloak-logo.png?raw=true "React Keycloak Logo")

# React Keycloak <!-- omit in toc -->

> React bindings for [Keycloak](https://www.keycloak.org/)

[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/web?label=npm%20%7C%20web)](https://www.npmjs.com/package/@react-keycloak/web)

[![License](https://img.shields.io/github/license/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak/blob/master/LICENSE.md)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Contributors](https://img.shields.io/badge/contributors-2-orange.svg)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Dependencies](https://img.shields.io/david/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak)
[![Build Status](https://travis-ci.com/panz3r/react-keycloak.svg?branch=master)](https://travis-ci.com/panz3r/react-keycloak)
[![Coverage Status](https://coveralls.io/repos/github/panz3r/react-keycloak/badge.svg?branch=master)](https://coveralls.io/github/panz3r/react-keycloak?branch=master)
[![Github Issues](https://img.shields.io/github/issues/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak/issues)

----

## Table of Contents <!-- omit in toc -->
- [Install](#install)
- [Getting Started](#getting-started)
  - [Setup Keycloak instance](#setup-keycloak-instance)
  - [Setup KeycloakProvider](#setup-keycloakprovider)
  - [HOC Usage](#hoc-usage)
  - [Hook Usage (React >=16.8 required)](#hook-usage-react-168-required)
  - [External Usage (Advanced)](#external-usage-advanced)
- [Examples](#examples)
- [Contributors](#contributors)

----

## Install

React Keycloak requires:

- React **16.0** or later
- `keycloak-js` **8.0.1** or later

```
yarn add @react-keycloak/web
```

or

```
npm install --save @react-keycloak/web
```

## Getting Started

### Setup Keycloak instance

Create a `keycloak.js` file in the `src` folder of your project (where `App.js` is located) with the following content
```js
import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak();

export default keycloak;
```

### Setup KeycloakProvider

Wrap your App inside `KeycloakProvider` and pass the `keycloak` instance as prop

```js
import { KeycloakProvider } from '@react-keycloak/web';

import keycloak from './keycloak';

// Wrap everything inside KeycloakProvider
const App = () => {
  return <KeycloakProvider keycloak={keycloak}>...</KeycloakProvider>;
};
```

**N.B.** If your using other providers (such as `react-redux`) it is recommended to place them inside `KeycloakProvider`.

`KeycloakProvider` automatically invokes `keycloak.init()` method when needed and supports the following props:

- `initConfig`, contains the object to be passed to `keycloak.init()` method, by default the following is used

      {
        onLoad: 'check-sso',
        promiseType: 'native',
      }

  for more options see [Keycloak docs](https://www.keycloak.org/docs/latest/securing_apps/index.html#init-options).

- `LoadingComponent`, a component to be displayed while `keycloak` is being initialized, if not provided child components will be rendered immediately. Defaults to `null`

- `isLoadingCheck`, an optional loading check function to customize LoadingComponent display condition. Return `true` to display LoadingComponent, `false` to hide it.

  Can be implemented as follow
  ```js
    keycloak => !keycloak.authenticated;
  ```

- `onEvent`, an handler function that receives events launched by `keycloak`, defaults to `null`.

  It can be implemented as follow
  ```js
    (event, error) => {
      console.log('onKeycloakEvent', event, error);
    }
  ```
  Published events are:
    - `onReady`
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
    "token": string,
  }
  ```

### HOC Usage

When a component requires access to `Keycloak`, wrap it inside the `withKeycloak` HOC.

```js
import { withKeycloak } from '@react-keycloak/web';

const LoginPage = ({ keycloak, keycloakInitialized }) => {
  // Here you can access all of keycloak methods and variables.
  // See https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference
  return (
    <div>
      <button type="button" onClick={() => keycloak.login()}>
        Login
      </button>
    </div>
  );
};

export default withKeycloak(LoginPage);
```

### Hook Usage (React >=16.8 required)

Alternately, when a component requires access to `Keycloak`, you can also use the `useKeycloak` Hook.

```js
import { useKeycloak } from '@react-keycloak/web';

export default () => {
  // Using array destructuring
  const [keycloak, initialized] = useKeycloak();
  // or Object destructuring
  const { keycloak, initialized } = useKeycloak();

  // Here you can access all of keycloak methods and variables.
  // See https://www.keycloak.org/docs/latest/securing_apps/index.html#javascript-adapter-reference

  return (
    <div>
      <div>{`User is ${!keycloak.authenticated ? 'NOT ' : ''}authenticated`}</div>

      {!!keycloak.authenticated && (
        <button type="button" onClick={() => keycloak.logout()}>
          Logout
        </button>
      )}
    </div>
  );
};
```

### External Usage (Advanced)

If you need to access `keycloak` instance from non-`React` files (such as `sagas`, `utils`, `providers` ...), you can import the instance directly from the `keycloak.js` file.

The instance will be initialized by `react-keycloak` but you'll need to be carefull when using the instance and avoid setting/overriding any props, you can however freely access the exposed methods (such as `refreshToken`, `login`, etc...).

## Examples

See inside `examples` for various demo implementing this library main features.

**Note:** The demo apps are not meant to be **production-ready** nor **starter-kit** s but just a way to show this module components and their usage.

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
