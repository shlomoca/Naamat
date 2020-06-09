import './mainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { Dictionary } from '../../Dictionary';
import { NavBar, WindowComp, BottomBar } from '../../Components.js';
import { FeedbackButton } from '../../forms/Forms';


export const PictursCarousel = () => {
    return (
        <div id="pictureCarousel">
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="https://q-cf.bstatic.com/images/hotel/max1024x768/214/21412988.jpg" class="d-block w-100" alt="example 1" />
                    </div>
                    <div class="carousel-item">
                        <img src="https://q-cf.bstatic.com/images/hotel/max1280x900/148/148914590.jpg" class="d-block w-100" alt="example 2" />
                    </div>
                    <div class="carousel-item">
                        <img src="https://q-cf.bstatic.com/images/hotel/max1280x900/169/169438098.jpg" class="d-block w-100" alt="example 3" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}

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
