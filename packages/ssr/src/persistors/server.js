import base64 from 'base-64'

import { decode, encode, getCookie, removeCookie, setCookie } from './utils'

export const ExpressCookies = (req) => ({
  setTokens: () => {},
  getTokens: () => {
    const { kcIdToken, kcToken } = req.cookies || {}
    return {
      idToken: kcIdToken ? base64.decode(kcIdToken) : undefined,
      token: kcToken ? base64.decode(kcToken) : undefined,
    }
  },
  resetTokens: () => {},
})

export const SSRCookies = (cookies) => ({
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
