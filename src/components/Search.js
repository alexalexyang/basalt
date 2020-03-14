import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { Index } from "elasticlunr"

function Search() {
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

  //   console.log("SEARCH QUERY: ", query)
  //   console.log("SEARCH INDEX: ", index)

  const [results, setResults] = useState()
  console.log(results)
  const search = e => {
    if (e.key !== "Enter") {
      return
    }
    const query = e.target.value
    console.log("QUERY: ", query)
    let result = Index.load(index)
      .search(query, { expand: true })
      .map(data => Index.load(index).documentStore.getDoc(data.ref))
    // console.log(result)
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
      <div className="">
        {results ? (
          <ul className="content">
            {results.map(res => (
              <li>
                <Link to={res.slug}>{res.title}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  )
}

export default Search
