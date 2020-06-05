import './mainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { Dictionary } from '../../Dictionary';
import { NavBar, WindowComp, BottomBar } from '../../Components.js';
import { FeedbackButton } from '../../forms/Forms';


class mainUserPage extends Component {
    render() {
        return (
            <div id="mainUPWrapper" className="wrapper">
                <div id="main">
                    <div id="about">
                        <h1>{Dictionary.aboutTitle}</h1>
                        {Dictionary.about}
                    </div>
                </div>
                <NavBar />
                <FeedbackButton />
                <footer id="foot">
                    {/* <BottomBar/> */}
                    {/* <button id="btn" onClick={addFeedbackForm("experience")}>{Dictionary.feedback}</button> */}
                </footer>
            </div>
        );

    }
}
export default mainUserPage
$("document").ready(function () {

  
      });
      