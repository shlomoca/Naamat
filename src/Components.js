import $ from 'jquery';
import React from 'react';
import { LangBtn, Dictionary } from './Dictionary';
import logo from './images/naamatlogo.png';
import fblogo from './images/fblogo.png';
import ytlogo from './images/ytlogo.png';
import './Components.css';

export const NavBar = () => {

  return (
    // <div id ="navbar">
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navList">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <img id="smallLogo" src={logo} alt="logo"></img>
      <LangBtn />

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">{Dictionary.aboutTitle}</button>
            <div id="demo" class="collapse">
              {Dictionary.about}
            </div>
            {/* </div> */            /* <a className="nav-link" href="#">{Dictionary.feedback}</a> */}
          </li>
          <li className="nav-item">
             <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#feedbackForm">
                {Dictionary.feedback}</button>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
          </li>
          <li className="nav-item">

            <form id="serchform" className="form-inline my-2 my-lg-0">
              {/* btn  */}
              <button className="tn-outline-success my-2 my-sm-0" type="submit">Search</button>
              <input id="serchBar" className="form-control mr-sm-2" type="search" placeholder="Search" />
            </form>
          </li>
        </ul>
      </div>
      <div id="logoContainer">

      </div>
    </nav>


    // </div>
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


$("document").ready(function () {

  $('select[name=type]').change(function () {
    if ($('select[name=type]').val() == 'link') {
      $('#link').show();
    } else {
      $('#link').hide();
    }
  });

});







