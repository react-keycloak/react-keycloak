import { useContext } from 'react';

import ReactKeycloakContext from './Context';

function useKeycloak() {
  return useContext(ReactKeycloakContext);
}

export default useKeycloak;
