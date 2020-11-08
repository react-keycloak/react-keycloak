# MIGRATION GUIDE <!-- omit in toc -->

- [v2.x to v3.x](#v2x-to-v3x)
  - [Update Persistors usages](#update-persistors-usages)
  - [Remove `withKeycloak` HOC](#remove-withkeycloak-hoc)
  - [Update `useKeycloak` hook usages](#update-usekeycloak-hook-usages)
- [More info](#more-info)

## v2.x to v3.x

### Update Persistors usages

The `ServerPersistors` and `ClientPersistors` are now top-level exports.

For **NextJS**

```ts
- import { SSRKeycloakProvider, ServerPersistors } from '@react-keycloak/ssr'
+ import { SSRKeycloakProvider, SSRCookies } from '@react-keycloak/ssr';

  ...

  <SSRKeycloakProvider
    keycloakConfig={keycloakCfg}
-   persistor={ServerPersistors.SSRCookies(cookies)}
+   persistor={SSRCookies(cookies)}
  >
    <Component {...pageProps} />
  </SSRKeycloakProvider>
```

For **Razzle**

- `server.js`

```js
- import { ServerPersistors, SSRKeycloakProvider } from '@react-keycloak/ssr'
+ import { ExpressCookies, SSRKeycloakProvider } from '@react-keycloak/ssr'

  ...

  // 2. Create an instance of ServerPersistors.ExpressCookies passing the current request
- const cookiePersistor = ServerPersistors.ExpressCookies(req)
+ const cookiePersistor = ExpressCookies(req)

  ...
```

- `client.js`

```js
- import { ClientPersistors, SSRKeycloakProvider } from '@react-keycloak/ssr'
+ import { Cookies, SSRKeycloakProvider } from '@react-keycloak/ssr'

  ...

  <SSRKeycloakProvider
    keycloakConfig={getKeycloakConfig()}
-   persistor={ClientPersistors.Cookies}
+   persistor={Cookies}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SSRKeycloakProvider>
```

### Remove `withKeycloak` HOC

The `withKeycloak` HOC has been ~~removed~~ deprecated and re-implemented using hooks as of version `3.3.0`.

The minimum required version of `react` has been increased to `v16.8` (because of React Hooks support).

`withKeycloak` HOC usages should be ported to `useKeycloak` hook.

### Update `useKeycloak` hook usages

In the previous version `useKeycloak` hook returned both an array and an object result, now the array return has been deprecated and removed.

```ts
- const [keycloak, initialized] = useKeycloak()
+ const { keycloak, initialized } = useKeycloak()
```

## More info

For more details on the breaking changes or to report missing details, please see issue [#101](https://github.com/react-keycloak/react-keycloak/issues/101).
