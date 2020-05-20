import React from 'react';
import LocalizedStrings from 'react-localization';




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
      <div>
     zsfczx
      </div>
  );
}



