import React from "react"

function Blog({ pageContext }) {
  console.log(pageContext)
  pageContext.blogposts.forEach(node => console.log(node))
  return (
    <div>
      {pageContext.blogposts.map(node => (
        <p>{node.title}</p>
      ))}
    </div>
  )
}

export default Blog
