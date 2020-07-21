/* istanbul ignore file */

import React from 'react'

export const createKeycloakStub = () => ({
  init: jest.fn().mockResolvedValue(),
  updateToken: jest.fn(),
  login: jest.fn(),
  logout: jest.fn(),
  register: jest.fn(),
  accountManagement: jest.fn(),
  createLoginUrl: jest.fn(),
  createLogoutUrl: jest.fn(),
  createRegisterUrl: jest.fn(),
  createAccountUrl: jest.fn(),
  isTokenExpired: jest.fn(),
  clearToken: jest.fn(),
  hasRealmRole: jest.fn(),
  hasResourceRole: jest.fn(),
  loadUserProfile: jest.fn(),
  loadUserInfo: jest.fn(),
})

export const createChild = (testedProps = []) => {
  class Child extends React.Component {
    render() {
      return (
        <div data-testid="keycloak">
          {Object.keys(this.props).filter((prop) => testedProps.includes(prop))}
        </div>
      )
    }
  }

  return Child
}
