import { atob, btoa } from 'js-base64'
import Cookie from 'js-cookie'

import { isServer } from '../internals/utils'

export function setCookie(name: string, val: string | object) {
  return Cookie.set(name, val)
}

export function getCookie(name: string, cookies = {}) {
  return isServer() ? cookies[name] : Cookie.get(name)
}

export function removeCookie(name: string) {
  Cookie.remove(name)
}

export function encode(value: string) {
  return btoa(value)
}

export function decode(value: string) {
  return atob(value)
}
