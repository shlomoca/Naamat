import './MainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, PictursCarousel, DisplayModal, BottomBar, AfterMessage, CarouselLi, CarouselSlide } from '../../Components.js';
import { FeedbackButton } from '../../forms/Forms';
import ReactDOM from 'react-dom';
import Firebase, { auth, storage, db } from '../../config/Firebase';
import { Dictionary } from '../../Dictionary';
import { getWoman, WomenCard } from '../woman page/WomanPage';
import { AdminPage } from '../Admin Page/AdminPage';


class MainUserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            img: {},
            carouselSlids: 0,
            Admin: props.Admin
        }
        
    }

   
    render() {
        return (
            <div>
            <div id="mainUPWrapper" className="wrapper">
            <NavBar AdminPage={false} Admin={this.props.Admin} />
                <PictursCarousel />
            </div>
                <BottomBar/>
            </div>
        );

    }
}
export default MainUserPage

$(document).ready(() => {

    // handlePictures("/שלמה כרמי2020-06-09");
    //  getWoman("שלמה כרמי");
});


