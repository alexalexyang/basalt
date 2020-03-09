import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function Categories({ pageContext: { category } }) {
  console.log(category)
  return (
    <Layout>
      <SEO title={category.title} />
      <div className="section">
        <div className="container">
          <h1 className="title">{category.title}</h1>
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
