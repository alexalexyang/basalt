import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function Categories({ pageContext: { categories } }) {
  console.log(categories)
  return (
    <Layout>
      <SEO title={`Categories`} />
      <div className="section">
        <div className="container">
          {categories.map(cat => (
            <div className="card" key={cat.id}>
              <div className="container">
                <h2 className="title">
                  <Link to={cat.slug}>{cat.title}</Link>
                </h2>
              </div>
              <div className="container">
                <article
                  className="container content"
                  dangerouslySetInnerHTML={{
                    __html: cat.description.childMarkdownRemark.html,
                  }}
                ></article>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
