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


export const EditWoman = () => {
  return (

    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
      </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Understood</button>
          </div>
        </div>
      </div>
    </div>
  );
}


// <form dir="RTL" id="woman_form" name="woman_form">

// <div id="name-group" class="form-group">
//   <label for="name">Name</label>
//   <textarea rows="4" class="details" cols="50" name="comment" form="usrform">
//     Name</textarea>

// </div>


// <div id="name-group" class="form-group">
//   <label for="id">Display name</label>
//   <textarea rows="4" class="details" cols="50" name="comment" form="usrform">
//     Display name</textarea>

// </div>


// <div id="name-group" class="form-group">
//   <label for="password">Date of birth</label>
//   <input type="date" />
// </div>



// <div id="name-group" class="form-group">
//   <label for="profession">Date of death</label>
//   <input type="date" />

// </div>


// <div id="email-group" class="form-group">
//   <label for="email">Highlights</label>
//   <textarea rows="4" class="details" cols="50" name="comment" form="usrform">
//     Highlights</textarea>

//   <label for="img">Select image:</label>
//   <input type="file" id="img" name="img" accept="image/*|audio/*|video/*" />


// </div>

// <button type="submit" class="btn btn-success">Submit <span class="fa fa-arrow-right"></span></button>

// </form>
