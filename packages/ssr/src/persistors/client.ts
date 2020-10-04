import type { AuthClientTokens } from '@react-keycloak/core'

import type { TokenPersistor } from './types'
import { getCookie, removeCookie, setCookie } from './utils'

export class Cookies implements TokenPersistor {
  setTokens({ idToken, token }: AuthClientTokens) {
    !!token && setCookie('kcToken', btoa(token))
    !!idToken && setCookie('kcIdToken', btoa(idToken))
  }

  getTokens() {
    const tknStr = getCookie('kcToken')
    const idTknStr = getCookie('kcIdToken')

    return {
      idToken: idTknStr ? atob(idTknStr) : undefined,
      refreshToken: '',
      token: tknStr ? atob(tknStr) : undefined,
    }
  }

  resetTokens() {
    removeCookie('kcToken')
    removeCookie('kcIdToken')
  }
}
