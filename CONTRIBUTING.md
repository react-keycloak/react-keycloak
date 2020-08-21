# Contributing

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the project.

## Development workflow

To get started with the project, fork the repo, clone it and run `yarn install` in the root directory to install the required dependencies for each package.

```sh
git clone https://github.com/[YOUR-USERNAME]/react-keycloak

yarn install
```

Make sure your code passes ESLint checks. Run the following to verify:

```sh
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn prettier
```

Remember to add tests for your change if possible. Run the unit tests by:

```sh
yarn test
```

And to check the code coverage

```sh
yarn test:coverage
```

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, eg add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/)

We use [ESLint](https://eslint.org/) with [Prettier](https://prettier.io/) for linting and formatting the code, and [Jest](https://jestjs.io/) for testing.

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn build`: build all the packages.
- `yarn lint`: lint files with ESLint.
- `yarn prettier`: format files with Prettier.
- `yarn test`: run unit tests with Jest.
- `yarn test:coverage`: run unit tests with Jest and report code coverage.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_ series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
