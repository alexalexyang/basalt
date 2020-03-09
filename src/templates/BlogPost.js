import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function BlogPost({ pageContext: { post } }) {
  console.log("POST: ", post)
  return (
    <Layout>
      <SEO title={`Blog | ${post.title}`} />
      <div className="section">
        <div className="container">
          <article className="content">
            <article className="content">
              <p>
                Written by {post.author} on{" "}
                <time dateTime={post.createdAt}>{post.createdAt}</time>.
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
