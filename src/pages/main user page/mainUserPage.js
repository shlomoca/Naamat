import './MainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, PictursCarousel, DisplayModal, BottomBar } from '../../Components.js';
import { FeedbackButton } from '../../forms/Forms';
import { getWoman, WomenCard } from '../woman page/WomanPage';




class MainUserPage extends Component {
    render() {
        return (
            <div id="mainUPWrapper" className="wrapper">
                
             
                <NavBar />

                <div id = "womenHolder">

                </div>
                <FeedbackButton />
                <PictursCarousel />
                
                {/* <BottomBar/> */}
                <DisplayModal link='https://he.wikipedia.org/wiki/%D7%A0%D7%A2%D7%9E%D7%AA' details='Wikipedia'/>
            </div>
        );
        
    }
}
export default MainUserPage
$(document).ready( () => {
    
         getWoman("שלמה כרמי");
    });

