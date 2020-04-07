import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pagination from "../components/Pagination"

function Categories({
  pageContext: {
    defaultLocale,
    locale,
    translations,
    categories,
    currentPage,
    numPages,
  },
}) {
  return (
    <Layout>
      <SEO title={translations.categories[locale]} />
      <div className="section">
        <div className="title">
          <h1>{translations.categories[locale]}</h1>
        </div>
        <div className="container">
          {categories.map(cat => (
            <div className="card" key={cat.contentful_id}>
              {post.featuredImage ? (
                <div className="container featuredImage">
                  <Img fluid={cat.featuredImage.fluid} />
                </div>
              ) : null}
              <div className="container">
                <h2 className="title">
                  <Link to={cat.fields.slug}>{cat.title}</Link>
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
      <Pagination
        defaultLocale={defaultLocale}
        locale={locale}
        translations={translations}
        pageType="categories"
        currentPage={currentPage}
        numPages={numPages}
      />
    </Layout>
  )
}

export default Categories
