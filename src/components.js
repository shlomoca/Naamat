import React from 'react';
import  {LangBtn}  from './Dictionary';
import logo from './images/logo.png';

export const NavBar = () => {

    return (
      <div id ="navbar">
        <img id= "smallLogo" src = {logo} alt = "logo"></img>
           <LangBtn />
</div>
)}  
export default NavBar;