import { useContext } from 'react';

import ReactKeycloakContext from './Context';

function useKeycloak({ awaitInit } = {}) {
  const { initialized, keycloak } = useContext(ReactKeycloakContext);
  return initialized || !awaitInit ? keycloak : null;
}

export default useKeycloak;
