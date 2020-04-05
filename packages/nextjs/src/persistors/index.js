import base64 from 'base-64'
import Cookie from 'js-cookie'

import { isServer } from '../internals/utils'

function setCookie(name, val) {
  return Cookie.set(name, val)
}

function getCookie(name) {
  return Cookie.get(name)
}

function removeCookie(name) {
  Cookie.remove(name)
}

function encode(value) {
  return isServer() ? base64.encode(value) : btoa(value)
}

function decode(value) {
  return isServer() ? base64.decode(value) : atob(value)
}

export const Cookies = (cookies) => ({
  setTokens: ({ idToken, token }) => {
    !!token && setCookie('kcToken', encode(token))
    !!idToken && setCookie('kcIdToken', encode(idToken))
  },
  getTokens: () => {
    const tknStr = isServer() ? cookies?.kcToken : getCookie('kcToken')
    const idTknStr = isServer() ? cookies?.kcIdToken : getCookie('kcIdToken')

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
