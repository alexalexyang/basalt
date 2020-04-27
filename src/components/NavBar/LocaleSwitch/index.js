import React from "react"
import { Link } from "gatsby"
import LocaleOptions from "./LocaleOptions"

function Index({ translations, defaultLocale, locales, translationLocale }) {
  return (
    <>
      {locales ? (
        <div className="navbar-item has-dropdown is-hoverable">
          <Link to={`/`} className="navbar-link">
            {translations.languages[translationLocale]}
          </Link>
          <div className="navbar-dropdown">
            <LocaleOptions
              defaultLocale={defaultLocale.code}
              locales={locales}
            />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Index
