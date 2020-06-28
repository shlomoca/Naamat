import React, { Component } from 'react';
import $ from 'jquery';
import { LangBtn, Dictionary } from './Dictionary';
import logo from './images/naamatlogo.png';
import fblogo from './images/fblogo.png';
import ytlogo from './images/ytlogo.png';
import { FeedbackModal, SuggestWomanModal } from './forms/Forms';
import { db, auth } from './config/Firebase'
import { Link } from 'react-router-dom';
import { getWomen, WomenDeck } from '../src/pages/woman page/WomanPage'
import ScrollUpButton from "react-scroll-up-button";
import './Components.css';
import ReactDOM from 'react-dom';
import { LoginComponent } from './pages/login page/LoginPage';


//set a navigation bar to the top of the site
//under the navigation bar there is a 
export const NavBar = (props) => {
  var AdminPage = props.AdminPage,
    Admin = props.Admin,
    categoryPage = props.categoryPage,
    logoHref = "/HomePage",
    suggest = "",
    back = "",
    logout = "";
  if (!Admin) {
    suggest = <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#suggestWomanModal">
      {Dictionary.suggest}</button>;
    logoHref = "/"
  }
  else {
    logout = <li className="nav-item"><button id="signOutBtn" type="button" className="btn btn-primary nav-link" onClick={managerSignout} > {Dictionary.signOut}</button > </li>
  }
  if (categoryPage) {
    back = <Link to='/'><button type="button" className="btn btn-primary nav-link" >{Dictionary.back}</button ></Link>
    $("#catBtn").click(() => window.location.reload());
  }
  return (
    <div id="navbar">
      <SuggestWomanModal />
      <FeedbackModal />
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navList">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <a id="smallLogo" href={logoHref} dir="rtl"><img id="logo" src={logo} alt="logo"></img></a>
          </li>
          <li id="langItam" className="nav-item" >
            <LangBtn />
          </li>
          <li className="nav-item" >
            <Link to="/Category">
              <button type="button" id="catBtn" className="btn btn-primary nav-link" >
                {Dictionary.categories}</button>
            </Link>
          </li>
          <li className="nav-item">
            {suggest}
          </li>
          <li className="nav-item">
            <button type="button" className="btn btn-primary nav-link" data-toggle="collapse" data-target="#about-drop">{Dictionary.aboutTitle}</button>
          </li>
          <li className="nav-item" id="stretcher">
            <Search />
            <div id="womenHolder"></div>
          </li>
          <li className="nav-item">
            {<Buttons AdminPage={AdminPage} Admin={Admin} />}
          </li>
          <li className="nav-item">{back}</li>

          {logout}
        </ul>
      </nav>
      <div id="about-drop" className="collapse">
        {Dictionary.about}
      </div>
    </div>
  )
}


export function adminPageClick() {
  console.log("in onclick")
  var userEmail = sessionStorage.getItem("userEmail");
  console.log(userEmail);
  var permission;

  db.collection('users').doc(userEmail).get().then(res => {
    console.log(res.data());
    permission = res.data().admin;
    console.log(permission);
    if (permission) alert("manager")
  }).catch(error => console.log(error));
}

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      term: ''
    }
    this.searchHandler = this.searchHandler.bind(this);
  }


  //follow after input in serach bar
  searchHandler(event) {
    var term = event.target.value;
    this.setState({ term: term })
    if (term.length > 1) {
      term = (term).toLowerCase();
      getWomen(term);
    }
    else {
      var find = document.getElementById("womenHolder");
      var deck = document.getElementById("deckContainer");
      if (deck)
        ReactDOM.unmountComponentAtNode(deck);
      if (find)
        ReactDOM.unmountComponentAtNode(find);
    }
  }


  render() {
    // var term = (this.state.term).toLowerCase();
    return (
      <form className="form-inline my-2 my-lg-0 input-group mb-3" id="search-form">
        <button id="search-btn" type="button">
          <div id="search-bar-outline">
            <input className="form-control " autoComplete="off" onKeyUp={this.searchHandler} type="text" placeholder={Dictionary.search} id="example-search-input4" />

          </div>
          <i className="fa fa-search" id="search-icon"></i>
        </button>
        <div id="temp">

        </div>

      </form>
    )
  }

}


//show bottom bar 
export const BottomBar = () => {

  return (
    <div id="bottom">

      <ScrollUpButton />
      <span id="builder"><a>{Dictionary.builders}</a></span>
      {/* <a id="facebook" href="https://www.facebook.com/womenatwork" data-target="#mymodal"><img id="fblogo" src={fblogo} alt="facebook" />{Dictionary.NaamatInFacebook}</a>
      <a id="youtube" href="https://www.youtube.com/embed/channel/UCdKKqQogmEQp7KNDRYCnV6A"> <img id="ytlogo" src={ytlogo} alt="youtube" />{Dictionary.NaamatInYoutube}</a> */}
      {/* <DisplayModal link='https://www.youtube.com/embed/watch?v=vg2gscdAQBo' details='Wikipedia' /> */}

    </div>
  )
}


//will show a modal: gets info ("details") and a url ("link") 
export const DisplayModal = (props) => {

  return (
    <div>
      <button className="clearBtn" data-toggle="modal" data-target="#displayModal"> <a href="#">{props.details}</a></button>
      <div className="modal fade" id="displayModal" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content" >
            <div className="modal-header ">
              <h5 className="modal-title" id="staticBackdropLabel">{props.details}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <iframe src={props.link}
                width="100%"
                height="100%"
                frameBorder='0'
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title='url' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





export const AfterMessage = (props) => {

  return (
    <div>
      {/* <button className="clearBtn" data-toggle="modal" data-target="#afterMessage"> <a href="#">something</a></button>  */}
      <div className="modal fade" id="afterMessage" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header ">
              {/* <h5 className="modal-title" id="staticBackdropLabel"></h5>  */}
            </div>
            <div className="modal-body">
              <h1>{props.info}</h1>
            </div>
            <div align="center">
              <button type="button" className="close" className="btn btn-secondary" data-dismiss="modal">{Dictionary.close}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function usersManager() {
  $("#allAdmin").hide();
  $("#feedBackHolder").show()
  db.collection('users').get().then(res => {
    const users = [];
    res.forEach(doc => {
      const data = doc.data();
      if (data) {
        users.push(data);
        console.log(users);
      }
      else
        console.log("no users");
    });

    if (users.length === 0)
      console.log("no users");
    else {
      // ReactDOM.render(<usersTable users={users} />, document.getElementById('feedBackHolder'));
    }
  }).catch(error => console.log(error))

  return (
    <div> </div>
  )

}


const Buttons = (props) => {
  var obj;

  if (props.Admin) {
    if (props.AdminPage) {
      obj = <Link to="/HomePage"><button type="button" className="btn btn-primary nav-link" >{Dictionary.homePageBack}</button></Link>
    }
    else
      obj = <Link to="/"><button type="button" id="managerBtn" className="btn btn-primary nav-link" >{Dictionary.managmentPlatform}</button></Link>
  }
  else
    obj = <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#feedbackForm">{Dictionary.feedback}</button>

  return obj;

}

export const CategoryCheckBox = (props) => {
  var items = props.items;
  return (
    <div className="category_Check_Box">
      {items.map(cat => {
        var displayCat = cat[Dictionary.getLanguage()],
          idCat = cat["HE"];
        if (displayCat && idCat)
          return (<div className="checkbox_conatainer">
            <label className="lableCheckBox" for={idCat}>{displayCat}</label>
            <input className="checkbox" type="checkbox" id={idCat} name={"cat"} value={displayCat} />
          </div>)
      })}
    </div>)
}


export class CollectionCheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colc: props.colc,
      items: []
    }
  }

  componentWillMount() {

    var arr = [];
    db.collection('categories').get().then(snapshot => {
      console.log(snapshot)
      snapshot.forEach(doc => {

        var data = doc.data();
        if (data) {
          if (data[Dictionary.getLanguage()]) {

            arr.push(data)
            this.setState({ items: arr });
          }


        }

      })
    }).catch(error => console.log(error));
  }
  render() {
    return (
      <div id="CheckBoxes">
        <CategoryCheckBox items={this.state.items} />
      </div>
    )
  }
}



function managerSignout() {
  auth.signOut();
  sessionStorage.removeItem("userConnect");
  sessionStorage.removeItem("userEmail");
  ReactDOM.render(<LoginComponent />, document.getElementById('root'));
  window.location.href = '/';
}
