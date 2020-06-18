import './index.css';
import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LoginComponent } from './pages/login page/LoginPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainUserPage from './pages/main user page/MainUserPage';
import WomanPage from './pages/woman page/WomanPage';
import Category from './pages/category/Category';
import { auth } from './config/Firebase';


{/* <Router>
    <Route exact path="/" component={LoginPage} />
    <Route path="/MainUserPage" component={MainUserPage} />
    <Route path="/WomanPage" component={WomanPage} />
    <Route path="/Category" component={Category} />
</Router>, document.getElementById('root')
); */}

$("document").ready(function () {
});

ReactDOM.render(
    <LoginComponent />, document.getElementById('root')
)