import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, matchPath, Link } from 'react-router-dom';
import profilePic from '../images/user_icon.jpg';
import './Nav.css';
import searchIcon from '../images/search.svg';
import { auth } from '../firebase';

function Nav(){
    const [show, handleShow] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(!!auth.currentUser);
    let history = useHistory();
    let location = useLocation();
    
    auth.onAuthStateChanged((user) => {
        if (user) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      });

    function clickNav(){
        matchPath(location.pathname, {path:'/:id'}) ? history.push("/") : window.scrollTo(0,0);
    }
    function handleClick(e){
        history.push(`/search`); 
    }
    function toggleDropdown(){
        setDropdown(prevdropdown => !prevdropdown);
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
            <img className="nav__avatar" src={profilePic} alt="user avatar" onClick={toggleDropdown} />
            <div className={`dropdown-content ${dropdown && 'drop'}`}>
                <Link to="/shows" onClick={toggleDropdown}>Series</Link>
                <Link to="/movies" onClick={toggleDropdown}>Movies</Link>
                <Link to="/new" onClick={toggleDropdown}>New</Link>
                <Link to="/mylist" onClick={toggleDropdown}>My List</Link>
                {!isSignedIn ? <Link to="/signIn" onClick={toggleDropdown}>Sign In</Link> : <span onClick={()=>{auth.signOut(); toggleDropdown()}}>Sign Out</span>}
            </div>
        </div>
    )
}

export default Nav;