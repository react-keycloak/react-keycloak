import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const ServerContext = React.createContext({
  isAuthenticated: 'true',
  isServer: true
})

class ServerProvider extends Component {
  render() {
    const { children, isAuthenticated, isServer } = this.props

    return (
      <ServerContext.Provider
        value={{
          isAuthenticated,
          isServer
        }}
      >
        {React.Children.only(children)}
      </ServerContext.Provider>
    )
  }
}

ServerProvider.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.string.isRequired,
  isServer: PropTypes.bool.isRequired
}

export default ServerProvider
