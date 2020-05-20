import React from 'react';
import LocalizedStrings from 'react-localization';
import Dropdown, { DropdownContent, DropdownTrigger } from 'react-simple-dropdown';
import "./Dictionary.css"
import globe from './images/globe.png'


export const langs = ["EN", "HE", "AR"];
export const Dictionary = new LocalizedStrings({
  EN: {
    enterMail: "please enter email",
    enterPass: "password",
    login: "log in"
  },
  HE: {
    enterMail: "אנא הכנס מייל",
    enterPass: "סיסמא",
    login: "התחבר"
  },
  AR: {
    enterMail: "ערבית: אנא הכנס מייל",
    enterPass: "ערבית: סיסמא",
    login: "ערבית: התחבר"
  },
});


var language = sessionStorage.getItem("current_language");
if(language === null)
{
  language = langs[0];
}
Dictionary.setLanguage(language);


function changeLanguage(index)
{
    return function(){
        sessionStorage.setItem("current_language",langs[index]);
        alert("pop up window are you sure?");
        window.location.reload();
    }
}


export const LangBtn = () => {

  return (
    <div id ="languages">
    <Dropdown >
      <DropdownTrigger><img src={globe} id="globus" alt="lang" /></DropdownTrigger>
      <DropdownContent>

        <ul>
          <li>
            <button onClick=  {changeLanguage(0)} >English</button>
          </li>
           <li>
             <button onClick ={changeLanguage(1)}>עברית</button>
           </li>
           <li>
             <button onClick={changeLanguage(2)}>ARABIC</button>
           </li>
        </ul>
      </DropdownContent>
    </Dropdown>
    </div>
  );
}



