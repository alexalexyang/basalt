import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ pageContext: { page, defaultLocale, locale } }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div key={page.contentful_id} className="section">
        <div className="container">
          <h1 className="title">{page.title}</h1>
          <article
            className="content"
            dangerouslySetInnerHTML={{
              __html: page.body.childMarkdownRemark.html,
            }}
          ></article>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
