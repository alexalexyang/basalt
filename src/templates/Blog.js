import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import Pagination from "../components/Pagination"

function Blog({
  pageContext: {
    defaultLocale,
    locale,
    translations,
    blogposts,
    currentPage,
    numPages,
  },
}) {
  return (
    <Layout>
      <SEO title={translations.blog[locale]} locale={locale} />
      <div className="section">
        <div className="container">
          <h1 className="title">{translations.blog[locale]}</h1>
        </div>
        <div className="container">
          {blogposts.map(post => (
            <div className="basalt-level card" key={post.contentful_id}>
              {post.featuredImage ? (
                <div className="basalt-level-left">
                  <div className="featuredImage">
                    <Img fluid={post.featuredImage.fluid} />
                  </div>
                </div>
              ) : null}
              <div className="basalt-level-right">
                <article className="content basalt-level-item">
                  <Link to={post.fields.slug} className="title">
                    {post.title}
                  </Link>
                  <p>
                    {translations.writtenByAuthorOnDate[locale]
                      .replace("%AUTHOR%", post.author)
                      .replace("%DATE%", post.createdAt)}
                    .
                  </p>
                  <p>{post.excerpt}</p>
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
        pageType="blog"
        currentPage={currentPage}
        numPages={numPages}
      />
    </Layout>
  )
}

export default Blog
