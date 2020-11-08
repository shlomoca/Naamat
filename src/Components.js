import React, { Component } from 'react';
import $ from 'jquery';
import { LangBtn, Dictionary } from './Dictionary';
import logo from './images/naamatlogo.png';
import { FeedbackModal } from './forms/Forms';
import { db, auth } from './config/Firebase'
import { Link } from 'react-router-dom';
import { getWomen } from '../src/pages/woman page/WomanPage'
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
    mainUserPage= props.mainUserPage,
    logoHref = "/HomePage",
    back = "",
    logout = "";
  if (!Admin) {
    
    logoHref = "/"
  }
  else {
    logout = <li className="nav-item"><button id="signOutBtn" type="button" className="btn btn-primary nav-link" onClick={managerSignout} > {Dictionary.signOut}</button > </li>
  }
  if (categoryPage||(!Admin&&!mainUserPage)) {
    back = <Link to='/'><button type="button" className="btn btn-primary nav-link" >{Dictionary.homePageBack}</button ></Link>
    $("#catBtn").click(() => window.location.reload());
  }
  return (
    <div id="navbar">
     
      <FeedbackModal />
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navList">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

          <li className="nav-item">
            <a id="smallLogo" href={logoHref} dir="rtl"><img id="logo" src={logo} alt="logo"></img></a>
          </li>
        <div class="collapse navbar-collapse" id="navbarToggler">
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
            <button type="button" className="btn btn-primary nav-link" data-toggle="collapse" data-target="#about-drop">{Dictionary.aboutTitle}</button>   
          </li>
          <li className="nav-item" id="stretcher">
            <Search  admin ={Admin}/>
          </li>
          <li className="nav-item flex-end">{back}</li>
          <li className="nav-item flex-end">
            {<Buttons AdminPage={AdminPage} Admin={Admin} />}
          </li>

          {logout}
        </div>
        </ul>
      </nav>
      <div id="about-drop" className="collapse">
        {Dictionary.about}
      </div>
    </div>
  )
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
      getWomen(term,this.props.admin);
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
    return (
      <form className="form-inline my-2 my-lg-0 input-group mb-3" id="search-form">
        <button id="search-btn" type="button">
          <div id="search-bar-outline">
            <input className="form-control" id="example-search-input4" autoComplete="off" onKeyUp={this.searchHandler} type="text" placeholder={Dictionary.search}  />

          </div>
          <i className="fa fa-search" id="search-icon"></i>
        </button>

        <div id="womenHolder"></div>
      
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
     

    </div>
  )
}


//will show a modal: gets info ("details") and a url ("link") 
export const DisplayModal = (props) => {

  return (
    <div>
      <button className="clearBtn" data-toggle="modal" data-target={"#displayModal"+props.id}> <a href="#">{props.details}</a></button>
      <div className="modal fade" id={"displayModal"+props.id} data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content higest" >
            <div className="modal-header ">
              <h5 className="modal-title" id="staticBackdropLabel">{props.details}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body higher" >
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





// export const AfterMessage = (props) => {

//   return (
//     <div>
//       {/* <button className="clearBtn" data-toggle="modal" data-target="#afterMessage"> <a href="#">something</a></button>  */}
//       <div className="modal fade" id="afterMessage" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//         <div className="modal-dialog modal-xl">
//           <div className="modal-content">
//             <div className="modal-header ">
//               {/* <h5 className="modal-title" id="staticBackdropLabel"></h5>  */}
//             </div>
//             <div className="modal-body">
//               <h1>{props.info}</h1>
//             </div>
//             <div align="center">
//               <button type="button" className="close" className="btn btn-secondary close" data-dismiss="modal">{Dictionary.close}</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

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
      obj = <Link to="/"><button type="button" className="btn btn-primary nav-link" >{Dictionary.managmentPlatform}</button></Link>
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
          else
          return <div></div>
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
  alert(Dictionary.logOutSuccessful)
  ReactDOM.render(<LoginComponent />, document.getElementById('root'));
}
