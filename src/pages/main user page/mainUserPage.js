import React, { Component } from 'react';
import  {LangBtn, Dictionary}  from '../../Dictionary';



class mainUserPage extends Component {
    render() {
       return(
           <div id="wrapper">
           <LangBtn />
           {Dictionary.enterMail}
           </div>
        );

    }
}
export default mainUserPage
