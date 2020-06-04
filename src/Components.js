import $ from 'jquery';
import React from 'react';
import  {LangBtn, Dictionary}  from './Dictionary';
import logo from './images/naamatlogo.png';
import fblogo from './images/fblogo.png';
import ytlogo from './images/ytlogo.png';
import './Components.css';

export const NavBar = () => {

    return (
      // <div id ="navbar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">{Dictionary.feedback}</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">אודות</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
      <li class="nav-item">
        
    <form id="serchform" class="form-inline my-2 my-lg-0">
      {/* btn  */}
      <button class="tn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <input id = "serchBar" class="form-control mr-sm-2" type="search" placeholder="Search"/>
    </form>
      </li>
    </ul>
  </div>
  <div id="logoContainer">
    
        <img id= "smallLogo" src = {logo} alt = "logo"></img>
        <LangBtn />
  </div>
        </nav>
       
           
// </div>
)}  



export const clickableImage = () => {

    return (
      <div id ="navbar">
        
        <img id= "smallLogo" src = "https://naamat.org.il/wp-content/uploads/2016/01/logoNEW.png" alt = "logo"></img>
           <LangBtn />
</div>
)}  
export const BottomBar = () => {

    return (
      <div id ="bottom">
        
     
        
        <img id= "fblogo" src = {fblogo} alt = "facebook"></img>
        <img id= "ytlogo" src = {ytlogo} alt = "youtube"></img>
           

 </div>
)}  
 

  function previewUrl(url,target){
    //use timeout coz mousehover fires several times
    clearTimeout(window.ht);
    window.ht = setTimeout(function(){
        var div = document.getElementById(target);
        div.innerHTML = '<iframe style="width:100%;height:100%;" frameborder="0" src="' + url + '" />';
    },20);      
}   
//check


  export const OpenWindow = (id, url) => { //when click on something, will pop a window with the relevant url
    return function(){
      $("#catchScreen").empty();
      $("#catchScreen").append(
        window.open( url, "","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")
      );
    }
  
  }
  
export const WindowComp = (url) => {
  

  return (
    <div id="feedbackWin" class = "dark-overlay" >
      
    <div id ="windowComp">  
     dhgfhgfh
    </div>
    </div>
)}  

// window.open( url, "","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=580, height=600, top=30")