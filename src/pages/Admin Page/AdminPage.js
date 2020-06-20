import './AdminPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, PictursCarousel, DisplayModal, BottomBar, AfterMessage } from '../../Components.js';
import { getWoman, WomenCard } from '../woman page/WomanPage';
import { auth } from '../../config/Firebase';
import { Dictionary } from '../../Dictionary';


class AdminPage extends Component {
    render() {
        return (
            <div id="mainUPWrapper" className="wrapper">
                <NavBar />
                <div class="adminButtons"> 
                <button class="btnhover" id="btn1"> {Dictionary.adminAddWoman} </button>
                <button class="btnhover" id="btn2"> {Dictionary.adminEditWoman} </button>
                <button class="btnhover" id="btn3"> {Dictionary.adminFeedback} </button>
                <button class="btnhover" id="btn4"> {Dictionary.adminEditAbout} </button>
                </div>

            </div>
        );

    }
}
export default AdminPage
$(document).ready(() => {

});
