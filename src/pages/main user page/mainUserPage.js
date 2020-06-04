import React, { Component } from 'react';
import  {Dictionary}  from '../../Dictionary';
import {NavBar, WindowComp, changeVisability, BottomBar} from '../../Components.js';
import './mainUserPage.css';


class mainUserPage extends Component {
    render() {
       return(
           <div id="mainUPWrapper"class= "wrapper">
                <WindowComp />
                <div id="main">
                    <div id = "about">
                        <h1>{Dictionary.aboutTitle}</h1>
                        {Dictionary.about}
                    </div>
                </div>
                <NavBar />   

                <footer id = "foot">
                    {/* <BottomBar/> */}
                    <button id="btn" onClick={changeVisability("feedbackWin")}>{Dictionary.feedback}</button>
                </footer>
            </div>
        );

    }
}
export default mainUserPage
