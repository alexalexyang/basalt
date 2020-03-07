import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

function BlogPost({ pageContext: { post } }) {
  console.log("POST: ", post)
  return (
    <Layout>
      <SEO title={`Blog | ${post.title}`} />
      <article className="section content">
        <article className="container">
          <p>
            Written by {post.author} on{" "}
            <time dateTime={post.createdAt}>{post.createdAt}</time>.
          </p>
        </article>
        <article
          className="container content"
          dangerouslySetInnerHTML={{
            __html: post.body.childMarkdownRemark.html,
          }}
        ></article>
        <article className="container content">
          <h3>Tags:</h3>
          {post.tags.map(tag => (
            <p key={tag}>{tag}</p>
          ))}
        </article>
        <article className="container content">
          <h3>Categories:</h3>
          {post.categories.map(cat => (
            <p key={cat.id}>{cat.title}</p>
          ))}
        </article>
      </article>
    </Layout>
  )
}

export default BlogPost
