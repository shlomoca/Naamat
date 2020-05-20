import LocalizedStrings from 'react-localization';
 export var currentLang = "en";
 
 
export const langs= [ "en" ,"he","ar"];
export const Dictionary = new LocalizedStrings({
    en: {
        enterMail: "please enter email",
        enterPass:  "password",
        login:"log in"
      },
      he: {
        enterMail: "אנא הכנס מייל",
        enterPass:  "סיסמא",
        login:"התחבר"
      },
});

export function changeLang(lang){
    currentLang=lang;
}
