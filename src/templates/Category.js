import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function Categories({ pageContext: { locale, category, translations } }) {
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
          {category.featuredImage ? (
            <div className="container featuredImage">
              <Img fluid={category.featuredImage.fluid} />
            </div>
          ) : null}
        </div>
        {category.blog_post ? (
          <div className="container">
            {category.blog_post.map(post => (
              <div className="card" key={post.contentful_id}>
                <article className="content">
                  <h2>
                    <Link to={post.fields.slug}>{post.title}</Link>
                  </h2>
                  <p key={post.contentful_id}>
                    <time dateTime={post.createdAt}>{post.createdAt}</time>{" "}
                    {post.title}
                  </p>
                </article>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

export default Categories
