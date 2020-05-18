import React, { Component } from 'react';

import './App.css';
import Table from './components/Table';
import LoginPage from './pages/login page/LoginPage';

class App extends Component{
  
  render(){
    return(
      <div>
        <Table />
        <LoginPage />
      </div>
    );
  }
}


export default App;
