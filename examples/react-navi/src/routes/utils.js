import { map, redirect } from 'navi'

export function withAuthentication(matcher) {
  return map((request, context) =>
    context.isAuthenticated
      ? matcher
      : redirect(
          '/login?redirectTo=' +
            encodeURIComponent(request.mountpath + request.search)
        )
  )
}
