import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Link } from "gatsby"

function Blog({ pageContext: { blogposts } }) {
  return (
    <Layout>
      <SEO title={`Blog`} />
      {blogposts.map(node => (
        <div className="section" key={node.id}>
          <article className="container">
            <Link to={node.slug} className="title">
              {node.title}
            </Link>
            <p>
              Written by {node.author} on{" "}
              <time dateTime={node.createdAt}>{node.createdAt}</time>.
            </p>
          </article>
        </div>
      ))}
    </Layout>
  )
}

export default Blog
