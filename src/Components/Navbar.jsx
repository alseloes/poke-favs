import React, {useContext}from 'react'
import {Link } from 'react-router-dom'
import {ContextGlobal} from './utils/global.context'
import "../index.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";


const Navbar = () => {

  const { contextValue } = useContext(ContextGlobal);
  const { state, changeTheme } = contextValue;

  const navbarStyle = {
    backgroundColor: state.theme === 'dark' ? 'black' : 'white',
    color: state.theme === 'dark' ? 'white' : 'black',
    solluna: state.theme === 'dark' ? 'white' : 'black',
  };

  return (
    <nav className={state.theme}   style ={navbarStyle}>
      <div className='navbar-container'>
        <div className="navbar-left">
          <Link to="/">POKE-FAVS</Link>
        </div>
        <div className="navbar-right">
          <p><Link to="/home">Home</Link></p>
          <p><Link to="/favs" >Favorites</Link></p>
          <p><Link to="/contact">Contact</Link></p>
          <button className={state.theme}  onClick={changeTheme} style ={navbarStyle} id='mybutton'>
            {state.theme === "dark" ? (
                  <FontAwesomeIcon icon={faSun} />
                ) : (
                  <FontAwesomeIcon icon={faMoon} />
                )}
          </button>
        </div>
      </div>
    </nav>
  )

}

export default Navbar