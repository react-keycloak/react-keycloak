![React Keycloak](/art/react-keycloak-logo.png?raw=true 'React Keycloak Logo')

# React Keycloak <!-- omit in toc -->

> React bindings for [Keycloak](https://www.keycloak.org/)

[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/core?label=npm%20%7C%20core)](https://www.npmjs.com/package/@react-keycloak/core)
[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/web?label=npm%20%7C%20web)](https://www.npmjs.com/package/@react-keycloak/web)
[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/ssr?label=npm%20%7C%20ssr)](https://www.npmjs.com/package/@react-keycloak/ssr)
[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/native?label=npm%20%7C%20native)](https://www.npmjs.com/package/@react-keycloak/native)

[![License](https://img.shields.io/github/license/react-keycloak/react-keycloak.svg)](https://github.com/react-keycloak/react-keycloak/blob/master/LICENSE.md)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![GitHub contributors](https://img.shields.io/github/contributors/react-keycloak/react-keycloak)](https://github.com/react-keycloak/react-keycloak/graphs/contributors)
[![Github Issues](https://img.shields.io/github/issues/react-keycloak/react-keycloak.svg)](https://github.com/react-keycloak/react-keycloak/issues) ![npm](https://img.shields.io/npm/dm/@react-keycloak/core)

[![Gitter](https://img.shields.io/gitter/room/react-keycloak/community)](https://gitter.im/react-keycloak/community)

---

## Table of Contents <!-- omit in toc -->

- [Integrations](#integrations)
  - [React](#react)
  - [SSR](#ssr)
  - [React Native](#react-native)
- [Support](#support)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

---

## Integrations

### React

React Keycloak for Web requires:

- React **16.0** or later
- `keycloak-js` **9.0.2** or later

```shell
yarn add @react-keycloak/web
```

or

```shell
npm install --save @react-keycloak/web
```

or as a `UMD` package through `unpkg`

- one for development: https://unpkg.com/@react-keycloak/web@latest/dist/umd/react-keycloak-web.js

- one for production: https://unpkg.com/@react-keycloak/web@latest/dist/umd/react-keycloak-web.min.js

See `@react-keycloak/web` package [README](https://github.com/react-keycloak/react-keycloak/blob/master/packages/web/README.md) for complete documentation.

### SSR

React Keycloak for SSR frameworks requires:

- React **16.0** or later
- SSR Framework:
  - NextJS **9** or later
  - Razzle **3** or later
- `keycloak-js` **9.0.2** or later

```shell
yarn add @react-keycloak/ssr
```

or

```shell
npm install --save @react-keycloak/ssr
```

See `@react-keycloak/ssr` package [README](https://github.com/react-keycloak/react-keycloak/blob/master/packages/ssr/README.md) for complete documentation.

### React Native

React Keycloak for React Native requires React Native **61.0** or later

To install run

```shell
yarn add @react-keycloak/native
```

or

```shell
npm install --save @react-keycloak/native
```

See `@react-keycloak/native` package [README](https://github.com/react-keycloak/react-native-keycloak/blob/master/README.md) for complete documentation.

## Support

| version | keycloak-js version |
| ------- | ------------------- |
| v2.0.0+ | 9.0.2+              |
| v1.x    | >=8.0.2 <9.0.2      |

## Examples

See [`@react-keycloak/react-keycloak-examples`](https://github.com/react-keycloak/react-keycloak-examples) repository for various demo implementing this library main features.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

If you found this project to be helpful, please consider buying me a coffee.

[![buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/4f18nT0Nk)
