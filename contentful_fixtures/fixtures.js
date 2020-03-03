const contentful = require("contentful-management")
const { createReadStream } = require("fs")
const { v4 } = require("uuid")
require("dotenv").config()

const client = contentful
  .createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_KEY,
  })
  .getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)

// Upload media. Doesn't quite work.
client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createAssetFromFiles({
      fields: {
        title: {
          is: "Dummy IS asset",
          en: "Dummy EN asset",
        },
        description: {
          is: "Dummy IS description",
          en: "Dummy EN description",
        },
        file: {
          is: {
            contentType: "image/png",
            fileName: "standard_deviation.png",
            file: "standard_deviation.png",
          },
          en: {
            contentType: "image/png",
            fileName: "standard_deviation.png",
            file: "standard_deviation.png",
          },
        },
      },
    })
  )
  .then(asset => asset.processForAllLocales())
  .then(entry => entry.publish())
  .then(res => console.log("Image uploaded."))
  .catch(console.error)

// Publish a blog post. Need to add category manually.
client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("blogPost", v4(), {
      fields: {
        title: {
          is: "Dummy IS blogpost title",
          en: "Dummy EN blogpost title",
        },
        body: {
          is: "# Dummy IS body",
          en: "# Dummy EN body",
        },
        author: {
          is: "Dummy IS author",
          en: "Dummy EN author",
        },
        tags: {
          is: ["tag1", "tag2"],
          en: ["tag3", "tag4"],
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Blogpost published"))
  .catch(console.error)

// Publish a category. Add featured image manually.
client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("category", v4(), {
      fields: {
        title: {
          is: "Dummy IS category",
          en: "Dummy EN category",
        },
        // slug: {
        //   is: "/dummy_category",
        // },
        description: {
          is: "Dummy IS category description.",
          en: "Dummy EN category description.",
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Category published"))
  .catch(console.error)

// Publish a page.
client
  .then(space => space.getEnvironment("master"))
  .then(environment =>
    environment.createEntryWithId("page", v4(), {
      fields: {
        title: {
          is: "Home page IS",
          en: "Home page EN",
        },
        // slug: {
        //   is: "/",
        // },
        body: {
          is: "# Big plans today! *~*~ IS ~*~* Everyone is awesome.",
          en: "# Big plans today! *~*~ EN ~*~* Everyone is awesome.",
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Page published"))
  .catch(console.error)
