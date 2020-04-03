import React from "react"
import { Link } from "gatsby"

function Pagination({
  defaultLocale,
  locale,
  translations,
  pageType,
  currentPage,
  numPages,
}) {
  const localePath = () => {
    return defaultLocale === locale
      ? `${translations[pageType][defaultLocale]}`
      : `/${locale}/${translations[pageType][locale]}`
  }

  const prev = () => {
    if (currentPage !== 1) {
      return (
        <Link
          to={`${
            currentPage === 2
              ? `${localePath()}`
              : `${localePath()}/${currentPage - 1}`
          }`}
        >
          {`<<`}
        </Link>
      )
    }
    return null
  }

  const next = () => {
    if (currentPage !== numPages) {
      return <Link to={`${localePath()}/${currentPage + 1}`}>{`>>`}</Link>
    }
    return null
  }
  return (
    <div className="section">
      <div className="container">
        <p>
          {prev()} {currentPage} of {numPages} {next()}
        </p>
      </div>
    </div>
  )
}

export default Pagination
