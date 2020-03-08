import * as React from 'react'
import PropTypes from 'prop-types'

import { KeycloakStubContext } from './context'

class KeycloakStubProvider extends React.PureComponent {
  render() {
    const { children, keycloakStub } = this.props

    return (
      <KeycloakStubContext.Provider value={keycloakStub}>
        {React.Children.only(children)}
      </KeycloakStubContext.Provider>
    )
  }
}

KeycloakStubProvider.propTypes = {
  children: PropTypes.element.isRequired,
  keycloakStub: PropTypes.shape({}).isRequired
}

export { KeycloakStubProvider }
