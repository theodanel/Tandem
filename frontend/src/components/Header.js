import React from 'react';
import '../stylesheets/style.css';
import logo from '../img/logo.png'

function Header() {
  return (
    <header>
        <img src={logo} />
    </header>
  )
}

export default Header