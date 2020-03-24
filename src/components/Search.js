import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Index } from "elasticlunr"
import SearchModal from "./SearchModal"

function Search({ noSearchResults }) {
  const query = useStaticQuery(graphql`
    query {
      siteSearchIndex {
        index
      }
    }
  `)

  const {
    siteSearchIndex: { index },
  } = query

  const [results, setResults] = useState()
  const search = e => {
    if (e.key !== "Enter") {
      return
    }
    const query = e.target.value
    let result = Index.load(index)
      .search(query, { expand: true })
      .map(data => Index.load(index).documentStore.getDoc(data.ref))
    setResults(result)
  }

  return (
    <>
      <div className="">
        <input
          onKeyDown={e => search(e)}
          className="input is-rounded"
          type="text"
          placeholder="Looking for something?"
        />
      </div>
      {results ? (
        <SearchModal
          results={results}
          setResults={setResults}
          noSearchResults={noSearchResults}
        />
      ) : null}
    </>
  )
}

export default Search
