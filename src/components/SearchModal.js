import React from "react"
import { Link } from "gatsby"

function SearchModal({ results, setResults, noSearchResults }) {
  const closeModal = () => {
    setResults(null)
  }

  return (
    <div id="modal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={() => closeModal()}>
          &times;
        </span>

        <ul className="content">
          {results.length > 0 ? (
            results.map(res => (
              <li key={res.id}>
                <Link to={res.slug}>{res.title}</Link>
              </li>
            ))
          ) : (
            <li>{noSearchResults}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default SearchModal
