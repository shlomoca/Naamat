import './MainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, PictursCarousel, DisplayModal, BottomBar, AfterMessage } from '../../Components.js';
import { getWoman, WomenCard } from '../woman page/WomanPage';
import { auth } from '../../config/Firebase';


class MainUserPage extends Component {
    render() {
        return (
            <div id="mainUPWrapper" className="wrapper">


                <NavBar />
                <PictursCarousel />

                {/* <BottomBar/> */}
                {/* <DisplayModal link='https://he.wikipedia.org/wiki/%D7%A0%D7%A2%D7%9E%D7%AA' details='Wikipedia'/> */}
                {/* <AfterMessage info='this is check!!!' />  */}
            </div>
        );

    }
}
export default MainUserPage
$(document).ready(() => {

    //  getWoman("שלמה כרמי");
});

