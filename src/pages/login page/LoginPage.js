import React, { Component } from 'react';
import {Dictionary,langs} from '../../Dictionary'
import './LoginPage.css';
import { Link } from 'react-router-dom';



const Buttons = (props) => {
   
    return (
        <Link to={props.link}>
    <button className = "btn"
    id = { props.id }> 
    { props.text } 
         </button>
         </Link>)

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
               
                Dictionary.setLanguage(langs[1]);
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
                    type="button"
                    text = {Dictionary.login}
                    link = "/mainUserPage"/>
                    </div>

                )

            }
        }
        export default LoginPage;