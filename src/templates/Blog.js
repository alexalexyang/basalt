import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

import { Link } from "gatsby"

function Blog({ pageContext: { blogposts } }) {
  return (
    <Layout>
      <SEO title={`Blog`} />
      {blogposts.map(post => (
        <div className="section" key={post.id}>
          <div className="container">
            <div className="container">
              <Img fluid={post.featuredImage.fluid} />
            </div>
            <div className="container">
              <article className="content">
                <Link to={post.slug} className="title">
                  {post.title}
                </Link>
                <p>
                  Written by {post.author} on{" "}
                  <time dateTime={post.createdAt}>{post.createdAt}</time>.
                </p>
                <p>EXCERPT HERE.</p>
              </article>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default Blog
