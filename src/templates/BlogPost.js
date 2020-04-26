import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

function BlogPost({
  pageContext: { locale, post, translations, socialMediaImage },
}) {
  return (
    <Layout>
      <SEO
        title={`${translations.blog[locale]} | ${post.title}`}
        description={
          post.excerpt ? post.excerpt : post.body.childMarkdownRemark.html
        }
        locale={locale}
        socialMediaImage={socialMediaImage}
      />
      <div key={post.contentful_id} className="section">
        <div className="container">
          <article className="content">
            <article className="content">
              <p>
                {translations.writtenByAuthorOnDate[locale]
                  .replace("%AUTHOR%", post.author)
                  .replace("%DATE%", post.createdAt)}
                .
              </p>
            </article>
            {post.featuredImage ? (
              <div className="container featuredImage">
                <Img fluid={post.featuredImage.fluid} />
              </div>
            ) : null}
            <article
              className="content"
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            ></article>
            {post.tags ? (
              <article className="content">
                <h3>{translations.tags[locale]}:</h3>
                {post.tags.map(tag => (
                  <p key={tag}>{tag}</p>
                ))}
              </article>
            ) : null}
            {post.categories ? (
              <article className="content">
                <h3>Categories:</h3>
                {post.categories.map(cat => (
                  <p key={cat.contentful_id}>{cat.title}</p>
                ))}
              </article>
            ) : null}
          </article>
        </div>
      </div>
    </Layout>
  )
}

export default BlogPost
