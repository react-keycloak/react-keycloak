![React Keycloak](/art/react-keycloak-logo.png?raw=true "React Keycloak Logo")

# React Keycloak

> React bindings for [Keycloak](https://www.keycloak.org/)

[![License](https://img.shields.io/github/license/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak/blob/master/LICENSE.md)
[![NPM version](https://img.shields.io/npm/v/react-keycloak.svg)](https://www.npmjs.com/package/react-keycloak)

[![Dependencies](https://img.shields.io/david/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak)
[![Github Issues](https://img.shields.io/github/issues/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak/issues)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Contributors](https://img.shields.io/badge/contributors-1-orange.svg)](#contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

## Install

React Keycloak requires:

- React **16.0** or later
- a version of `keycloak-js` matching the main version (e.g. `"react-keycloak": "8.0.1"` => `"keycloak-js": "8.0.1-yymmdd"`)

```
yarn add react-keycloak
```

or

```
npm install --save react-keycloak
```

## Getting Started

### Setup KeycloakProvider

Wrap your App inside `KeycloakProvider` and pass a `keycloak` instance as prop

```js
import Keycloak from 'keycloak-js';
import { KeycloakProvider } from 'react-keycloak';

// Setup Keycloak instance as needed
const keycloak = new Keycloak();

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
import { withKeycloak } from 'react-keycloak';

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
import { useKeycloak } from 'react-keycloak';

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

## Demo

See inside `src/demo` for a demo implementing this library main features.

To run the demo app:
- Clone/Download this repo
- Install dependencies (`npm install` or `yarn`)
- Place a valid `keycloak.json` file inside `public` folder or setup `Keycloak` instance inside `src/demo/App.js` following [Keycloak guide](https://www.keycloak.org/docs/latest/securing_apps/index.html#_javascript_adapter)
- Run the demo (`npm start` or `yarn start`)

**Note:** The demo app is not meant to be **production-ready** nor a **starter-kit** but just a way to show this module components and their usage.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://panz3r.dev"><img src="https://avatars3.githubusercontent.com/u/1754457?v=4" width="100px;" alt=""/><br /><sub><b>Mattia Panzeri</b></sub></a><br /><a href="#ideas-panz3r" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/panz3r/react-keycloak/commits?author=panz3r" title="Code">💻</a> <a href="https://github.com/panz3r/react-keycloak/commits?author=panz3r" title="Documentation">📖</a> <a href="https://github.com/panz3r/react-keycloak/issues?q=author%3Apanz3r" title="Bug reports">🐛</a> <a href="#maintenance-panz3r" title="Maintenance">🚧</a> <a href="#platform-panz3r" title="Packaging/porting to new platform">📦</a> <a href="#question-panz3r" title="Answering Questions">💬</a> <a href="https://github.com/panz3r/react-keycloak/pulls?q=is%3Apr+reviewed-by%3Apanz3r" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/panz3r/react-keycloak/commits?author=panz3r" title="Tests">⚠️</a> <a href="#example-panz3r" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

If you found this project to be helpful, please consider buying me a coffee.

[![buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/4f18nT0Nk)
