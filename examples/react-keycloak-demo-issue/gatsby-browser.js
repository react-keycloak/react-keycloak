const React = require("react")
const Keycloak = require("keycloak-js")
const { KeycloakProvider } = require("@react-keycloak/web")

const keycloak = new Keycloak({
  realm: process.env.REALM,
  url: process.env.AUTH_URL,
  clientId: process.env.AUTH_CLIENT_ID,
})

const Loading = () => <div>getting ready...</div>

exports.wrapRootElement = ({ element }) => {
  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={{
        promiseType: "native",
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      }}
      LoadingComponent={<Loading />}
    >
      {element}
    </KeycloakProvider>
  )
}
