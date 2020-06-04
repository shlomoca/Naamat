import React from 'react';
import { LangBtn } from './Dictionary';
import logo from './images/naamatlogo.png';
import fblogo from './images/fblogo.png';
import ytlogo from './images/ytlogo.png';
import './Components.css';

export const NavBar = () => {

  return (
    <div id="navbar">

      <img id="smallLogo" src={logo} alt="logo"></img>
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
export function changeVisability(propId) {
  return function () {
    var x = document.getElementById(propId);
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };
};


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
    changeVisability("feedbackWin");
    return (
      window.open(url, "", "toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
    )
  }

}

export const WindowComp = (url) => {


  return (
    <div id="feedbackWin" class="dark-overlay" onClick={changeVisability("feedbackWin")}>

      <div id="windowComp">
        dhgfhgfh
    </div>
    </div>
  )
}

// window.open( url, "","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")