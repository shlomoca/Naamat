import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import LoginPage from './pages/login page/LoginPage';
import { BrowserRouter as Router, Route } from "react-router-dom";
import mainUserPage from './pages/main user page/mainUserPage';

ReactDOM.render(
<Router>
<Route exact path="/" component={LoginPage} />
<Route path="/mainUserPage" component={mainUserPage} />    
</Router>,  document.getElementById('root')
);

