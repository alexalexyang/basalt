// BLOG POSTS
export const createBlogposts = client => {
  client
    .then(environment =>
      environment.createEntryWithId("blogPost", v4(), {
        fields: {
          slug: {
            is: "hin-yndislega-gulrot",
            en: "the-wonderful-carrot",
          },
          author: {
            is: "Prófessor Hvítkál",
          },
          title: {
            is: "Hin yndislega gulrót",
            en: "The wonderful carrot",
          },
          excerpt: {
            is:
              "Hefur þú einhvern tíma borðað hvítkál? Það er bragðgóður hlutur. Allir elska gulrætur. Það er jafnvel ljúffengara en granatepli.",
            en:
              "Have you ever eaten a cabbage? It is a most tasty thing. Everyone loves carrots. It is more delicious even than pomegranate. Pomegranate is disgusting.",
          },
          body: {
            is:
              "<h1>Dásamlega hvítkál</h1><p>Hefur þú einhvern tíma borðað hvítkál? Það er bragðgóður hlutur. Allir elska gulrætur. Það er jafnvel ljúffengara en granatepli. Granatepli er ógeðslegt. Það bragðast eins og Rotten tré gelta blandað með tjöru og sandpappír. Engum líkar granatepli. Gulrætur eru aftur á móti ástsælasti ávöxtur heims. </p> <p> Það er rétt. Það kemur þér kannski á óvart, en gulrótin er í raun ávöxtur. Það vex í kórónu trjánna. Aparnir elska að borða það. Stundum rífa þeir það út úr grein og henda því á fisk. Vegna þess að þeir eru apar. Aparnir eru viðbjóðslegar skepnur, eilífur óvinur fisks. Fiskar treysta ekki öpum, því aftur í gamla daga, api bragðaði fiskinn til að vera með hatt þegar hann vildi það ekki. Enn þann dag í dag neita fiskar að nota hatta og hatta er móðgun við fiskmenningu. </p> <p> Ef þér líkar vel við gulrætur ættirðu líka að prófa næpur. Næpur eru eins og gulrætur en líkari. Þau eru góð uppspretta próteina. Þeir hafa meira prótein í sér en prótein sjálft. Líkamsbyggingar elska næpur af þessum sökum. Þeir borða mikið af næpa til að vaxa vöðva. </p>",
            en:
              "<h1>The wonderful cabbage</h1><p>Have you ever eaten a cabbage? It is a most tasty thing. Everyone loves carrots. It is more delicious even than pomegranate. Pomegranate is disgusting. It tastes like rotten tree bark mixed with tar and sandpaper. Nobody likes pomegranates. Carrots, on the other hand, are the world's most beloved fruit.</p> <p>That's right. It may surprise you, but the carrot is actually a fruit. It grows in the crown of trees. Monkeys love to eat it. Sometimes, they pluck it from a branch and hurl it at fish. Because they're monkeys. Monkeys are nasty creatures, the eternal enemy of fish. Fish do not trust monkeys, for back in the Old Days, a monkey tricked a fish into wearing a hat when it did not want to. To this day, fish refuse to wear hats, and hats are an insult to fish culture.</p> <p>If you like carrots, you should also try turnips. Turnips are like carrots but more turnip-like. They are a good source of protein. They have more protein in them than protein itself. Body-builders love turnips for this reason. They eat a lot of turnip to grow muscles.</p>",
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
          tags: {
            is: ["gulrót", "grænmeti", "ávöxtur"],
            en: ["carrot", "vegetable", "fruit"],
          },
        },
      })
    )
    .then(entry => entry.publish())
    .then(res => console.log("Blogpost published"))
    .catch(console.error)

  client
    .then(environment =>
      environment.createEntryWithId("blogPost", v4(), {
        fields: {
          slug: {
            is: "mognud-spinat",
            en: "amazing-spinach",
          },
          author: {
            is: "Dr Ósvífinn Andlit",
          },
          title: {
            is: "Mögnuð spínat",
            en: "The amazing spinach",
          },
          excerpt: {
            is:
              "Spínat er einn mesti fjársjóður heims. Það er ekkert eins dýrmætt og kraftaverk og spínat. Ef þú ert veikur geturðu borðað spínat og allt í einu líður þér vel.",
            en:
              "Spinach is one of the world's greatest treasures. There is nothing as valuable and miraculous as spinach. If you are sick, you can eat a spinach and suddenly you are well again.",
          },
          body: {
            is:
              "<h1>Mögnuð spínat</h1><p>Spínat er einn mesti fjársjóður heims. Það er ekkert eins dýrmætt og kraftaverk og spínat. Ef þú ert veikur geturðu borðað spínat og allt í einu líður þér vel. Það mun blessa þig heilsu og drepa alla sýkla í líkama þínum. Já, það er töfrandi hnýði.</p> <p> Það er rétt. Ef þú vissir það ekki, er spínat í raun hnýði. Fólk heldur að það sé ávöxtur. En reyndar er það ekki ávöxtur. Það er hnýði. Það vex neðanjarðar alveg eins og fílar gera. Ég veit, það kemur á óvart, en það er staðreynd. Allt sem þú þarft að gera er að fara í bakgarðinn þinn og grafa. Það er líklegt að þú finnir spínat sem felur sig þar. </p> <p> Verið samt mjög varkár þegar þú nálgast spínat. Það hefur eitrað bit. Þú verður að syngja fyrir það. Coo á það. Cajole það. Kaxaðu það. Spilaðu klassíska tónlist við það. Það kann mjög vel við popp tónlist en við teljum að það sé bara slæmur smekkur. Þess í stað eru lullabies á fiðlu ákjósanlegar og ráðlagðar aðferðir við að handtaka.</p>",
            en:
              "<h1>The amazing spinach</h1><p>Spinach is one of the world's greatest treasures. There is nothing as valuable and miraculous as spinach. If you are sick, you can eat a spinach and suddenly you are well again. It will bless you with health and kill all the pathogens in your body. Yes, it is a magical tuber.</p><p>That's right. If you didn't know, spinach is actually a tuber. People think it's a fruit. But, actually, it's not a fruit. It's a tuber. It grows underground just like elephants do. I know, it's surprising, but it is a fact. All you have to do is go into your backyard and dig. It is likely that you will find a spinach hiding there.</p><p>However, be very careful when you approach a spinach. It has a venomous bite. You have to sing to it. Coo at it. Cajole it. Coax it. Play classical music to it. It really likes pop music but we think that's just bad taste. Instead, lullabies on the violin are the preferred and recommended methods of capture.</p>",
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
          categories: {
            is: [
              {
                sys: {
                  id: "cat1",
                  linkType: "Entry",
                  type: "Link",
                },
              },
            ],
            en: [
              {
                sys: {
                  id: "cat1",
                  linkType: "Entry",
                  type: "Link",
                },
              },
            ],
          },
          tags: {
            is: ["spínat", "grænmeti", "eitrað"],
            en: ["spinach", "vegetable", "venomous"],
          },
        },
      })
    )
    .then(entry => entry.publish())
    .then(res => console.log("Blogpost published"))
    .catch(console.error)
}
