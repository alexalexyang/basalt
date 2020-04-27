import React from "react"
import {Link} from "gatsby"

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
              <div className="container featuredImage-small">
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
                <p>
                  {post.tags.map(tag => (
                    <span key={tag}>{tag}, </span>
                  ))}
                </p>
              </article>
            ) : null}
            {post.categories ? (
              <article className="content">
                <h3>{translations.categories[locale]}:</h3>
                {post.categories.map(cat => (
                  <p>
                    <span key={cat.contentful_id}>
                      <Link to={cat.fields.slug}>{cat.title}</Link>,{" "}
                    </span>
                  </p>
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
