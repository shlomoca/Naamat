import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './LoginPage.css';
import $ from 'jquery';
import firebase, { auth } from '../../config/Firebase';
import logo from '../../images/naamatlogo.png';
import { Dictionary, LangBtn } from '../../Dictionary';
import MainUserPage from '../Main user page/MainUserPage';
import { WomanPage } from '../woman page/WomanPage';
import Category from '../category/Category';
import AdminPage from '../Admin Page/AdminPage';



class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: {},
            password: {},
        }
    }

    login(e) {
        e.preventDefault();
        $("#login_form").validate({
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

        if (!$("#login_form").valid()) return;

        auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        sessionStorage.setItem("user", true);
        sessionStorage.setItem("userEmail", this.state.email);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="loginWrapper" class="wrapper">
                <div id="langBtnWeapper">

                    <LangBtn />
                </div>
                <div class="loginContainer">
                    <a id="bigLogo"> <img src={logo} alt="logo" /></a>

                    <div id="buttonWrapper123">
                        <form dir="RTL" id="login_form" name="login_form_name" role="form">
                            < input type="email"
                                id="email"
                                name="email"
                                placeholder={Dictionary.enterMail}
                                defaultValue="" required
                                onChange={this.handleChange}>
                            </input>
                            < input type="password"
                                id="password"
                                name="password"
                                placeholder={Dictionary.enterPass}
                                defaultValue="" required
                                onChange={this.handleChange}>
                            </input>


                            {/* <Link to="/mainUserPage"> */}
                            <button id="loginbtn"
                                type="submit"
                                text={Dictionary.login}
                                className="btn btn-success"
                                onClick={this.login} >
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



export class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: false,
        }
    }

    authListener() {
        auth.onAuthStateChanged((user) => {
            if (user) this.setState({ user });
            else this.setState({ user: false });
        })
    }

    signOutFun() {
        auth.signOut();
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.signOutFun);
        this.authListener();
    }

    renderDiv() {
        ReactDOM.render(
            <Router>
                <Route exact path="/" component={MainUserPage} />
                <Route path="/WomanPage" component={props => <WomanPage {...props} id="דניאל רז1992-03-31" />} />
                <Route path="/Category" component={Category} />
                <Route path="/AdminPage" component={AdminPage} />
                <Route path="/AdminPage" component={AdminPage} />
            </Router>, document.getElementById('root')
        );
    }

    render() {
        if (this.state.user || sessionStorage.getItem("user")) {
            // alert("in user if");
            return <div id='renderDiv'>{this.renderDiv()}</div>;
        }
        else {
            // alert("in null else if");
            return <LoginPage />
        }
    }
}
