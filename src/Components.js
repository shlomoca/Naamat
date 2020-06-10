import $ from 'jquery';
import React from 'react';
import { LangBtn, Dictionary } from './Dictionary';
import logo from './images/naamatlogo.png';
import fblogo from './images/fblogo.png';
import ytlogo from './images/ytlogo.png';
import './Components.css';
import { EditWomanForm } from './forms/Forms';
import { Link } from 'react-router-dom';


export const NavBar = () => {

  return (
    <div id="navbar">
      <EditWomanForm />
      {/* <a href="#">ויקיפדה</a> */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navList">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className="navbar-nav mr-auto mt-2 mt-lg-0" dir="rtl">
          <li className="nav-item">
            <a id="smallLogo" href="#" dir="rtl"><img id="logo" src={logo} alt="logo"></img></a>
          </li>

          <li id="langItam" className="nav-item" >
            <LangBtn />
            {/* <LinkModel   /> */}

          </li>




          <li className="nav-item" >
            <Link to="/serchPage?catagorys">
              <button type="button" className="btn btn-primary nav-link" >
                {Dictionary.categories}</button>
            </Link>
          </li>


          <li className="nav-item">
            <button type="button" class="btn btn-primary nav-link" data-toggle="modal" data-target="#staticBackdrop">
              {Dictionary.addWoman}
            </button>
          </li>

          <li className="nav-item">
            <button type="button" class="btn btn-primary nav-link" data-toggle="collapse" data-target="#about-drop">{Dictionary.aboutTitle}</button>
          </li>

          <li className="nav-item" id="stretcher">
            <form className="form-inline my-2 my-lg-0 input-group mb-3" id="search-form">
              <button id="search-btn" type="button">
                <div id="search-bar-outline">
                  <input class="form-control " type="text" placeholder={Dictionary.search} id="example-search-input4" />
                  <button id="clear-btn" type="button">
                    <i class="fa fa-close" onClick={() => document.getElementById('example-search-input4').value = ''}></i>
                  </button>
                </div>
                <i class="fa fa-search" id="search-icon"></i>
              </button>
            </form>
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#feedbackForm">
              {Dictionary.feedback}</button>
          </li>
        </ul>

      </nav>


      <div id="about-drop" class="collapse">
        {Dictionary.about}
      </div>





    </div>
  )
}



export const BottomBar = () => {

  return (
    <div id="bottom">


      {/* <a>{Dictionary.builders} </a> */}
      <a href="#"><img id="fblogo" src={fblogo} alt="facebook" /> נעמת בפייסבוק</a>
      <a href="#"> <img id="ytlogo" src={ytlogo} alt="youtube" /> נעמת ביוטיוב</a>


    </div>
  )
}



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

function previewUrl(url, target) {
  //use timeout coz mousehover fires several times
  clearTimeout(window.ht);
  window.ht = setTimeout(function () {
    var div = document.getElementById(target);
    div.innerHTML = '<iframe style="width:100%;height:100%;" frameborder="0" src="' + url + '" />';
  }, 20);
}
//check


export const DisplayModal = (props) => {

  return (
    <div> 
      <button class="clearBtn" data-toggle="modal" data-target="#displayModal"> <a href="#">{props.details}</a></button>
    <div class="modal fade" id="displayModal" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header ">
                <h5 class="modal-title" id="staticBackdropLabel">{props.details}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <iframe src= {props.link}
            width="100%"
            height="100%"
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
            title='url'/>     
            </div>
        </div>
    </div>
</div>
</div>
  )
}











