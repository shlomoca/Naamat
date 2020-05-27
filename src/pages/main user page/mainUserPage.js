import React, { Component } from 'react';
import  {Dictionary}  from '../../Dictionary';
<<<<<<< HEAD
import {NavBar, WindowComp, changeVisability, OpenWindow} from '../../Components.js';
=======
import {NavBar, WindowComp, changeVisability, BottomBar} from '../../Components.js';
>>>>>>> 59ecd1699ebc6ef37aa7b4641963910c42ce76c7
import './mainUserPage.css';


class mainUserPage extends Component {
    render() {
       return(
           <div id="mainUPWrapper"class= "wrapper">
                <WindowComp />
<<<<<<< HEAD
                <NavBar />   
=======
>>>>>>> 59ecd1699ebc6ef37aa7b4641963910c42ce76c7
                <div id="main">
                    <div id = "about">
                        <h1>{Dictionary.aboutTitle}</h1>
                        {Dictionary.about}
                    </div>
                </div>
                <NavBar />   

                <footer id = "foot">
<<<<<<< HEAD
                    <button id="btn" onClick={OpenWindow("feedbackWin", 'https://www.google.com/')}>{Dictionary.feedback}</button>
=======
                    {/* <BottomBar/> */}
                    <button id="btn" onClick={changeVisability("feedbackWin")}>{Dictionary.feedback}</button>
>>>>>>> 59ecd1699ebc6ef37aa7b4641963910c42ce76c7
                </footer>
            </div>
        );

    }
}
export default mainUserPage
