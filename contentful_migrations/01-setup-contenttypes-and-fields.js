module.exports = (migration, context) => {
  // BLOG POST CONTENT TYPE
  const blogPost = migration
    .createContentType("blogPost")
    .name("Blog post")
    .description("Blog post")
    .displayField("title")

  blogPost
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .validations([{ unique: true }])
    .required(false)
    .localized(true)

  blogPost
    .createField("author")
    .name("Author name")
    .type("Symbol")
    .required(false)
    .localized(false)

  blogPost
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(false)
    .localized(true)

  blogPost
    .createField("excerpt")
    .name("Excerpt")
    .type("Symbol")
    .required(false)
    .localized(true)

  blogPost
    .createField("body")
    .name("Body")
    .type("Text")
    .required(false)
    .localized(true)

  blogPost
    .createField("categories")
    .name("Categories")
    .type("Array")
    .items({
      type: "Link",
      linkType: "Entry",
      validations: [
        {
          linkContentType: ["category"],
        },
      ],
    })
    .required(false)

  blogPost
    .createField("tags")
    .name("Tags")
    .type("Array")
    .items({ type: "Symbol" })
    .localized(true)

  blogPost
    .createField("featuredImage")
    .name("Featured image")
    .type("Link")
    .linkType("Asset")
    .required(false)
    .localized(true)

  // CATEGORIES CONTENT TYPE

  const category = migration
    .createContentType("category")
    .name("Category")
    .description("Categories for blog posts")
    .displayField("title")

  category
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .validations([{ unique: true }])
    .required(false)
    .localized(true)

  category
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(true)
    .localized(true)

  category
    .createField("featuredImage")
    .name("Featured image")
    .type("Link")
    .linkType("Asset")
    .required(false)
    .localized(true)

  category
    .createField("description")
    .name("Description")
    .type("Text")
    .required(false)
    .localized(true)

  // PAGE CONTENT TYPE

  const page = migration
    .createContentType("page")
    .name("Page")
    .description("Page")
    .displayField("title")

  page
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .validations([{ unique: true }])
    .required(false)
    .localized(true)

  page
    .createField("title")
    .name("Title")
    .type("Symbol")
    .required(false)
    .localized(true)

  page
    .createField("body")
    .name("Body")
    .type("Text")
    .required(false)
    .localized(true)

  page
    .createField("featuredImage")
    .name("Featured image")
    .type("Link")
    .linkType("Asset")
    .required(false)
    .localized(true)

  // SITE SETTINGS

  const siteSettings = migration
    .createContentType("siteSettings")
    .name("Site settings")
    .description("Site settings")
    .displayField("siteName")

  siteSettings
    .createField("logo")
    .name("Logo")
    .type("Link")
    .linkType("Asset")
    .required(false)

  siteSettings
    .createField("siteName")
    .name("Site name")
    .type("Symbol")
    .required(false)
    .localized(false)

  siteSettings
    .createField("author")
    .name("Author")
    .type("Symbol")
    .required(false)

  siteSettings
    .createField("address")
    .name("Address")
    .type("Symbol")
    .required(false)

  siteSettings
    .createField("phoneNumber")
    .name("Phone number")
    .type("Symbol")
    .required(false)

  siteSettings
    .createField("email")
    .name("Email")
    .type("Symbol")
    .required(false)

  siteSettings
    .createField("facebookLink")
    .name("Facebook link")
    .type("Symbol")
    .required(false)

  siteSettings
    .createField("twitterLink")
    .name("Twitter link")
    .type("Symbol")
    .required(false)

  siteSettings
    .createField("instagramLink")
    .name("Instagram link")
    .type("Symbol")
    .required(false)

  siteSettings
    .createField("defaultImage")
    .name("Default image")
    .type("Link")
    .linkType("Asset")
    .required(false)
    .localized(true)

  siteSettings
    .createField("sourceCodeLink")
    .name("Source code link")
    .type("Symbol")
    .required(false)

  // TRANSLATIONS

  const translations = migration
    .createContentType("translations")
    .name("Translations")
    .description("Translations model")
    .displayField("languages")

  translations
    .createField("blog")
    .name("Blog")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("writtenByAuthorOnDate")
    .name("Written by %AUTHOR% on %DATE%")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("categories")
    .name("Categories")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("category")
    .name("Category")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("tags")
    .name("Tags")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("languages")
    .name("Languages")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("contactDetails")
    .name("Contact details")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("searchPlaceholder")
    .name("Search placeholder")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("noSearchResults")
    .name("No search results")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("address")
    .name("Address")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("socialMedia")
    .name("Social media")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("email")
    .name("Email")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("phoneNumber")
    .name("Phone number")
    .type("Symbol")
    .required(true)
    .localized(true)

  translations
    .createField("sourceCode")
    .name("Source code")
    .type("Symbol")
    .required(true)
    .localized(true)
}
