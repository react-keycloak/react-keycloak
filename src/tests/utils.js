import React, { Component } from 'react'

export const createKeycloakStub = () => ({
  init: () => {},
  updateToken: () => {}
})

export const createChild = (testedProps = []) => {
  class Child extends Component {
    render () {
      return (
        <div data-testid='keycloak'>
          {Object.keys(this.props).filter(prop => testedProps.includes(prop))}
        </div>
      )
    }
  }

  return Child
}
