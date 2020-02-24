import React from "react"

function BlogPost({ pageContext }) {
  return <p>{pageContext.node.title}</p>
}

export default BlogPost
