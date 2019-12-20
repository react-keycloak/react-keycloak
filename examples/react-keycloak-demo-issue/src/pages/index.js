import React from "react"
import { Link } from "gatsby"
import { useKeycloak } from "@react-keycloak/web"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const [keycloak, initialized] = useKeycloak()
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <div>
        <div>{`User is ${
          !keycloak.authenticated ? "NOT " : ""
        }authenticated`}</div>

        {!!keycloak.authenticated ? (
          <button type="button" onClick={() => keycloak.logout()}>
            Logout
          </button>
        ) : (
          <button type="button" onClick={() => keycloak.login()}>
            Login
          </button>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
