import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Page = ({
  pageContext: { page, translations, defaultLocale, locale, socialMediaImage },
}) => {
  return (
    <Layout>
      <SEO
        title={page.title}
        description={
          page.excerpt ? page.excerpt : page.body.childMarkdownRemark.html
        }
        locale={locale}
        socialMediaImage={socialMediaImage}
      />
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

export default Page
