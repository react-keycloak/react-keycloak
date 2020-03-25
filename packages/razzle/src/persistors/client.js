import Cookie from 'js-cookie'

function setCookie(name, val) {
  return Cookie.set(name, val)
}

function getCookie(name) {
  return Cookie.get(name)
}

function removeCookie(name) {
  Cookie.remove(name)
}

export const Cookies = {
  setTokens: ({ idToken, token }) => {
    !!token && setCookie('kcToken', btoa(token))
    !!idToken && setCookie('kcIdToken', btoa(idToken))
  },
  getTokens: () => {
    const tknStr = getCookie('kcToken')
    const idTknStr = getCookie('kcIdToken')

    return {
      idToken: idTknStr ? atob(idTknStr) : undefined,
      token: tknStr ? atob(tknStr) : undefined,
    }
  },
  resetTokens: () => {
    removeCookie('kcToken')
    removeCookie('kcIdToken')
  },
}
