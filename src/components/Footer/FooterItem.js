import React from "react"

function FooterItem({
  siteSettings,
  itemName,
  itemLink,
  linkAvailable,
  itemText,
  defaultLocale,
  svg,
}) {
  const renderIcon = () => {
    return svg ? (
      <img src={svg} className="socialMediaIcon" alt={itemText} />
    ) : null
  }

  const renderLink = () => {
    if (itemLink) {
      return itemLink
    }
    return siteSettings[itemName][defaultLocale.code]
  }

  const renderItem = () => {
    if (siteSettings[itemName] === undefined) {
      return null
    } else if (linkAvailable) {
      return renderLink() ? (
        <a href={renderLink()}>
          {renderIcon()}
          {` `}
          {itemText}
        </a>
      ) : null
    } else if (itemName && linkAvailable === undefined) {
      return (
        <>
          {renderIcon()}
          {` `}
          {itemText}
        </>
      )
    } else {
      return null
    }
  }

  return <li>{renderItem()}</li>
}

export default FooterItem
