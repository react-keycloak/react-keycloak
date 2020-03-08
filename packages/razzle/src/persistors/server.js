import base64 from 'base-64'

export const ExpressCookies = req => ({
  setTokens: () => {},
  getTokens: () => {
    const { kcIdToken, kcToken } = req.cookies || {}
    return {
      idToken: kcIdToken ? base64.decode(kcIdToken) : undefined,
      token: kcToken ? base64.decode(kcToken) : undefined
    }
  },
  resetTokens: () => {}
})
