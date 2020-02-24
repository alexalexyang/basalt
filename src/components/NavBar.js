import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

function NavBar() {
  const {
    site: {
      siteMetadata: { locales },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          locales {
            code
            default
            fallbackCode
            name
          }
        }
      }
    }
  `)

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Bulma logo."
          />
        </a>

        <a
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          href="#"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a href="#" className="navbar-item">
            Home
          </a>

          <a href="#" className="navbar-item">
            Documentation
          </a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#" className="navbar-link">
              Languages
            </a>

            <div className="navbar-dropdown">
              {locales.map(locale => (
                <Link
                  to={locale.default ? `` : `${locale.code}`}
                  className="navbar-item"
                  key={locale.name}
                >
                  {locale.code}
                </Link>
              ))}
              <hr className="navbar-divider" />
              <a href="#" className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a href="#" className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a href="#" className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
