import { useContext } from 'react';

import ReactKeycloakContext from './Context';

function useKeycloak() {
  const { initialized, keycloak } = useContext(ReactKeycloakContext);
  return Object.assign([keycloak, initialized], { initialized, keycloak });
}

export default useKeycloak;
