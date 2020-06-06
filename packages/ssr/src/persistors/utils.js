import base64 from 'base-64'
import Cookie from 'js-cookie'

import { isServer } from '../internals/utils'

export function setCookie(name, val) {
  return Cookie.set(name, val)
}

export function getCookie(name, cookies = {}) {
  return isServer() ? cookies[name] : Cookie.get(name)
}

export function removeCookie(name) {
  Cookie.remove(name)
}

export function encode(value) {
  return isServer() ? base64.encode(value) : btoa(value)
}

export function decode(value) {
  return isServer() ? base64.decode(value) : atob(value)
}
