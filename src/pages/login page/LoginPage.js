import './LoginPage.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import logo from '../../images/naamatlogo.png';
import { Dictionary, LangBtn } from '../../Dictionary'





class LoginPage extends Component {
    render() {


        return (<div id="loginWrapper" class="wrapper">
                
                    <LangBtn />
                
            
                <a href="https://naamat.org.il/" id="bigLogo"> <img src={logo} alt="logo" /></a>
                <div id="buttonWrapper123">
                    <form dir="RTL" id="buttonWrapper" name="login_form" >
                        < input type="email"
                            id="userName"
                            placeholder={Dictionary.enterMail}
                            defaultValue="" required>
                        </input>
                        < input type="password"
                            id="password"
                            placeholder={Dictionary.enterPass}
                            defaultValue="" required>
                        </input>

                        
                        <Link to="/mainUserPage">
                            <button id="loginbtn"
                                type="submit"
                                text={Dictionary.login}
                                className="btn btn-success" >
                                Submit
                                </button>
                        </Link>


                    </form>
                </div>
            </div>
      

        )

    }
}
export default LoginPage;


