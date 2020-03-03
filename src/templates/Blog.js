import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { Link } from "gatsby"

function Blog({ pageContext }) {
  console.log(pageContext)
  pageContext.blogposts.forEach(node => console.log(node))
  return (
    <Layout>
      <SEO title={`Blog`} />
      <div>
        {pageContext.blogposts.map(node => (
          <p>
            <Link to={node.slug}>{node.title}</Link>
          </p>
        ))}
      </div>
    </Layout>
  )
}

export default Blog
