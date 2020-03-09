import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function Categories({ pageContext: { locale, category } }) {
  const {
    site: { translations },
  } = useStaticQuery(graphql`
    query {
      site {
        translations
      }
    }
  `)

  console.log(category)

  return (
    <Layout>
      <SEO title={translations.category[locale]} />
      <div className="section">
        <div className="title">
          <h1>{translations.categories[locale]}</h1>
        </div>
        <div className="container">
          <h2 className="title">{category.title}</h2>
          <article
            className="container content"
            dangerouslySetInnerHTML={{
              __html: category.description.childMarkdownRemark.html,
            }}
          ></article>
          <Img fluid={category.featuredImage.fluid} />
        </div>
        <div className="container">
          {category.blog_post.map(post => (
            <div className="card" key={post.contentful_id}>
              <article className="content">
                <h2>
                  <Link to={post.slug}>{post.title}</Link>
                </h2>
                <p key={post.contentful_id}>
                  <time dateTime={post.createdAt}>{post.createdAt}</time>{" "}
                  {post.title}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Categories
