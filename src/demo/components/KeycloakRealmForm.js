import React from 'react';

class KeycloakRealmForm extends React.PureComponent {
  state = {
    kcUrl: '',
    kcRealm: '',
    kcClientId: '',
  };

  handleUrlChange = event => {
    this.setState({ kcUrl: event.target.value });
  };

  handleRealmChange = event => {
    this.setState({ kcRealm: event.target.value });
  };

  handleClientIdChange = event => {
    this.setState({ kcClientId: event.target.value });
  };

  setupKeycloak = () => {
    const { onKeycloakConfig } = this.props;
    const { kcUrl, kcRealm, kcClientId } = this.state;

    onKeycloakConfig({
      url: kcUrl,
      realm: kcRealm,
      clientId: kcClientId,
    });
  };

  render() {
    const { kcUrl, kcRealm, kcClientId } = this.state;

    return (
      <div>
        <div>
          <label>
            Keycloak URL
            <input
              type="url"
              id="keycloak-url"
              onChange={this.handleUrlChange}
              value={kcUrl}
            />
          </label>
        </div>

        <div>
          <label>
            Keycloak Realm
            <input
              type="text"
              id="keycloak-realm"
              onChange={this.handleRealmChange}
              value={kcRealm}
            />
          </label>
        </div>

        <div>
          <label>
            Keycloak ClientID
            <input
              type="text"
              id="keycloak-clientId"
              onChange={this.handleClientIdChange}
              value={kcClientId}
            />
          </label>
        </div>

        <button type="button" onClick={this.setupKeycloak}>
          Login
        </button>
      </div>
    );
  }
}

export default KeycloakRealmForm;
