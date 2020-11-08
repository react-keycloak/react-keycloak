# MIGRATION GUIDE <!-- omit in toc -->

- [v2.x to v3.x](#v2x-to-v3x)
  - [Rename KeycloakProvider to ReactKeycloakProvider](#rename-keycloakprovider-to-reactkeycloakprovider)
  - [Rename ReactKeycloakProvider parameters](#rename-reactkeycloakprovider-parameters)
  - [Remove `withKeycloak` HOC](#remove-withkeycloak-hoc)
  - [Update `useKeycloak` hook usages](#update-usekeycloak-hook-usages)
- [More info](#more-info)

## v2.x to v3.x

### Rename KeycloakProvider to ReactKeycloakProvider

The main `KeycloakProvider` was renamed to `ReactKeycloakProvider`.

```ts
- import { KeycloakProvider } from '@react-keycloak/web'
+ import { ReactKeycloakProvider } from '@react-keycloak/web'
```

### Rename ReactKeycloakProvider parameters

The provider parameters have been renamed as follow

| v2.x         | v3.x          |
| ------------ | ------------- |
| `keycloak`   | `authClient`  |
| `initConfig` | `initOptions` |

### Remove `withKeycloak` HOC

The `withKeycloak` HOC has been ~~removed~~ deprecated and re-implemented using hooks as of version `3.4.0`.

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
