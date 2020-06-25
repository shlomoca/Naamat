import './MainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, PictursCarousel, DisplayModal, BottomBar, AfterMessage, CarouselLi, CarouselSlide } from '../../Components.js';
import SimpleReactLightbox from "simple-react-lightbox";
import { SRLWrapper } from "simple-react-lightbox";
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
                    <ShowPhotos />
                </div>
                <BottomBar />
            </div>
        );

    }
}
export default MainUserPage

export class ShowPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: ["https://1pyiuo2cyzn53c8ors1kwg5l-wpengine.netdna-ssl.com/wp-content/uploads/2018/01/%D7%A4%D7%9E%D7%99%D7%A0%D7%99%D7%96%D7%9D-4.jpg", "https://image.shutterstock.com/z/stock-vector-we-can-do-it-iconic-woman-s-fist-symbol-of-female-power-and-industry-cartoon-woman-with-can-do-244865542.jpg", "data:image/jpeg;base64,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"],

        }

    }


    render() {
        return (

            <div id="photoContainer" >

                {/* <SimpleReactLightbox> */}
                    {/* <SRLWrapper> */}
                        <div id="lightBox">
                        {this.state.photos.map(photo => {
                            return (<div>
                                <img className="lightBoxImage" src={photo}></img>
                            </div>)

                        })}
                        </div>
                    {/* </SRLWrapper> */}
                {/* </SimpleReactLightbox> */}

            </div>
        );

    }
}



$(document).ready(() => {

    // handlePictures("/שלמה כרמי2020-06-09");
    //  getWoman("שלמה כרמי");
});


