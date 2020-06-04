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
            <button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo">{Dictionary.feedback}</button>
            <div id="demo" class="collapse">
              {Dictionary.about}
            </div>
            {/* </div> */            /* <a className="nav-link" href="#">{Dictionary.feedback}</a> */}
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">אודות</a>
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




export const EditWoman = () => {
  return (

    <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Add Woman</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form dir="RTL" id="woman_form" name="woman_form" method="POST" >

              <div id="name-group" class="form-group">
                <input type="text" rows="1" class="details" cols="35" name="name" form="woman_form" placeholder="name" required />
              </div>

              <div id="name-group" class="form-group">
                <input type="text" rows="1" class="details" cols="35" name="comment" form="woman_form" placeholder="display name" />
              </div>

              <div id="name-group" class="form-group">
                <input type="text" rows="1" class="details" cols="35" name="Year in timelineme" form="woman_form" placeholder="Year in timeline" required />
              </div>

              <div id="name-group" class="form-group">
                <label for="born_date">Date of birth</label>
                <input type="date" required />
              </div>

              <div id="name-group" class="form-group">
                <label for="profession">Date of death</label>
                <input type="date" />
              </div>

              <div id="name-group" class="form-group">
                <label for="img">Select image:</label>
                <input type="file" id="img" name="img" accept="image/*|audio/*|video/*" />
                <button id="add">add</button>
              </div>

              <div id="highlights" class="form-group">
                <textarea rows="4" class="details" cols="50" name="comment" form="woman_form" placeholder="Highlights" required></textarea>
              </div>


              <div id="biography" class="form-group">
                <textarea rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Biography" required></textarea>
              </div>

              <div id="historical" class="form-group">
                <textarea rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Historical events related" required></textarea>
              </div>

              <div id="contribution" class="form-group">
                <textarea rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Contribution to Feminism" required></textarea>
              </div>

              <div id="interesting" class="form-group">
                <textarea rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Interesting fact / story" required></textarea>
              </div>

              <div id="quotes" class="form-group">
                <select name="type" id="type">
                  <option value="bibliography">Bibliography</option>
                  <option  value="link">Link</option>
                </select>
                <input  type="text" rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Quotes and notable works" />
                <input id="link" type="text" rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="link" />
              </div>

            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success">Submit <span class="fa fa-arrow-right"></span></button>
          </div>
        </div>
      </div>
    </div>
  );
}



