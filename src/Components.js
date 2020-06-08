import $ from 'jquery';
import React from 'react';
import { LangBtn, Dictionary } from './Dictionary';
import logo from './images/naamatlogo.png';
import fblogo from './images/fblogo.png';
import ytlogo from './images/ytlogo.png';
import './Components.css';
import { Link } from 'react-router-dom';

export const NavBar = () => {

  return (
    <div id="navbar">
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

          </li>
          {/* <div className="collapse navbar-collapse" id="navbarTogglerDemo02"> */}


          <li className="nav-item">
            <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#feedbackForm">
              {Dictionary.feedback}</button>
          </li>
          <li className="nav-item"id= "catcat">
            <Link to="/serchPage?catagorys">
              <button type="button"  className="btn btn-primary nav-link" >
                catagorys</button>
            </Link>
          </li>


          {/* <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li> */}

          <li className="nav-item">
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">{Dictionary.aboutTitle}</button>
          </li>


          <li className="nav-item" id="stretcher">
            <form id="search-form" className="form-inline my-2 my-lg-0 input-group mb-3">
            
            <button class="btn btn-outline-secondary border-left-0 rounded-0 rounded-right" id="search-btn" type="button">
              <div id="search-bar-outline">
                
            <input class="form-control border-secondary border-right-0 rounded-0" type="text" placeholder="חיפוש" id="example-search-input4"/>
            <button id="clear-btn" class="btn btn-outline-secondary border-left-0 rounded-0 rounded-right" type="button">
                <i class="fa fa-close"></i>
            </button>
              </div>
                <i class="fa fa-search"></i>
            </button>
     
            </form>
          </li>



         
        </ul>

      </nav>


      <div id="demo" class="collapse">
        {Dictionary.about}
      </div>

    



    </div>
  )
}



export const clickableImage = () => {

  return (
    <div id="navbar">

      <img id="smallLogo" src="https://naamat.org.il/wp-content/uploads/2016/01/logoNEW.png" alt="logo"></img>
      <LangBtn />
    </div>
  )
}
export const BottomBar = () => {

  return (
    <div id="bottom">



      <img id="fblogo" src={fblogo} alt="facebook"></img>
      <img id="ytlogo" src={ytlogo} alt="youtube"></img>


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


export const OpenWindow = (id, url) => { //when click on something, will pop a window with the relevant url
  return function () {
    $("#catchScreen").empty();
    $("#catchScreen").append(
      window.open(url, "", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
    );
  }

}

export const WindowComp = (url) => {


  return (
    <div class="dark-overlay" >

      <div id="windowComp">
        dhgfhgfh
    </div>
    </div>
  )
}









