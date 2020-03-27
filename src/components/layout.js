import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import NavBar from "../components/NavBar"
// import "../css/style.scss"
// import "../../public/static/style-d7338602b8069aabfcc703e7fe9a29ca.css"
const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulAsset(filter: { file: { fileName: { eq: "style.css" } } }) {
        nodes {
          title
          localFile {
            publicURL
          }
        }
      }
    }
  `)

  require(`../../public${data.allContentfulAsset.nodes[0].localFile.publicURL}`)

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
