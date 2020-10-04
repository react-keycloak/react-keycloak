import { Base64 } from 'js-base64'

import type { TokenPersistor } from './types'
import { decode, encode, getCookie, removeCookie, setCookie } from './utils'

export const ExpressCookies = (req: any): TokenPersistor => ({
  setTokens: () => {},
  getTokens: () => {
    const { kcIdToken, kcToken } = req.cookies || {}
    return {
      idToken: kcIdToken ? Base64.decode(kcIdToken) : undefined,
      token: kcToken ? Base64.decode(kcToken) : undefined,
    }
  },
  resetTokens: () => {},
})

export const SSRCookies = (cookies: any): TokenPersistor => ({
  setTokens: ({ idToken, token }) => {
    !!token && setCookie('kcToken', encode(token))
    !!idToken && setCookie('kcIdToken', encode(idToken))
  },
  getTokens: () => {
    const tknStr = getCookie('kcToken', cookies)
    const idTknStr = getCookie('kcIdToken', cookies)

    return {
      idToken: idTknStr ? decode(idTknStr) : '',
      refreshToken: '',
      token: tknStr ? decode(tknStr) : '',
    }
  },
  resetTokens: () => {
    removeCookie('kcToken')
    removeCookie('kcIdToken')
  },
})
