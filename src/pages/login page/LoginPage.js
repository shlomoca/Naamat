import React, { Component } from 'react';
import {Dictionary, currentLang, changeLang,langs} from '../../Dictionary'
import './LoginPage.css';



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
 



        class LoginPage extends Component {
            render() {
                changeLang(langs[0]);
                Dictionary.setLanguage(currentLang);
                return ( <div id = "wrapper" >
                   <a href="http://www.google.com"> <img  src="https://i.imgur.com/Mxz9uP5.png" alt="logo" id="logo" /></a>
                    <TextBox 
                    input = "email"
                    id = "userName"
                    placehold = {Dictionary.enterMail} />
                    <TextBox input = "password"
                    id = "password"
                    placehold = {Dictionary.enterPass} />
                    <Buttons id = "login"
                    text = {Dictionary.login}/>

                    </div>

                )

            }
        }
        export default LoginPage;