import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

function Categories({ pageContext: { locale, categories } }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        translations
      }
    }
  `)

  const {
    site: { translations },
  } = data

  return (
    <Layout>
      <SEO title={`Categories`} />
      <div className="section">
        <div className="title">
          <h1>{translations.categories[locale]}</h1>
        </div>
        <div className="container">
          {categories.map(cat => (
            <div className="card" key={cat.id}>
              <div className="container">
                <Img fluid={cat.featuredImage.fluid} />
              </div>
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
