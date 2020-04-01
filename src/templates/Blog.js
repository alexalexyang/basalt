import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

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
  const localePath = () => {
    return defaultLocale === locale
      ? `${translations.blog[defaultLocale]}`
      : `/${locale}/${translations.blog[defaultLocale]}`
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
    <Layout>
      <SEO title={translations.blog[locale]} />
      {blogposts.map(post => (
        <div className="section" key={post.contentful_id}>
          <div className="container">
            <div className="blog-blogpost">
              <div className="blog-blogpost-item featuredImage">
                <Img fluid={post.featuredImage.fluid} />
              </div>
              <div className="blog-blogpost-item">
                <article className="content">
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
          </div>
        </div>
      ))}
      <div className="section">
        <div className="container">
          <p>
            {prev()} {currentPage} of {numPages} {next()}
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
