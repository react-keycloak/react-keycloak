import cookie from 'cookie'
import isNode from 'detect-node'
import Cookie from 'js-cookie'

// COOKIES

export function setCookie(name, val) {
  Cookie.set(name, val)
}

export function getCookie(name) {
  return Cookie.get(name)
}

export function parseCookies(req) {
  if (!req || !req.headers) {
    return {}
  }

  return cookie.parse(req.headers.cookie || '')
}

// CHECK AUTH

export const isServer = () => isNode && typeof window === 'undefined'

export const checkIfUserAuthenticated = ({ ctx: { req } }) => {
  if (isServer()) {
    const cookies = parseCookies(req)
    return {
      isAuthenticated: cookies.isAuthenticated || 'false',
      isServer
    }
  }

  return {
    isAuthenticated: getCookie('isAuthenticated') || 'false',
    isServer
  }
}
