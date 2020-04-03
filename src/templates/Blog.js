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
