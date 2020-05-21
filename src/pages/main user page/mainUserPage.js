import React, { Component } from 'react';
import  {LangBtn, Dictionary}  from '../../Dictionary';
import logo from '../../images/logo.png';
import './mainUserPage.css'


class mainUserPage extends Component {
    render() {
       return(
           <div id="mainUPWrapper">
               <div id= "navBar">

            <img id= "smallLogo" src = {logo} alt = "logo"></img>
           <LangBtn />
               </div>
           <div id = "about">
       <h1>{Dictionary.aboutTitle}</h1>
           {Dictionary.about}
           </div>
           </div>
        );

    }
}
export default mainUserPage
