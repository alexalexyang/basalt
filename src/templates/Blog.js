import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function Blog({ pageContext: { locale, blogposts, translations } }) {
  return (
    <Layout>
      <SEO title={translations.blog[locale]} />
      {blogposts.map(post => (
        <div className="section" key={post.id}>
          <div className="container">
            <div className="container featuredImage">
              <Img fluid={post.featuredImage.fluid} />
            </div>
            <div className="container">
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
      ))}
    </Layout>
  )
}

export default Blog
