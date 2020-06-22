import './index.css';
import $ from 'jquery';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LoginComponent } from './pages/login page/LoginPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainUserPage from './pages/Main user page/MainUserPage';
import WomanPage from './pages/woman page/WomanPage';
import AdminPage from './pages/Admin Page/AdminPage';
import Category from './pages/category/Category';
import { auth } from './config/Firebase';


$("document").ready(function () {
});

ReactDOM.render(
    <LoginComponent />, document.getElementById('root')
)