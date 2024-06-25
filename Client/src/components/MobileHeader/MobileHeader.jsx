import React, {useState, useEffect} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import "./MobileHeader.css"
import logo from "../Header/images/logo.jpg"
import menu from "./images/menu.png"
import moonIcon from "../Header/images/night.png"
import sunIcon from "../Header/images/sun.png"
import PagesLinks from "../PagesLinks/PagesLinks";
import HeaderItems from "../HeaderItems/HeaderItems";
import axios from "axios";

const MobileHeader = ({ language, toggleLanguage, isDarkMode, toggleTheme, Role, userId, auth, name }) => {
    const [isVisible, setIsVisible] = useState(false);

  return (
    <>
        <nav className={`mobile-nav ${isDarkMode ? "dark" : ""}`}>
            <img src={logo} alt="Logo" className='logo' />
            <button onClick={() => setIsVisible(true)}>
                <img src={menu} alt="menu icon" />
            </button>
        </nav>
        <div onClick={() => setIsVisible(false)} className={`layout ${isVisible ? "visible" : "hidden"}`}/>
        <div className={`drawer ${isVisible ? "visible" : "hidden"} ${isDarkMode ? "dark" : ""}`}>
            <PagesLinks
                language={language}
                Role={Role}
                isDarkMode={isDarkMode}
                toggleLanguage={toggleLanguage}
                toggleTheme={toggleTheme}
                userId={userId}
            />
            <HeaderItems isDarkMode={isDarkMode} language={language} name={name} auth={auth} toggleLanguage={toggleLanguage} toggleTheme={toggleTheme} userId={userId}/>
        </div>
    </>
  )
}

export default MobileHeader