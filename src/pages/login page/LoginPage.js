import './LoginPage.css';
import $ from 'jquery';
import firebase, { db, auth } from '../../config/Firebase';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import logo from '../../images/naamatlogo.png';
import { Dictionary, LangBtn } from '../../Dictionary'
// import validator from 'validator';
// import isEmail from 'validator/lib/isEmail';






class LoginPage extends Component {

    constructor() {
        super();
        // this.usersRef = db.collection('users');
        // this.userAuth = firebase.auth();
    }

    submitHandle() {
        $("form[name='login_form']").validate({
            // Specify validation rules
            rules: {
                email: {
                    required: true,
                    minlength: 1,
                },
                password: {
                    required: true,
                    minlength: 1,
                },
            },
            messages: {}
        });

        $("#login_form").submit(function (event) {
            alert("11111");
            if (!$("#login_form").valid()) return;
            alert("22222");

            if (auth.signInWithEmailAndPassword($("#email").val(), $("#password").val())) {
                alert("33333");
                window.location.href = "localhost:3000/mainUserPage";
            }
        })

    }


    render() {
        return (<div id="loginWrapper" class="wrapper">
            <div id="langBtnWeapper">

                <LangBtn />
            </div>
            <div class="loginContainer">
                <a id="bigLogo"> <img src={logo} alt="logo" /></a>

                <div id="buttonWrapper123">
                    <form dir="RTL" id="login_form" name="login_form">
                        < input type="email"
                            id="email"
                            name="email"
                            placeholder={Dictionary.enterMail}
                            defaultValue="" required>
                        </input>
                        < input type="password"
                            id="password"
                            name="password"
                            placeholder={Dictionary.enterPass}
                            defaultValue="" required>
                        </input>


                        {/* <Link to="/mainUserPage"> */}
                        <button id="loginbtn"
                            type="submit"
                            text={Dictionary.login}
                            className="btn btn-success"
                            onClick={this.submitHandle} >
                            {Dictionary.login}
                        </button>
                        {/* </Link> */}


                    </form>
                </div>
            </div>
        </div>


        )

    }
}
export default LoginPage;


