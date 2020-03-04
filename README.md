# To do

- Put slug back into pages
- Remake slugs in migration and fixture scripts, localised
- Recreate database and migrate
- Link to blog posts
- Create categories page
- Create tags page
- Bring in images
- Create fuller fixtures to test with
- Format markdown properly
- Create language items in Contentful and pull
- Webhook from Contentful to Netlify
- Bring in design
- Rework slugs in gatsby-node.js
- Test data dump for migration
- Write docs

# Contentful

## For setting up content types and fields from CLI

These docs are neither 100% clear nor comprehensive. But they do help some way towards creating the migration files used in the /migration directory to set up content types and their fields via the CLI.

The goal is to get a clear idea of how to write a migration script in JS to use with the Contentful CLI.

Using the references below, I've written a migration file in contentful_migrations/01-setup-contenttypes-and-fields.js. To use, run the following in order:

```
contentful login --management-token YOUR_CMA_TOKEN

contentful space create --name 'YOUR_SPACE_NAME_HERE' -l is

// Lets us run contentful commands without typing the space ID again.
contentful space use -s YOUR_SPACE_ID_HERE

contentful space migration contentful_migrations/01-setup-contenttypes-and-fields.js
```

[CLI docs](https://github.com/contentful/contentful-cli/tree/master/docs): basic use of CLI like login and how to do a migration. But does not include what a migration file looks like, and how to add content types and fields to them.

[CLI migration docs](https://github.com/contentful/contentful-migration): details on how to write the migration script.

[Data model](https://www.contentful.com/developers/docs/concepts/data-model): tells you about what fields can be added to your migration script, but has no info on what the script itself looks like.

[Automated Contentful migrations](https://www.robinandeer.com/blog/2019/04/26/automated-contentful-migrations/): a couple of examples for migration scripts worth skimming through for a start.

[The right way to migrate your content using the Contentful Migration CLI](https://www.contentful.com/blog/2017/09/18/using-the-contentful-migration-cli/): more useful details for migration scripts, like how to link from one content type to another:

```
const blogPost = migration.editContentType('blogPost')
  blogPost.createField('author')
    .name('Author')
    .type('Link')
    .linkType('Entry')

    // Isolates link to only the "author" content type.
    .validations([
      { "linkContentType": ["author"] }
    ])
};
```

[Contentful Migration Cheat Sheet](https://www.cheatography.com/gburgett/cheat-sheets/contentful-migration/): clues you in on how to do some of these fields, and also nice reminders.

[How to do validations on items({})](https://www.contentfulcommunity.com/t/confusing-validations-error-from-the-migrations-cli/776/4).

Basically:

```
blogPost.createField("categories")
    .name("Categories")
    .required(false)
    .type('Array')
    .items({
        type: 'Link',
        linkType: "Entry",

        // Right here.
        validations: [{
            linkContentType: [
                "categories"
            ],
        }]

    })
```

## Creating instances from the CLI

Use [`createEntryWithId`](https://contentful.github.io/contentful-management.js/contentful-management/latest/ContentfulEnvironmentAPI.html#.createEntryWithId) to create content type instances.

I've used this to create fixtures in contentful_fixtures/fixtures.js. Run `node contentful_fixtures.js` to load them into Contentful.

This requires the [contentful-management](https://github.com/contentful/contentful-management.js) and [uuid](https://github.com/uuidjs/uuid) packages.

## Delete content types and fields from CLI

Use [contentful-clean-space](https://github.com/jugglingthebits/contentful-clean-space): `contentful-clean-space --space-id YOUR_SPACE_ID --accesstoken YOUR_CMA_TOKEN --content-types`

## For GETs and POSTs

[Content Management API (CMA)](https://www.contentful.com/developers/docs/references/content-management-api)

# Localisation

[Language subtag registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)

[Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat)

```
let date = new Date()
let intlDate = new Intl.DateTimeFormat('TR', options).format(date)
console.log(intlDate)
```

# How pages are generated according to language

In gatsby.node, I first use the official [Contentful JS SDK](https://github.com/contentful/contentful.js) to get locales:

```
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const locales = await client.getLocales()
  ...
}
```

Then in the same `createPages` function, I iterate over the `locales` array and use the [gatsby-source-contentful](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-contentful) plugin to retrieve data from Contentful using graphql. I use this data to create pages:

```
  return locales.items.forEach(locale => {
    return graphql(`
      {
        blogposts: allContentfulBlogPost(filter: {node_locale: {eq: "${locale.code}"}}) {
            ...
          }
        }
      }
    `).then(res => {
      ...

      // Create each blog post with locale as path prefix.
      blogposts.forEach(node => {
        createPage({
          path: `/${node.node_locale}/blog/${node.title}`,
          component: path.resolve("src/templates/BlogPost.js"),
          ...
        })
      })

      // Create a list of blog posts by locale.
      createPage({
        path: `/${locale.code}/blog`,
        component: path.resolve("src/templates/Blog.js"),
        ...
      })
    })
  })
```

# Important plugins

## [gatsby-source-contentful](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-contentful)

### [setFieldsOnGraphQLNodeType](https://www.gatsbyjs.org/docs/node-apis/#setFieldsOnGraphQLNodeType)

Use this so set custom fields on gatsby-source-contentful's graphql schema.

### General note

Ordinarily, we can only reach a free Contentful account through its REST API. This plugin makes it possible with graphql. Self-documenting playground at /\_\_\_graphql.

Currently, an [unresolved bug](https://github.com/gatsbyjs/gatsby/issues/15397) causes the program to crash while compiling. It seems a [PR](https://github.com/gatsbyjs/gatsby/pull/12816) is in progress. For the moment, a [workaround](https://github.com/gatsbyjs/gatsby/issues/15397#issuecomment-537418391): log into Contentful, click Media from navigation bar, upload any asset.

### Formatting dates

When querying with graphql, dates can be formatted using formats from [momentjs](https://momentjs.com/docs/#/displaying/format/). For instance, this:

```
query MyQuery {
  allContentfulBlogPost {
    nodes {
      createdAt(formatString: "DD MMMM YYYY")
    }
  }
}
```

Produces:

```
{
  "data": {
    "allContentfulBlogPost": {
      "nodes": [
        {
          "createdAt": "08 February 2020"
        },
      ]
    }
  }
}
```

### Crashes if field does not exist

Let's say we we have a field called `description` in Contentful and we have only one record so far, maybe because it's early stages of development. And let's say we haven't filled in the `description` field yet. Graphql fails and it won't compile.

According to this [solution](https://stackoverflow.com/questions/47373455/gatsbyjs-how-to-handle-empty-graphql-node-from-contentful-plugin), at least one record must have this field filled in.

So, the best thing to do is to create a default entry with all fields filled in.

We can't give each field a default value. [This](https://www.contentfulcommunity.com/t/createfield-with-default-value/2485) says it's not part of Contentful's migration API.

# CSS by Bulma

[Bulma with Gatsby](https://www.gatsbyjs.org/docs/bulma/).
