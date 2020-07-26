import { createKeycloakStub } from './test-utils';

import createReactKeycloakContext from '../src/context';

afterEach(require('@testing-library/react').cleanup);

describe('createReactKeycloakContext', () => {
  it('should return a new React Context with null', () => {
    const rcContext = createReactKeycloakContext();

    expect(rcContext).toBeDefined();
    expect(rcContext.Consumer).toBeDefined();
    expect(rcContext.Provider).toBeDefined();
  });

  it('should return a new React Context with initialized values', () => {
    const rcContext = createReactKeycloakContext({
      initialized: false,
      keycloak: createKeycloakStub(),
    });

    expect(rcContext).toBeDefined();
    expect(rcContext.Consumer).toBeDefined();
    expect(rcContext.Provider).toBeDefined();
  });
});
