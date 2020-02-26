import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"

function NavBar() {
  const data = useStaticQuery(graphql`
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

      allContentfulPage {
        nodes {
          slug
          title
          node_locale
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata: { locales },
    },
  } = data

  const { allContentfulPage } = data

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" to={`/${window.location.pathname}`}>
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
            alt="Bulma logo."
          />
        </Link>

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
          {allContentfulPage.nodes.map(node => (
            <a href={`${node.slug}`} className="navbar-item">
              {node.title}
            </a>
          ))}

          <div className="navbar-item has-dropdown is-hoverable">
            <a href="#" className="navbar-link">
              Languages
            </a>

            <div className="navbar-dropdown">
              {locales.map(item => (
                <Link
                  to={`/${item.path}`}
                  className="navbar-item"
                  key={item.name}
                >
                  {item.code}
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
