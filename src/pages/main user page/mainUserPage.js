import React, { Component } from 'react';
import  {Dictionary}  from '../../Dictionary';
import {NavBar, WindowComp, changeVisability} from '../../Components.js';
import './mainUserPage.css';


class mainUserPage extends Component {
    render() {
       return(
           <div id="mainUPWrapper"class= "wrapper">
                <WindowComp />
                <NavBar />   

                <div id="main">
                    <div id = "about">
                        <h1>{Dictionary.aboutTitle}</h1>bb the king
                        {Dictionary.about}
                    </div>
                </div>
                <footer id = "foot">
                    <button id="btn" onClick={changeVisability("feedbackWin")}>{Dictionary.feedback}</button>
                </footer>
            </div>
        );

    }
}
export default mainUserPage
