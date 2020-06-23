import './AdminPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, PictursCarousel, DisplayModal, BottomBar, AfterMessage, getFeedback, usersManager } from '../../Components.js';
import { getWoman, WomenCard } from '../woman page/WomanPage';
import { auth } from '../../config/Firebase';
import { Dictionary } from '../../Dictionary';
import { EditWomanModal, AddCategoryModal, FeedbackModal } from '../../forms/Forms';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';


class AdminPage extends Component {
    render() {
        return (
            <div id="mainUPWrapper" className="wrapper">
                <EditWomanModal/>
                <AddCategoryModal/>
                <FeedbackModal/>
                <Link to="/"><button>חזור</button></Link>
                <p id="adminTitle">ברוכים הבאים למערכת הניהול</p>
                <div id="allAdmin"> 
                <div  class="adminButtons">
                    <div id="rightButtons">
                        <button class="btnhover" type="button" id="btn1" data-toggle="modal" data-target="#staticBackdrop"> {Dictionary.adminAddWoman} </button>
                        <button class="btnhover" type="button" id="btn2" > {Dictionary.adminEditWoman} </button>
                        <button class="btnhover" type="button" id="btn3" onClick={getFeedback}> {Dictionary.adminFeedback} </button>
                        <button class="btnhover" type="button" id="btn4"> {Dictionary.adminEditAbout} </button>
                    </div>
                    <div id="leftButtons">
                        <button class="btnhover" type="button" id="btn5" data-toggle="modal" data-target="#categoryForm"> {Dictionary.adminAddCategory} </button>
                        <button class="btnhover" type="button" id="btn6" onClick={usersManager}> {Dictionary.adminUserManagement} </button>
                        <button class="btnhover" type="button" id="btn7">  חסר שימוש כרגע  </button>
                        <button class="btnhover" type="button" id="btn8"> חסר שימוש כרגע </button>
                    </div>
                </div>
                </div>
                <div id="feedBackHolder"></div>
            </div>
            
        );

    }
}
export default AdminPage
$(document).ready(() => {

});
