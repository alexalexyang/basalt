import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function Categories({ pageContext: { locale, category, translations } }) {
  return (
    <Layout>
      <SEO
        title={`${translations.category[locale]} | ${category.title}`}
        description={
          category.excerpt
            ? category.excerpt
            : category.description.childMarkdownRemark.html
        }
        locale={locale}
      />
      <div className="section">
        <div className="container">
          <h1>{translations.category[locale]}</h1>
        </div>
        <div className="container">
          <h2 className="title">{category.title}</h2>
          {category.featuredImage ? (
            <div className="basalt-container basalt-center">
              <div className="featuredImage-small">
                <Img fluid={category.featuredImage.fluid} />
              </div>
            </div>
          ) : null}
          <article
            className="basalt-container content"
            dangerouslySetInnerHTML={{
              __html: category.description.childMarkdownRemark.html,
            }}
          ></article>
        </div>
        {category.blog_post ? (
          <div className="basalt-container">
            {category.blog_post.map(post => (
              <div className="card" key={post.contentful_id}>
                <article className="content basalt-container">
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
