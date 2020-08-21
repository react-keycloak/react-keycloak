![React Keycloak](/art/react-keycloak-logo.png?raw=true 'React Keycloak Logo')

# React Keycloak <!-- omit in toc -->

> React bindings for [Keycloak](https://www.keycloak.org/)

[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/core?label=npm%20%7C%20core)](https://www.npmjs.com/package/@react-keycloak/core)
[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/web?label=npm%20%7C%20web)](https://www.npmjs.com/package/@react-keycloak/web)
[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/ssr?label=npm%20%7C%20ssr)](https://www.npmjs.com/package/@react-keycloak/ssr)
[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/nextjs?label=npm%20%7C%20nextjs)](https://www.npmjs.com/package/@react-keycloak/nextjs)
[![NPM (scoped)](https://img.shields.io/npm/v/@react-keycloak/razzle?label=npm%20%7C%20razzle)](https://www.npmjs.com/package/@react-keycloak/razzle)

[![License](https://img.shields.io/github/license/react-keycloak/react-keycloak.svg)](https://github.com/react-keycloak/react-keycloak/blob/master/LICENSE.md)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Contributors](https://img.shields.io/badge/contributors-2-orange.svg)](#contributors)<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![Github Issues](https://img.shields.io/github/issues/react-keycloak/react-keycloak.svg)](https://github.com/react-keycloak/react-keycloak/issues) ![npm](https://img.shields.io/npm/dm/@react-keycloak/core)

[![Gitter](https://img.shields.io/gitter/room/react-keycloak/community)](https://gitter.im/react-keycloak/community)

---

## Table of Contents <!-- omit in toc -->

- [Integrations](#integrations)
  - [React](#react)
  - [SSR](#ssr)
  - [NextJS](#nextjs)
  - [Razzle](#razzle)
- [Support](#support)
- [Examples](#examples)
- [Contributors](#contributors)

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

> Experimental (based on NextJS and Razzle ones)

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

### NextJS

> Deprecated (please use SSR one instead).

React Keycloak for NextJS requires:

- React **16.0** or later
- NextJS **9** or later
- `keycloak-js` **9.0.2** or later

```shell
yarn add @react-keycloak/nextjs
```

or

```shell
npm install --save @react-keycloak/nextjs
```

See `@react-keycloak/nextjs` package [README](https://github.com/react-keycloak/react-keycloak/blob/master/packages/nextjs/README.md) for complete documentation.

### Razzle

> Deprecated (please use SSR one instead).

React Keycloak for Razzle requires:

- React **16.0** or later
- Razzle **3** or later
- `keycloak-js` **9.0.2** or later

```shell
yarn add @react-keycloak/razzle
```

or

```shell
npm install --save @react-keycloak/razzle
```

See `@react-keycloak/razzle` package [README](https://github.com/react-keycloak/react-keycloak/blob/master/packages/razzle/README.md) for complete documentation.

## Support

| version | keycloak-js version |
| ------- | ------------------- |
| v2.0.0+ | 9.0.2+              |
| v1.x    | >=8.0.2 <9.0.2      |

## Examples

See [`@react-keycloak/react-keycloak-examples`](https://github.com/react-keycloak/react-keycloak-examples) repository for various demo implementing this library main features.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://panz3r.dev"><img src="https://avatars3.githubusercontent.com/u/1754457?v=4" width="100px;" alt=""/><br /><sub><b>Mattia Panzeri</b></sub></a><br /><a href="#ideas-panz3r" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/react-keycloak/react-keycloak/commits?author=panz3r" title="Code">💻</a> <a href="https://github.com/react-keycloak/react-keycloak/commits?author=panz3r" title="Documentation">📖</a> <a href="https://github.com/react-keycloak/react-keycloak/issues?q=author%3Apanz3r" title="Bug reports">🐛</a> <a href="#maintenance-panz3r" title="Maintenance">🚧</a> <a href="#platform-panz3r" title="Packaging/porting to new platform">📦</a> <a href="#question-panz3r" title="Answering Questions">💬</a> <a href="https://github.com/react-keycloak/react-keycloak/pulls?q=is%3Apr+reviewed-by%3Apanz3r" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/react-keycloak/react-keycloak/commits?author=panz3r" title="Tests">⚠️</a> <a href="#example-panz3r" title="Examples">💡</a></td>
    <td align="center"><a href="https://ac-systems.be/"><img src="https://avatars0.githubusercontent.com/u/9079379?v=4" width="100px;" alt=""/><br /><sub><b>JannesD</b></sub></a><br /><a href="https://github.com/react-keycloak/react-keycloak/issues?q=author%3Ajannes-io" title="Bug reports">🐛</a> <a href="https://github.com/react-keycloak/react-keycloak/commits?author=jannes-io" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

---

If you found this project to be helpful, please consider buying me a coffee.

[![buy me a coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoff.ee/4f18nT0Nk)
