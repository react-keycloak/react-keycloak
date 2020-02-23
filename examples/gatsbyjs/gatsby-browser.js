const React = require("react")
const PropTypes = require("prop-types")
const Keycloak = require("keycloak-js")
const { KeycloakProvider } = require("@react-keycloak/web")

const keycloak = new Keycloak({
  realm: process.env.REALM,
  url: process.env.AUTH_URL,
  clientId: process.env.AUTH_CLIENT_ID,
})

const Loading = () => <div>getting ready...</div>

const wrapRootElement = ({ element }) => {
  return (
    <KeycloakProvider
      keycloak={keycloak}
      initConfig={{
        promiseType: "native",
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.xhtml",
      }}
      LoadingComponent={<Loading />}
    >
      {element}
    </KeycloakProvider>
  )
}

wrapRootElement.propTypes = {
  element: PropTypes.node,
}

exports.wrapRootElement = wrapRootElement
