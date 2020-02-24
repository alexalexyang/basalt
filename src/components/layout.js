import React from "react"
import PropTypes from "prop-types"

import NavBar from "../components/NavBar"
import "../css/style.scss"

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built by
        {` `}
        <a href="https://github.com/alexalexyang">Alex</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
