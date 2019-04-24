# React Keycloak

> React bindings for [Keycloak](https://www.keycloak.org/)

[![License](https://img.shields.io/github/license/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak/blob/master/LICENSE.md)
[![Build Status](https://travis-ci.com/panz3r/react-keycloak.svg?branch=master)](https://travis-ci.com/panz3r/react-keycloak)
[![NPM version](https://img.shields.io/npm/v/react-keycloak.svg)](https://www.npmjs.com/package/react-keycloak)

[![Dependencies](https://img.shields.io/david/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak)
[![Github Issues](https://img.shields.io/github/issues/panz3r/react-keycloak.svg)](https://github.com/panz3r/react-keycloak/issues)

## Install

React Keycloak requires:

- React **16.0** or later
- a version of `keycloak-js` matching the major version (e.g. `"react-keycloak": "5.x.y"` => `"keycloak-js": "5.x.y"`)

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
        onLoad: 'check-sso'
      }

  for more options see [Keycloak docs](https://www.keycloak.org/docs/latest/securing_apps/index.html#init-options).

- `LoadingComponent`, a component to be displayed while `keycloak` is being initialized, if not provided child components will be rendered immediately. Defaults to `null`

- `onError`, an handler function that receives errors launched by `keycloak`, defaults to `null`.

- `onToken`, an handler function that receives `keycloak` token every time it changes, defaults to `null`.

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

## Credits

Library bootstrapped using [DimiMikadze/create-react-library](https://github.com/DimiMikadze/create-react-library) and inspired by [react-redux](https://github.com/reduxjs/react-redux)

---

Made with :sparkles: & :heart: by [Mattia Panzeri](https://github.com/panz3r) and [contributors](https://github.com/panz3r/react-keycloak/graphs/contributors)

If you found this project to be helpful, please consider buying me a coffee.

[![buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/white_img.png)](https://buymeacoff.ee/4f18nT0Nk)
