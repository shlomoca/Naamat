import './mainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { Dictionary } from '../../Dictionary';
import { NavBar, PictursCarousel, BottomBar } from '../../Components.js';
import { FeedbackButton } from '../../forms/Forms';




class mainUserPage extends Component {
    render() {
        return (
            <div id="mainUPWrapper" className="wrapper">
                {/* <div id="main">
                    <div id="about">
                        <h1>{Dictionary.aboutTitle}</h1>
                        {Dictionary.about}
                    </div>
                </div> */}
                <NavBar />
                <FeedbackButton />
                <PictursCarousel />
                {/* <footer id="foot"> */}
                {/* <BottomBar/> */}

                {/* </footer> */}
            </div>
        );

    }
}
export default mainUserPage
$("document").ready(function () {


});
