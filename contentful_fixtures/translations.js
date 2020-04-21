const { v4 } = require("uuid")

const createTranslations = client => {
  client
    .then(environment =>
      environment.createEntryWithId("translations", v4(), {
        fields: {
          blog: {
            is: "Blogg",
            en: "Blog",
          },
          writtenByAuthorOnDate: {
            is: "Skrifað af %AUTHOR% þann %DATE%",
            en: "Written by %AUTHOR% on %DATE%",
          },
          categories: {
            is: "Flokkar",
            en: "Categories",
          },
          category: {
            is: "Flokkur",
            en: "Category",
          },
          tags: {
            is: "Merki",
            en: "Tags",
          },
          languages: {
            is: "Tungumál",
            en: "Languages",
          },
          contactDetails: {
            is: "Hafðu samband",
            en: "Contact",
          },
          searchPlaceholder: {
            is: "Leit?",
            en: "Search?",
          },
          noSearchResults: {
            is: "Því miður fundust engar niðurstöður.",
            en: "Sorry, no results found.",
          },
          email: {
            is: "Email",
            en: "Email",
          },
          address: {
            is: "Heimilisfang",
            en: "Address",
          },
          phoneNumber: {
            is: "Tel.",
            en: "Tel.",
          },
          sourceCode: {
            is: "kóði",
            en: "Source code",
          },
          socialMedia: {
            is: "Samfélagsmiðlar",
            en: "Social media",
          },
        },
      })
    )
    .then(entry => entry.publish())
    .then(res => console.log("Translations published"))
    .catch(console.error)
}

module.exports = { createTranslations }
