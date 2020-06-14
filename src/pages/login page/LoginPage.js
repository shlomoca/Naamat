import React, { Component } from 'react';
import './LoginPage.css';
import $ from 'jquery';
import firebase, { db, auth } from '../../config/Firebase';
import { Link } from 'react-router-dom';
import logo from '../../images/naamatlogo.png';
import { Dictionary, LangBtn } from '../../Dictionary';
import MainUserPage from '../main user page/MainUserPage';
import LoginComponent from '../../Components';

// import validator from 'validator';
// import isEmail from 'validator/lib/isEmail';






class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
        }
    }

    authListener() {
        auth.onAuthStateChanged((user) => {
            if (user) this.setState({ user });
            else this.setState({ user: null });
        })
    }

    componentDidMount() {
        this.authListener();
    }

    render() {
        return (
            <div className="page">
                {this.state.user ? (<MainUserPage />) : (<LoginComponent />)}
            </div>
        )
    }
}
export default LoginPage;

