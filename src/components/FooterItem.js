import React from "react"

function FooterItem({ siteSettings, item, locale, htmlTag }) {
  const sectionItem = () => {
    return siteSettings[item][locale] ? siteSettings[item][locale] : null
  }

  const tag = () => {
    return htmlTag === "li" ? (
      <li>{sectionItem()}</li>
    ) : (
      <h3 className="heading">{sectionItem()}</h3>
    )
  }

  return <>{tag()}</>
}

export default FooterItem
