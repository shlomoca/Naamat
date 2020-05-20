import React from 'react';
import LocalizedStrings from 'react-localization';
import Dropdown,{DropdownContent,DropdownTrigger} from 'react-simple-dropdown';
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
});






export const LangBtn = () => {
  return (
      
       <Dropdown>
                <DropdownTrigger><img src={globe} id="globus" alt="lang"/></DropdownTrigger>
                <DropdownContent>
                    
                    <ul>
                        <li>
                            <a onClick={Dictionary.setLanguage(langs[0])}>English</a>
                        </li>
                        <li>
                        <a onClick={Dictionary.setLanguage(langs[1])}>עברית</a>
                        </li>
                        <li>
                        <a onClick={Dictionary.setLanguage(langs[2])}>ARABIC</a>
                        </li>
                    </ul>
                </DropdownContent>
            </Dropdown>
      
  );
}



