import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './LoginPage.css';
import $ from 'jquery';
import { auth, db } from '../../config/Firebase';
import logo from '../../images/naamatlogo.png';
import { Dictionary, LangBtn } from '../../Dictionary';
import MainUserPage from '../Main user page/MainUserPage';
import { WomanPage } from '../woman page/WomanPage';
import Category from '../category/Category';
import AdminPage from '../Admin Page/AdminPage';
import { BottomBar } from '../../Components';



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
                    email: true,
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
        sessionStorage.setItem("userConnect", true);
        sessionStorage.setItem("userEmail", this.state.email);
        window.location.reload();
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div id="LPcover" className="cover">

                <div id="loginWrapper" className="wrapper">
                    <div id="langBtnWeapper">

                        <LangBtn />
                    </div>
                    <div className="loginContainer">
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
                                <a>‏ </a>
                                < input type="password"
                                    id="password"
                                    name="password"
                                    placeholder={Dictionary.enterPass}
                                    defaultValue="" required
                                    onChange={this.handleChange}>
                                </input>
                                <button id="loginbtn"
                                    type="submit"
                                    text={Dictionary.login}
                                    className="btn btn-success"
                                    onClick={this.login} >
                                    {Dictionary.login}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <BottomBar />
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
            page: [],
            permission: false,
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
   timeRefresh() {
        //reset page to main page if page is inactive for a half an hour
        var time = new Date().getTime();
        $(document.body).bind("mousemove keypress touchmove ", function () {
            time = new Date().getTime();
        });

        setInterval(function () {
            if ((new Date().getTime() - time >= 180000)) {
                window.location.href = "/";
            }
        }, 1000);
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.signOutFun);
        this.authListener();

        if (this.state.user || sessionStorage.getItem("userConnect")) {
            var userEmail = sessionStorage.getItem("userEmail");

            db.collection('users').doc(userEmail).get().then(res => {
                if (res.data()) {
                    this.setState({ permission: res.data().admin });

                    if (this.state.permission) {
                        // admin rout
                        this.setState({ page: this.renderAdminDiv() });
                    }
                    else {

                        // visitor rout
                        this.setState({ page: this.renderVisitorDiv() });
                    }
                }
                else {
                    alert(Dictionary.userDoesntExists)
                    this.setState({ page: <LoginPage /> })
                };
            });
        }
        else {
            // alert("in null else if");
            this.setState({ page: <LoginPage /> });
        }

    }

    renderAdminDiv() {
        ReactDOM.render(
            <Router>
                <Route exact path="/" component={() => <AdminPage Admin={this.state.permission} />} />
                <Route path="/WomanPage/:id" component={props => <WomanPage {...props} Admin={this.state.permission} />} />
                <Route path="/Category" component={() => <Category Admin={this.state.permission} />} />
                <Route path="/HomePage" component={() => <MainUserPage Admin={this.state.permission} />} />
            </Router>, document.getElementById('root')
        );
    }

    renderVisitorDiv() {
        this.timeRefresh();
        ReactDOM.render(
            <Router>
                <Route exact path="/" component={MainUserPage} />
                <Route path="/WomanPage/:id" component={props => <WomanPage {...props} />} />
                <Route path="/Category" component={Category} />
            </Router>, document.getElementById('root')
        );
    }

    render() {

        return <div id="renderDiv"> {this.state.page}</div>

    }
}
