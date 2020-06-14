import './MainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { Dictionary } from '../../Dictionary';
import { NavBar, PictursCarousel, DisplayModal, BottomBar } from '../../Components.js';
import { FeedbackButton } from '../../forms/Forms';
import { getWoman, WomenCard } from '../woman page/WomanPage';




class MainUserPage extends Component {
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
                {/* <WomenCard /> */}
                <FeedbackButton />
                <PictursCarousel />
                {/* <footer id="foot"> */}
                {/* <BottomBar/> */}

                {/* </footer> */}
                <DisplayModal link='https://he.wikipedia.org/wiki/%D7%A0%D7%A2%D7%9E%D7%AA' details='Wikipedia'/>
            </div>
        );

    }
}
export default MainUserPage;

$("document").ready(function () {
// console.log("i am working");
// getWoman("שלמה כרמי");
});
