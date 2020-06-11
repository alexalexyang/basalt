import React from "react"
import { Link } from "gatsby"

function Index({
  currentLocale,
  defaultLocale,
  translations,
  translationLocale,
}) {
  return (
    <div className="navbar-item has-dropdown is-hoverable">
      <Link
        to={
          currentLocale === ""
            ? `/${translations.blog[defaultLocale.code].toLowerCase()}`
            : `/${currentLocale}/${translations.blog[
                translationLocale
              ].toLowerCase()}`
        }
        className="navbar-item"
      >
        {translations.blog[translationLocale]}
      </Link>
      <div className="navbar-dropdown">
        <Link
          className="navbar-item"
          to={
            currentLocale === ""
              ? `/${translations.categories[defaultLocale.code].toLowerCase()}`
              : `/${currentLocale}/${translations.categories[
                  translationLocale
                ].toLowerCase()}`
          }
        >
          {translations.categories[translationLocale]}
        </Link>
      </div>
    </div>
  )
}

export default Index
