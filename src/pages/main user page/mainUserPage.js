import React, { Component } from 'react';
import  {LangBtn, Dictionary}  from '../../Dictionary';
import logo from '../../images/logo.png';



class mainUserPage extends Component {
    render() {
       return(
           <div id="wrapper">
            <img src = {logo} alt = "logo"></img>
           <LangBtn />
           <div id = "about">
       <h1>{Dictionary.aboutTitle}</h1>
           {Dictionary.about}
           </div>
           </div>
        );

    }
}
export default mainUserPage
