# Changelog

## 6.1.2 ( October 5, 2019 )

Mostly a project update release.
Changes to pipeline, tests and project internal configurations.

### Tests

* Add missing unit-tests for `Provider`.

### Chore

* Update `Jest` configuration.
* Improve code coverage and add `Coveralls` integration.
* Add `validate:lockfile` security check.
* Upgrade to latest `create-react-library` version.

## 6.1.1 ( September 29, 2019 )

### Fix

* Fix issue #28 - `Keycloak.init` is not called again when the `initConfig` prop changes.

## 6.1.0 ( August 9, 2019 )

### Feature

* Add `isLoadingCheck` prop to `KeycloakProvider`.

### Chore

* Update `demo` app to showcase [`axios`](https://github.com/axios/axios) hook integration.

## 6.0.5 ( July 17, 2019 )

### Chore

* Fix `LoadingComponent` type issue. (Thanks to @kunyan)

## 6.0.4 ( May 17, 2019 )

### Feature

* Add `onEvent` handler (will replace `onError` ).
* Deprecate `onError` handler.
* Update Typescript definitions.

## 6.0.3 ( May 15, 2019 )

### Feature

* Add `onTokens` handler (will replace `onToken` ).
* Deprecate `onToken` handler.
* Improve Typescript definitions.

### Chore

* Add validate Typescript task to Travis CI pipeline.

## 6.0.2 ( May 13, 2019 )

### Feature

* Improve Typescript definitions.

## 6.0.1 ( May 5, 2019 )

### Feature

* Add Typescript definitions.

## 6.0.0 ( April 26, 2019 )

### Feature

* Bump required `keycloak-js` version to `6.0.0` 

## 5.1.0 ( April 24, 2019 )

### Breaking

* Changed `LoadingComponent` behaviour: when not specified children will render while Keycloak is being initialized.
* `useKeycloak` Hook now returns an Array/Object instead of Keycloak instance.

### Feature

* Added `keycloakInitialized` props to `withKeycloak` HOC
* Added `initialized` property to `useKeycloak` Hook
* `useKeycloak` Hook returned value can now be used with both array and object destructuring to simplify usage.

## 5.0.0 ( March 10, 2019 )

* Initial release

