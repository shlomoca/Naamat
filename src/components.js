import React from 'react';
import  {LangBtn}  from './Dictionary';
import logo from './images/naamatlogo.png';
import './Components.css';

export const NavBar = () => {

    return (
      <div id ="navbar">
        
        <img id= "smallLogo" src = {logo} alt = "logo"></img>
           <LangBtn />
</div>
)}  
export const BottomBar = () => {

    return (
      <div id ="bottom">
        
     
        
        <img id= "smallLogo" src = {logo} alt = "logo"></img>
           <LangBtn />

 </div>
)}  
 export function changeVisability (propId) {
   return function(){
     var x = document.getElementById(propId);
     if (x.style.display === "block") {
       x.style.display = "none";
    } else {
      x.style.display = "block";
      }
    };
  };
export const WindowComp = () => {

  return (
    <div id="feedbackWin" class = "dark-overlay" onClick={changeVisability("feedbackWin")}>

    <div id ="windowComp">
      
     this is a window component
</div>
    </div>
)}  