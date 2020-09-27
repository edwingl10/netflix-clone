import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, matchPath } from 'react-router-dom';
import profilePic from '../images/user_icon.jpg';
import './Nav.css';
import searchIcon from '../images/search.svg';
function Nav(){
    const [show, handleShow] = useState(false);
    let history = useHistory();
    let location = useLocation();

    function clickNav(){
        matchPath(location.pathname, {path:'/:id'}) ? history.push("/") : window.scrollTo(0,0);
    }
    function handleClick(e){
        history.push(`/search`); 
    }

    useEffect(() => {
        window.addEventListener("scroll", ()=> {
            if(window.scrollY > 50){
                handleShow(true);
            }else handleShow(false);
        });
        return() => {
            window.removeEventListener("scroll");
        }
    }, []);

    return(
        <div className={`nav ${show && "nav__black"}`} >
            <img className="nav__logo" onClick={clickNav} src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"/>
            <img className="search" src={searchIcon} alt="search" onClick={handleClick} />
            <img className="nav__avatar" src={profilePic} alt="user avatar"/>
        </div>
    )
}

export default Nav;