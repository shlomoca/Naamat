import React, { Component } from 'react';
import  {Dictionary}  from '../../Dictionary';
import NavBar from '../../components.js';
import './mainUserPage.css';


class mainUserPage extends Component {
    render() {
       return(
           <div id="mainUPWrapper"class= "wrapper">
               <NavBar />         
           <div id = "about">
       <h1>{Dictionary.aboutTitle}</h1>
           {Dictionary.about}
           </div>
           </div>
        );

    }
}
export default mainUserPage
