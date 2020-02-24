import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({ pageContext: { page } }) => (
  <Layout>
    <SEO title="Home" />
    <div className="section">
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

export default IndexPage
