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
    socialMediaImage,
  },
}) {
  return (
    <Layout>
      <SEO
        title={translations.categories[locale]}
        locale={locale}
        socialMediaImage={socialMediaImage}
      />
      <div className="section">
        <div className="container">
          <h1 className="title">{translations.categories[locale]}</h1>
        </div>
        <div className="container">
          {categories.map(cat => (
            <div className="basalt-level card" key={cat.contentful_id}>
              {cat.featuredImage ? (
                <div className="basalt-level-left">
                  <div className="featuredImage">
                    <Img fluid={cat.featuredImage.fluid} />
                  </div>
                </div>
              ) : null}
              <div className="basalt-level-right">
                <article className="content basalt-level-item">
                  <Link to={cat.fields.slug} className="title">
                    {cat.title}
                  </Link>
                  <article
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: cat.description.childMarkdownRemark.html,
                    }}
                  ></article>
                </article>
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
