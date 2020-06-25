import React, { Component } from 'react';
import $ from 'jquery';
import { LangBtn, Dictionary } from './Dictionary';
import logo from './images/naamatlogo.png';
import fblogo from './images/fblogo.png';
import ytlogo from './images/ytlogo.png';
import { EditWomanModal, AddCategoryModal, FeedbackModal, SuggestWoman } from './forms/Forms';
import { db } from './config/Firebase'
import { Link } from 'react-router-dom';
import { getWomen, WomenDeck } from '../src/pages/woman page/WomanPage'
import ScrollUpButton from "react-scroll-up-button";
import ReactDOM from 'react-dom';
import { storage } from './config/Firebase'
import { showing } from './Components.css';
import { ShowHideFunc } from './pages/Admin Page/AdminPage';


//set a navigation bar to the top of the site
//under the navigation bar there is a 
export const NavBar = (props) => {
var AdminPage = props.AdminPage,
Admin= props.Admin;


  return (
    <div id="navbar">

      <EditWomanModal />
      <AddCategoryModal />
      <SuggestWoman />
      <FeedbackModal />
      <ScrollUpButton />
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navList">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <ul className="navbar-nav mr-auto mt-2 mt-lg-0" dir="rtl">
          <li className="nav-item">
            <a id="smallLogo" href="/" dir="rtl"><img id="logo" src={logo} alt="logo"></img></a>
          </li>
          <li id="langItam" className="nav-item" >
            <LangBtn />
          </li>



          <li className="nav-item" >
            <Link to="/Category">
              <button type="button" className="btn btn-primary nav-link" >
                {Dictionary.categories}</button>
            </Link>
          </li>


          <li className="nav-item">
            <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#suggestWomanModal">
              {Dictionary.suggest}</button>
          </li>

          <li className="nav-item">
            <button type="button" class="btn btn-primary nav-link" data-toggle="collapse" data-target="#about-drop">{Dictionary.aboutTitle}</button>
          </li>

          <li className="nav-item" id="stretcher">
            <Search />
            <div id="womenHolder"></div>
          </li>


          <li className="nav-item">
            {<Buttons AdminPage={AdminPage} Admin={Admin}/>}
          </li>



        </ul>

      </nav>


      <div id="about-drop" class="collapse">
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
  });
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
            <input class="form-control " autoComplete="off" onKeyUp={this.searchHandler} type="text" placeholder={Dictionary.search} id="example-search-input4" />

          </div>
          <i class="fa fa-search" id="search-icon"></i>
        </button>
        <div id="temp">
          {/* {getWomen(term)} */}
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
      <a id="facebook" href="https://www.facebook.com/womenatwork" data-target="#mymodal"><img id="fblogo" src={fblogo} alt="facebook" />{Dictionary.NaamatInFacebook}</a>
      <a id="youtube" href="https://www.youtube.com/embed/channel/UCdKKqQogmEQp7KNDRYCnV6A"> <img id="ytlogo" src={ytlogo} alt="youtube" />{Dictionary.NaamatInYoutube}</a>
      {/* <DisplayModal link='https://www.youtube.com/embed/watch?v=vg2gscdAQBo' details='Wikipedia' /> */}

    </div>
  )
}

export class PictursCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: [],
      ids: ["גולדה מאיר1898-03-03", "דניאל רז1992-03-31", "סהר כהן1995-09-21", "עדיאל צייג2020-06-01", "שלמה כרמי1993-06-09","עדה פישמן מימון1893-10-08"],
      indicators: [],
      items: [],
      dataslide: 0,
    }
  }

  componentDidMount() {
    var active = true;
    var ids = this.state.ids;
    var indicators = [];
    var items = [];
    ids.forEach(id => {
      db.collection('women').doc(id).get().then(snapshot => {
        if (snapshot.data()) {
          var data = snapshot.data();
          if (data) {
            // var id = data["id"];
            if (data["ProfilePic"]) {
              if (this.state.dataslide != 0)
                active = false;
              indicators.push(<CarouselLi dataslide={this.state.dataslide} active={active} />);
              // {console.log(data["ProfilePic"])}
              items.push(<CarouselSlide display={data["display" + Dictionary.getLanguage()]} highlights={data["highlights" + Dictionary.getLanguage()]} id={id} src={data["ProfilePic"]} active={active} />);
              this.setState({ indicators: indicators });
              this.setState({ items: items });
              this.setState({ dataslide: this.state.dataslide + 1 });
            }

          }
        }
      })

    })
    console.log(indicators)

  }
  render() {
    return (
      <div id="pictureCarousel">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol id="carouselIndicators" class="carousel-indicators">
            {this.state.indicators}
          </ol>
          <div id="carouselInner" class="carousel-inner">
            {this.state.items}
          </div>
          <a class="carousel-control-prev arrow" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next arrow" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    )
  }
}


export const CarouselSlide = props => {

  var clas = "carousel-item";
  if (props.active)
    clas = "carousel-item active";
  return (
    <div class={clas}>
      <Link to={`/womanPage/${props.id}`}>
        <div class="d-block w-100 details" alt="example 1" height="500px" width="200px">
          <h1 class="displayName">{props.display}</h1>
          <img src={props.src} class="roundedImg" alt="example 1" height="150px" width="150px" />
        </div>
        <div class="carousel-caption d-none d-md-block pictureDiscription">
          <p><h3 class="highlights">{props.highlights}</h3></p>
        </div>
      </Link>
    </div>
  )
}

export const CarouselLi = props => {
  var clas = "";
  if (props.active)
    clas = "active";
  return (
    <li data-target="#carouselExampleIndicators" data-slide-to={props.dataSlideTo} className={clas}></li>
  )
}

//will show a modal: gets info ("details") and a url ("link") 
export const DisplayModal = (props) => {

  return (
    <div>
      <button class="clearBtn" data-toggle="modal" data-target="#displayModal"> <a href="#">{props.details}</a></button>
      <div class="modal fade" id="displayModal" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header ">
              <h5 class="modal-title" id="staticBackdropLabel">{props.details}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
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



// export const DisplayModal = (props) => {

//   return (
//     <div>
//       <button class="clearBtn" data-toggle="modal" data-target="#displayModal"> <a href="#">{props.details}</a></button>
//       <div class="modal fade" id="displayModal" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
//         <div class="modal-dialog modal-xl">
//           <div class="modal-content">
//             <div class="modal-header ">
//               <h5 class="modal-title" id="staticBackdropLabel">{props.details}</h5>
//               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div class="modal-body">
//               <iframe src={props.link}
//                 width="100%"
//                 height="100%"
//                 frameBorder='0'
//                 allow='autoplay; encrypted-media'
//                 allowFullScreen
//                 title='url' />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





export const AfterMessage = (props) => {

  return (
    <div>
      {/* <button class="clearBtn" data-toggle="modal" data-target="#afterMessage"> <a href="#">something</a></button>  */}
      <div class="modal fade" id="afterMessage" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header ">
              {/* <h5 class="modal-title" id="staticBackdropLabel"></h5>  */}
            </div>
            <div class="modal-body">
              <h1>{props.info}</h1>
            </div>
            <div align="center">
              <button type="button" class="close" class="btn btn-secondary" data-dismiss="modal">{Dictionary.close}</button>
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
  
  if (props.Admin){
      if(props.AdminPage){
          obj=<Link to="/"><button type="button" className="btn btn-primary nav-link" >{Dictionary.homePageBack}</button></Link>
      }
      else
      obj = <Link to="/AdminPage"><button type="button" id="managerBtn"  className="btn btn-primary nav-link" >{Dictionary.managmentPlatform}</button></Link>
  }
      else
      obj = <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#feedbackForm">{Dictionary.feedback}</button>

  return obj;

}