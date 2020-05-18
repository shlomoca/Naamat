import React, { Component } from 'react';
import './LoginPage.css';
// import '.../Dictionery.js';
const HEB="heb",ENG = "eng",ARAB="arab";
var lang =HEB;

const Buttons = (props) => {

    return <button className = "btn"
    id = { props.id } > { props.text } </button>

}
const TextBox = (props) => {

        return ( < input type = { props.input }
            id = { props.id }
            placeholder = { props.placehold }
            defaultValue = "" >
            </input>);
        }
 


// var placehold;
// switch (lang) {
    //     case ARAB:
//         placehold="arabic enter email"
//         break;
//     case ENG:
//         placehold="enter email here"
//         break;
//     case ENG:
//         placehold="הכנס כתובת מייל"
//         break;

    
// }
        class LoginPage extends Component {
            render() {
                return ( <div id = "wrapper" >
                   <a href="http://www.google.com"> <img  src="https://i.imgur.com/Mxz9uP5.png" alt="logo" id="logo" /></a>
                    <TextBox 
                    input = "email"
                    id = "userName"
                    placehold = "enter email here" />
                    <TextBox input = "password"
                    id = "password"
                    placehold = "password" />
                    <Buttons id = "login"
                    text = "log in"/>

                    </div>

                )

            }
        }
        export default LoginPage;