import React from 'react'
import PropTypes from 'prop-types'

import { withKeycloak } from '@react-keycloak/razzle'

import logo from './react.svg'
import './Home.css'

const Home = ({ keycloak, keycloakInitialized: initialized, isServer }) => {
  console.log('Is running on server:', isServer)
  console.log('Keycloak is initialized:', initialized)

  return (
    <div className="Home">
      <div className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <h2>Welcome to Razzle</h2>
      </div>
      <p className="Home-intro">
        To get started, edit <code>src/App.js</code> or <code>src/Home.js</code>
        and save to reload.
      </p>

      <div>
        {!keycloak.authenticated ? (
          <button onClick={() => keycloak.login()}>Login</button>
        ) : (
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </div>

      <ul className="Home-resources">
        <li>
          <a href="https://github.com/jaredpalmer/razzle">Docs</a>
        </li>
        <li>
          <a href="https://github.com/jaredpalmer/razzle/issues">Issues</a>
        </li>
        <li>
          <a href="https://palmer.chat">Community Slack</a>
        </li>
      </ul>
    </div>
  )
}

Home.propTypes = {
  isServer: PropTypes.bool.isRequired,
  keycloakInitialized: PropTypes.bool.isRequired,
  keycloak: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }).isRequired
}

export default withKeycloak(Home)
