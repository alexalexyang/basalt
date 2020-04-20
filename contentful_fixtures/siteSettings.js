const { v4 } = require("uuid")

const createSiteSettings = (client, logoID) => {
  client
    .then(environment =>
      environment.createEntryWithId("siteSettings", v4(), {
        fields: {
          siteName: {
            is: "Fyrstahjalp",
          },
          author: {
            is: "Mr Moumou",
          },
          address: {
            is: "Somewhere in Reykjavik, Iceland",
          },
          phoneNumber: {
            is: "+0100100110001001001",
          },
          email: {
            is: "helpmepls@omglol.com",
          },
          facebookLink: {
            is: "https://facebook.com",
          },
          twitterLink: {
            is: "https://twitter.com",
          },
          instagramLink: {
            is: "https://instagram.com",
          },
          logo: {
            is: {
              sys: {
                id: logoID,
                linkType: "Asset",
                type: "Link",
              },
            },
            en: {
              sys: {
                id: logoID,
                linkType: "Asset",
                type: "Link",
              },
            },
          },
          defaultImage: {
            is: {
              sys: {
                id: logoID,
                linkType: "Asset",
                type: "Link",
              },
            },
            en: {
              sys: {
                id: logoID,
                linkType: "Asset",
                type: "Link",
              },
            },
          },
          sourceCodeLink: {
            is: "https://github.com/alexalexyang/basalt",
          },
        },
      })
    )
    .then(entry => entry.publish())
    .then(res => console.log("Page published"))
    .catch(console.error)
}

module.exports = { createSiteSettings }
