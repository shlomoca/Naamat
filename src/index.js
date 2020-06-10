import './index.css';
import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './pages/login page/LoginPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import mainUserPage from './pages/main user page/mainUserPage';
import WomanPage from './pages/woman page/WomanPage';

ReactDOM.render(

    <Router>
        <Route exact path="/" component={LoginPage} />
        <Route path="/mainUserPage" component={mainUserPage} />
        <Route path="/WomanPage" component={WomanPage} />
    </Router>, document.getElementById('root')
);

$("document").ready(function () {

});