import type { AuthClientTokens } from '@react-keycloak/core'

/**
 * TokenPersistor
 */
export interface TokenPersistor {
  /**
   * Invoked to store current/updated Keycloak tokens.
   *
   * @param {AuthClientTokens} tokens The current Keycloak tokens set.
   */
  setTokens: (tokens: AuthClientTokens) => void

  /**
   * Invoked to retrieve Keycloak tokens to use.
   *
   * @returns {AuthClientTokens} Keycloak tokens set to be used.
   */
  getTokens: () => AuthClientTokens

  /**
   * Invoked when stored Keycloak tokens should be removed.
   */
  resetTokens: () => void
}
