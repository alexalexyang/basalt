import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

function Blog({ pageContext }) {
  console.log(pageContext)
  pageContext.blogposts.forEach(node => console.log(node))
  return (
    <Layout>
      <SEO title={`Blog`} />
      <div>
        {pageContext.blogposts.map(node => (
          <p>{node.title}</p>
        ))}
      </div>
    </Layout>
  )
}

export default Blog
