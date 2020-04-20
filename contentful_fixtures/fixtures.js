const contentful = require("contentful-management")
const { readFileSync } = require("fs")
const path = require("path")
const { v4 } = require("uuid")
require("dotenv").config()

const { createBlogposts } = require("./blogposts")

const client = contentful
  .createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_KEY,
  })
  .getSpace(process.env.GATSBY_CONTENTFUL_SPACE_ID)
  .then(space => space.getEnvironment("master"))

// SAMPLE FEATURED IMAGES

let logoID = ""
let featuredImages = {}
let featuredImageID = ""

client
  .then(environment =>
    environment.createUpload({
      file: readFileSync(path.resolve(__dirname, "logo.svg")),
      contentType: "image/svg",
      fileName: "logo.svg",
    })
  )
  .then(upload => {
    return client
      .then(environment =>
        environment.createAsset({
          fields: {
            title: {
              is: "Logo",
            },
            description: {
              is: "Logo for Firstahjalp",
            },
            file: {
              is: {
                fileName: "logo.svg",
                contentType: "image/svg",
                uploadFrom: {
                  sys: {
                    type: "Link",
                    linkType: "Upload",
                    id: upload.sys.id,
                  },
                },
              },
            },
          },
        })
      )
      .then(asset => {
        return asset.processForAllLocales()
      })
      .then(asset => {
        asset.publish()
        logoID = asset.sys.id
        createSiteSettings(client)
      })
      .then(res => console.log("Image uploaded."))
      .catch(console.error)
  })

client
  .then(async environment => {
    let is = await environment.createUpload({
      file: readFileSync(path.resolve(__dirname, "is.jpg")),
      contentType: "image/jpg",
      fileName: "is.jpg",
    })
    let en = await environment.createUpload({
      file: readFileSync(path.resolve(__dirname, "en.jpg")),
      contentType: "image/jpg",
      fileName: "en.jpg",
    })

    let uploads = { is, en }
    Object.assign(featuredImages, uploads)

    return uploads
  })
  .then(uploads =>
    client
      .then(environment =>
        environment.createAsset({
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
                fileName: "is.jpg",
                contentType: "image/jpg",
                uploadFrom: {
                  sys: {
                    type: "Link",
                    linkType: "Upload",
                    id: uploads.is.sys.id,
                  },
                },
              },
              en: {
                fileName: "is.jpg",
                contentType: "image/jpg",
                uploadFrom: {
                  sys: {
                    type: "Link",
                    linkType: "Upload",
                    id: uploads.en.sys.id,
                  },
                },
              },
            },
          },
        })
      )
      .then(asset => {
        return asset.processForAllLocales()
      })
      .then(asset => {
        featuredImageID = asset.sys.id
        asset.publish()
      })
      .then(res => console.log("Image uploaded."))
      .catch(console.error)
  )
  .then(res => {
    createBlogposts(client, featuredImageID)
    createCategories(client)
    createPages(client)
    // createSiteSettings(client)
  })

// CATEGORIES

function createCategories(client) {
  client
    .then(environment =>
      environment.createEntryWithId("category", "cat1", {
        fields: {
          slug: {
            is: "graenmeti",
            en: "vegetables",
          },
          title: {
            is: "Grænmeti",
            en: "Vegetables",
          },
          description: {
            is:
              "Grænmeti er frábært gæludýr. Vertu viss um að kvarta grænmetið þitt þegar það er 3 mánaða gamalt. Annars mun það breytast í gremlin. Á þessari síðu finnur þú allt sem þú þarft til að sjá um grænu grænmetið þitt.",
            en:
              "Vegetables make great pets. Be sure to neuter your vegetable when it is 3 months old. Otherwise, it will turn into a gremlin. On this site, you will find out everything you need to care for your leafy green vegetables.",
          },
          featuredImage: {
            is: {
              sys: {
                id: featuredImageID,
                linkType: "Asset",
                type: "Link",
              },
            },
            en: {
              sys: {
                id: featuredImageID,
                linkType: "Asset",
                type: "Link",
              },
            },
          },
        },
      })
    )
    .then(entry => entry.publish())
    .then(res => console.log("Category published"))
    .catch(console.error)

  client
    .then(environment =>
      environment.createEntryWithId("category", v4(), {
        fields: {
          slug: {
            is: "avoxtur",
            en: "fruit",
          },
          title: {
            is: "Ávextir",
            en: "Fruit",
          },
          description: {
            is:
              "Hvað eru ávextir? Það kann að koma þér á óvart en ávextir eru í raun litlar skálar sem voru gerðar á síðustu öld af gervigreindarvélum snemma á 16. öld. Ávextir geta klifrað tré og hjólað á fuglum. Stundum fela þau sig á bak við gluggatjöld því það er þar sem þeim finnst þeir vera öruggir. Ef þú lítur á bak við fortjaldið gætirðu séð ávöxt. Ef þú sérð ekki einn, þá ertu kannski ávöxturinn og þú vissir það ekki. Hvort heldur sem er, ættirðu líklega að láta skoða geðheilsu þína.",
            en:
              "What are fruits? It may surprise you but fruits are actually little goblins that were made in the last century by artificial intelligence machines in the early 16th century. Fruits can climb trees and ride birds. Sometimes, they hide behind curtains because that is where they feel safe. If you look behind a curtain, you might see a fruit. If you don't see one, maybe you are the fruit and you didn't know it. Either way, you should probably get your sanity checked.",
          },
          featuredImage: {
            is: {
              sys: {
                id: featuredImageID,
                linkType: "Asset",
                type: "Link",
              },
            },
            en: {
              sys: {
                id: featuredImageID,
                linkType: "Asset",
                type: "Link",
              },
            },
          },
        },
      })
    )
    .then(entry => entry.publish())
    .then(res => console.log("Category published"))
    .catch(console.error)
}

// PAGES
function createPages(client) {
  client
    .then(environment =>
      environment.createEntryWithId("page", v4(), {
        fields: {
          slug: {
            is: "/",
            en: "/",
          },
          title: {
            is: "Heim",
            en: "Home",
          },
          body: {
            is:
              "<h1>Velkomin</h1> <p>Velkomin á síðuna okkar. Þessi síða fjallar um hinn frábæra heim grænmetis. Stundum hatar fólk grænmeti. Þetta fólk er stórmenni og ætti að vera rúnnað og kastað í hola munns hvals. Grænmeti eru fallegir hlutir. Enginn getur reiðst þeim. Þeir eru eins og dýrlingar smurðir með tár sakleysislegra kanína í hlýju snemma á vorin sól. </p> <p> Ef þú ert sammála mér, þá ertu góð manneskja. Ef þú ert ósammála ert þú slæmt egg og þú átt skilið að vera refsað og útlegð. Því miður verður þetta að vera tilfellið. Það er bara hvernig hlutirnir eru. </p> <p> Vinsamlegast samþykktu grænmeti inn í líf þitt. Þeir munu bjarga sárum þínum og bjarga sálu þinni. Þeir eru líka faðmandi svo farðu í rúmið með þér á hverju kvöldi.</p>",
            en:
              "<h1>Welcome</h1><p>Welcome to our site. This site is all about the wonderful world of vegetables. Sometimes, people hate vegetables. Those people are bigots and should be rounded up and thrown into the cavernous mouth of a whale. Vegetables are beautiful things. Nobody can be angry at them. They are like saints anointed with the tears of innocent bunnies in the warmth of an early springtime sun.</p><p>If you a agree with me, you're a good person. If you disagree, you're a bad egg and you deserve to be punished and exiled. We're sorry this has to be the case. It is just how things are.</p><p>Please accept vegetables into your life. They will salve your wounds and save your soul. They are also huggable so bring on to bed with your every night.</p>",
          },
          featuredImage: {
            is: {
              sys: {
                id: featuredImageID,
                linkType: "Asset",
                type: "Link",
              },
            },
            en: {
              sys: {
                id: featuredImageID,
                linkType: "Asset",
                type: "Link",
              },
            },
          },
        },
      })
    )
    .then(entry => entry.publish())
    .then(res => console.log("Page published"))
    .catch(console.error)

  client
    .then(environment =>
      environment.createEntryWithId("page", v4(), {
        fields: {
          slug: {
            is: "um-okkur",
            en: "about-us",
          },
          title: {
            is: "Um okkur",
            en: "About Us",
          },
          body: {
            is:
              "<h1>Um þessa síðu</h1><p>Þessi síða snýst allt um grænmeti. Eitt af uppáhalds grænmetinu mínu er eggaldin. Það er einnig kallað eggaldin og brinjal. Af hverju hefur grænmeti svo mörg nöfn? Það er erfitt að segja til um. Ég elska eggaldin af því að það er bragðgott þegar það er steikt. Ég elska það steikt líka. Í Georgíu sneiða þeir það á lengd og þunnt, steikja það, leggja það með valhnetu líma og veltu því upp. Það er ljúffengt. </p> <p> Ertu líka hrifinn af grænmeti? Hafðu samband, vinsamlegast. Við munum fara og borða allt grænmetið í heiminum saman. Frá fraktal spergilkáli til karrý blómkál, frá djúpsteiktum, crunchy spínatsskrumum til sólbökuðum graskerpíum með tómatkremafyllingu, við munum njóta þeirra allra. </p>",
            en:
              "<h1>About this site</h1><p>This site is all about vegetables. One of my favourite vegetables is aubergine. It is also called eggplant and brinjal. Why does a vegetable have so many names? It is hard to say. I love aubergine because it is tasty when fried. I love it roasted too. In Georgia, they slice it lengthwise and thinly, fry it, layer it with walnut paste, and roll it up. It is delicious.</p> <p>Do you like vegetables too? Contact me, please. We will go and eat all the vegetables in the world together. From fractal broccolis to curried cauliflowers, from deep-fried crunchy spinach crisps to sun-baked pumpkin piees with tomato cream filling, we will savour them all.</p>",
          },
          featuredImage: {
            is: {
              sys: {
                id: featuredImageID,
                linkType: "Asset",
                type: "Link",
              },
            },
            en: {
              sys: {
                id: featuredImageID,
                linkType: "Asset",
                type: "Link",
              },
            },
          },
        },
      })
    )
    .then(entry => entry.publish())
    .then(res => console.log("Page published"))
    .catch(console.error)
}

// TRANSLATIONS

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
          is: "Frumkóða",
          en: "Source code",
        },
        socialMedia: {
          is: "samfélagsmiðla",
          en: "Social media",
        },
      },
    })
  )
  .then(entry => entry.publish())
  .then(res => console.log("Translations published"))
  .catch(console.error)

// SITE SETTINGS

function createSiteSettings(client) {
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
