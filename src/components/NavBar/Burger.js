import React from "react"

function Burger() {
  const burger = () => {
    const burger = document.getElementById("navbar-burger")
    burger.classList.toggle("is-active")
    const navbarMenu = document.getElementById("navbar-menu")
    navbarMenu.classList.toggle("is-active")
  }

  return (
    <span
      className="navbar-burger burger"
      id="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbar-burger"
      onClick={() => burger()}
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </span>
  )
}

export default Burger
