import { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <hr />
      <div className="container">
        <small className="text-muted">
          Repo:&nbsp;
          <a href="https://github.com/panz3r/react-keycloak">
            https://github.com/panz3r/react-keycloak
          </a>
        </small>
      </div>
    </footer>
  )
}
