import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

function BlogPost({ pageContext: { post } }) {
  return (
    <Layout>
      <SEO title={`Blog | ${post.title}`} />
      <article className="section content">
        <div classname="container">
          <article className="content">
            <p>
              Written by {post.author} on{" "}
              <time datetime={post.createdAt}>{post.createdAt}</time>.
            </p>
          </article>
        </div>
        <div className="container">
          <article
            className="content"
            dangerouslySetInnerHTML={{
              __html: post.body.childMarkdownRemark.html,
            }}
          ></article>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPost
