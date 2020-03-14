import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function BlogPost({ pageContext: { locale, post } }) {
  const {
    site: { translations },
  } = useStaticQuery(graphql`
    query {
      site {
        translations
      }
    }
  `)

  // console.log("POST: ", post)

  return (
    <Layout>
      <SEO title={`Blog | ${post.title}`} />
      <div className="section">
        <div className="container">
          <article className="content">
            <article className="content">
              <p>
                {translations.writtenByAuthorOnDate[locale]
                  .replace("%AUTHOR%", post.author)
                  .replace("%DATE%", post.createdAt)}
                .
              </p>
            </article>
            <div className="container">
              <Img fluid={post.featuredImage.fluid} />
            </div>
            <article
              className="content"
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            ></article>
            <article className="content">
              <h3>Tags:</h3>
              {post.tags.map(tag => (
                <p key={tag}>{tag}</p>
              ))}
            </article>
            <article className="content">
              <h3>Categories:</h3>
              {post.categories.map(cat => (
                <p key={cat.id}>{cat.title}</p>
              ))}
            </article>
          </article>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
