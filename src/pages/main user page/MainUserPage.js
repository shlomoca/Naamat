import './MainUserPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, PictursCarousel, DisplayModal, BottomBar, AfterMessage, CarouselLi, CarouselSlide } from '../../Components.js';
import { FeedbackButton } from '../../forms/Forms';
import Firebase, { auth, storage, db } from '../../config/Firebase';
import { Dictionary } from '../../Dictionary';
import { getWoman, WomenCard } from '../woman page/WomanPage';
import { AdminPage } from '../Admin Page/AdminPage';


class MainUserPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            carouselSlids: 3,
        }
    }

    // import an Image from firebase storage to caruosel
    handlePictures() {
        var imgSrc = storage.ref("/שלמה כרמי2020-06-09").child("ProfilePic").getDownloadURL().then(url => {
            console.log("url: " + url);
        })

        // get corrent languge
        var lng = Dictionary.getLanguage();

        //get woman's detailes by id
        var woman, name, highlights;
        db.collection('women').doc("/דניאל רז1992-03-31").collection("langs").doc(lng).get().then(res => {
            woman = res.data();
            console.log(woman);
            if (woman) {
                name = woman.display;
                highlights = woman.highlights;
                console.log(name);
                console.log(highlights);
            };

            if (this.carouselSlids == 0) {
                $(".carousel-indicators").append(<CarouselLi data-slide-to="0" class="active" />);
                $(".carousel-inner").append(<CarouselSlide src={imgSrc} class="carousel-item active" womanName={name} womanHighlights={highlights} />)
                alert("in carousel 0");
            }

            else {
                // alert("in else");
                // var element  = React.createElement(<CarouselLi data-slide-to= {this.carouselSlids} />);
                // console.log(element);
                var element = <li data-target="#carouselIndicators" data-slide-to = {this.state.carouselSlids}></li>;
                document.getElementById("carouselIndicators").append(element);
                // ReactDOM.render(<li data-target="#carouselIndicators" data-slide-to = {this.state.carouselSlids}></li>, document.getElementById("carouselIndicators"))
                // ReactDOM.render(<CarouselSlide src={imgSrc} class="carousel-item " womanName={name} womanHighlights={highlights} />, document.getElementById("carouselInner"));
                // $(".carousel-inner").append(<CarouselSlide src={imgSrc} class="carousel-item " womanName={name} womanHighlights={highlights} />)
            }

            this.setState({ carouselSlids: this.carouselSlids + 1 });
        })
            .catch(error => console.log(error));
    }

    componentWillMount() {
        this.handlePictures();
    }

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

    // handlePictures("/שלמה כרמי2020-06-09");
    //  getWoman("שלמה כרמי");
});


