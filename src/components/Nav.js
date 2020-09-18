import React, { useEffect, useState } from 'react';
import profilePic from '../images/user_icon.jpg';
import './Nav.css';

function Nav(){
    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", ()=> {
            if(window.scrollY > 100){
                handleShow(true);
            }else handleShow(false);
        });
        return() => {
            window.removeEventListener("scroll");
        }
    }, []);

    return(
        <div className={`nav ${show && "nav__black"}`}>
            <img className="nav__logo" src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo"/>
            <img className="nav__avatar" src={profilePic} alt="user avatar"/>
        </div>
    )
}

export default Nav;