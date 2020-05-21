import React, { Component } from 'react';
import { Dictionary, LangBtn } from '../../Dictionary'
import './LoginPage.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';



const Buttons = (props) => {

    return (
        <Link to={props.link}>
            <button className="btn"
                id={props.id}>
                {props.text}
            </button>
        </Link>)

}
const TextBox = (props) => {

    return (< input type={props.input}
        id={props.id}
        placeholder={props.placehold}
        defaultValue="" >
    </input>);
}

class LoginPage extends Component {
    render() {


        return (<div id="wrapper" >
            <LangBtn />
            <a href="http://www.google.com"> <img src={logo} alt="logo" id="bigLogo" /></a>
            <TextBox
                input="email"
                id="userName"
                placehold={Dictionary.enterMail} />
            <TextBox input="password"
                id="password"
                placehold={Dictionary.enterPass} />
            <Buttons id="login"
                type="button"
                text={Dictionary.login}
                link="/mainUserPage" />
        </div>

        )

    }
}
export default LoginPage;