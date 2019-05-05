# Changelog

## 6.0.1 ( May 5, 2019 )

### Feature

- Add Typescript definitions.

## 6.0.0 ( April 26, 2019 )

### Feature

- Bump required `keycloak-js` version to `6.0.0`

## 5.1.0 ( April 24, 2019 )

### Breaking

- Changed `LoadingComponent` behaviour: when not specified children will render while Keycloak is being initialized.
- `useKeycloak` Hook now returns an Array/Object instead of Keycloak instance.

### Feature

- Added `keycloakInitialized` props to `withKeycloak` HOC
- Added `initialized` property to `useKeycloak` Hook
- `useKeycloak` Hook returned value can now be used with both array and object destructuring to simplify usage.

## 5.0.0 ( March 10, 2019 )

- Initial release
