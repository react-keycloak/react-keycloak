import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { isServer } from './utils'

export const ServerContext = React.createContext({
  isAuthenticated: 'false',
  isServer: isServer()
})

class ServerProvider extends Component {
  render() {
    const { children, isAuthenticated } = this.props

    return (
      <ServerContext.Provider
        value={{
          isAuthenticated,
          isServer: isServer()
        }}
      >
        {React.Children.only(children)}
      </ServerContext.Provider>
    )
  }
}

ServerProvider.propTypes = {
  children: PropTypes.element.isRequired,
  isAuthenticated: PropTypes.string.isRequired
}

export default ServerProvider
