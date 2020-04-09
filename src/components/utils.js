export const getCurrentLocale = () => {
  const pathname =
    typeof window !== "undefined" &&
    window.location.pathname.match(/^\/\w\w\/|^\/\w\w$/)
  return pathname ? pathname[0].match(/\w\w/)[0] : ""
}
