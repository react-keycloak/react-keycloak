import cookie from 'cookie'
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

export const checkIfUserAuthenticated = ({ ctx: { req } }) => {
  const isServer = Boolean(req)

  if (isServer) {
    const cookies = parseCookies(req)
    return {
      isAuthenticated: cookies.isAuthenticated,
      isServer
    }
  }

  return {
    isAuthenticated: getCookie('isAuthenticated'),
    isServer
  }
}
