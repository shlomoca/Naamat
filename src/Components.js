import React, { Component } from 'react';
import $ from 'jquery';
import { LangBtn, Dictionary } from './Dictionary';
import logo from './images/naamatlogo.png';
import fblogo from './images/fblogo.png';
import ytlogo from './images/ytlogo.png';
import { showing } from './Components.css';
import { EditWomanModal, AddCategoryModal, FeedbackModal, SuggestWoman } from './forms/Forms';
import { db } from './/config/Firebase'
import { Link } from 'react-router-dom';
import LoginPage from './pages/login page/LoginPage';
import { auth } from 'firebase';
import { getWomen, WomenDeck } from '../src/pages/woman page/WomanPage'
import ScrollUpButton from "react-scroll-up-button";
import ReactDOM from 'react-dom';
import { storage } from './config/Firebase'





//set a navigation bar to the top of the site
//under the navigation bar there is a 
export const NavBar = (props) => {

  var obj = <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#feedbackForm">{Dictionary.feedback}</button>

  if (props.admin == "true")
    obj = <Link to="/AdminPage"><button type="button" className="btn btn-primary nav-link" >manager</button></Link>


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

          {/* <li className="nav-item">
            <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#categoryForm">
              {Dictionary.addcategory}</button>
          </li> */}

          <li className="nav-item">
            <button type="button" className="btn btn-primary nav-link" data-toggle="modal" data-target="#suggestWomanModal">
              {Dictionary.suggest}</button>
          </li>


          {/* <li className="nav-item">
            <button type="button" class="btn btn-primary nav-link" data-toggle="modal" data-target="#staticBackdrop">
              {Dictionary.addWoman}
            </button>
          </li> */}

          <li className="nav-item">
            <button type="button" class="btn btn-primary nav-link" data-toggle="collapse" data-target="#about-drop">{Dictionary.aboutTitle}</button>
          </li>

          <li className="nav-item" id="stretcher">
            <Search />
            <div id="womenHolder"></div>
          </li>


          <li className="nav-item">
            {obj}
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

  db.collection('users').doc("AccessControl").collection(userEmail).doc("permissions").get().then(res => {
    console.log(res.data());
    permission = res.data().admin;
    console.log(permission);
    if (permission == "true") alert("manager")
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
    this.setState({ term: event.target.value })
    var term = (this.state.term).toLowerCase();
    // getWomen(term);
  }


  render() {
    var term = (this.state.term).toLowerCase();
    return (
      <form className="form-inline my-2 my-lg-0 input-group mb-3" id="search-form">
        <button id="search-btn" type="button">
          <div id="search-bar-outline">
            <input class="form-control " onChange={this.searchHandler} type="text" placeholder={Dictionary.search} id="example-search-input4" />
            <button id="clear-btn" type="button">
              <i class="fa fa-close" onClick={() => document.getElementById('example-search-input4').value = ''}></i>
            </button>
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
      <a>{Dictionary.builders} </a>
      <a href="#"><img id="fblogo" src={fblogo} alt="facebook" /> נעמת בפייסבוק</a>
      <a href="#"> <img id="ytlogo" src={ytlogo} alt="youtube" /> נעמת ביוטיוב</a>


    </div>
  )
}




export class PictursCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: [],
      ids: ["גולדה מאיר1898-03-03", "דניאל רז1992-03-31", "סהר כהן1995-09-21", "עדיאל צייג2020-06-01", "שלמה כרמי1993-06-09"],
      indicators: [],
      items: [],
      dataslide: 0,
    }
  }

  componentDidMount() {
    var active = false;

    var active = true;
    var ids = this.state.ids;
    var indicators = [];
    var items = [];
    ids.forEach(id => {
      console.log(id);
      db.collection('women').doc(id).collection('langs').doc(Dictionary.getLanguage()).get().then(snapshot => {
        if (snapshot.data()) {
          var data = snapshot.data();
          if (data) {

            var id = data["id"];
            // console.log(id + "/ProfilePic");
            if (id)
              storage.ref("/" + id).child("ProfilePic").getDownloadURL().then(url => {
                if (this.state.dataslide != 0)
                  active = false;
                indicators.push(<CarouselLi dataslide={this.state.dataslide} active={active} />);
                items.push(<CarouselSlide display={data["display"]} highlights={data["highlights"]} id={id} src={url} active={active} />);
                this.setState({ indicators: indicators });
                this.setState({ items: items });
                this.setState({ dataslide: this.state.dataslide + 1 });
              });
          }
        }
      })

    })
    console.log(indicators)

  }
  render() {
    console.log("rendering");
    return (
      <div id="pictureCarousel">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol id="carouselIndicators" class="carousel-indicators">
            {this.state.indicators}
          </ol>
          <div id="carouselInner" class="carousel-inner">
            {this.state.items}
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    )
  }
}
// export const PictursCarousel = (props) => {
//   return (
//     <div id="pictureCarousel">
//       <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
//         <ol id="carouselIndicators" class="carousel-indicators">
//           <li data-target="#carouselIndicators" data-slide-to="0" class="active"></li>
//           <li data-target="#carouselIndicators" data-slide-to="1"></li>
//           <li data-target="#carouselIndicators" data-slide-to="2"></li>
//         </ol>
//         <div id="carouselInner" class="carousel-inner">
//           <div class="carousel-item active">
//             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Maimon_ada.jpeg/375px-Maimon_ada.jpeg" class="d-block w-100" alt="example 1" height="600px" width="115" />
//             <div class="carousel-caption d-none d-md-block pictureDiscription">
//               <h5>עדה פישמן מיימון</h5>
//               <p>מהמייסדות ומהמובילות של מפלגת הפועל הצעיר ותנועת הפועלות, חברת הכנסת הראשונה והשנייה מטעם מפא"י ומהיוזמות של חוק שיווי זכויות האשה (תשי"א). כל חייה פעלה למען שיפור מעמד הנשים ולהבטחת שוויון זכויות מלא .</p>
//             </div>
//           </div>
//           <div class="carousel-item">
//             <img src="https://q-cf.bstatic.com/images/hotel/max1280x900/148/148914590.jpg" class="d-block w-100" alt="example 2" height="600px" width="115" />
//             <div class="carousel-caption d-none d-md-block pictureDiscription">
//               <h5>Test 2</h5>
//               <p>Summary 2</p>
//             </div>
//           </div>
//           <div class="carousel-item">
//             <img src="https://q-cf.bstatic.com/images/hotel/max1280x900/169/169438098.jpg" class="d-block w-100" alt="example 3" height="600px" width="115" />
//             <div class="carousel-caption d-none d-md-block pictureDiscription">
//               <h5>Test 3</h5>
//               <p>Summary 3 aaaaaaa aaaaaaaaa aaaaaaaa aaa aaaa aaaaaaaaaaaaaaa aaaaa aaaaaaa aaaaaaa aaaaaaa aaa aaaaaaaaaa aa aaaaaa aaaaaaa aaaaaa aaaaaa</p>
//             </div>
//           </div>
//         </div>
//         <a class="carousel-control-prev" href="#carouselIndicators" role="button" data-slide="prev">
//           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span class="sr-only">Previous</span>
//         </a>
//         <a class="carousel-control-next" href="#carouselIndicators" role="button" data-slide="next">
//           <span class="carousel-control-next-icon" aria-hidden="true"></span>
//           <span class="sr-only">Next</span>
//         </a>
//       </div>
//     </div>
//   )
// }

export const CarouselSlide = props => {

  var clas = "carousel-item";
  if (props.active)
    clas = "carousel-item active";
  return (
    <div class={clas}>
      <img src={props.src} class="d-block w-100" alt="example 1" height="600px" width="115" />
      <div class="carousel-caption d-none d-md-block pictureDiscription">
        <h5>{props.display}</h5>
        <p>{props.womanHighlights}</p>
      </div>
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
                allow='autoplay; encrypted-media'
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

export function getFeedback() {
  // console.log("matan and sahar");
  //get all the women that ae in the lexicografical area of the search term womanName
  // $("#thisAdmin").hide();
  db.collection('feedbacks').get().then(snapshot => {
    const feedbacks = [];
    //get a women arry with all women results for this search
    snapshot.forEach(doc => {
      const data = doc.data();
      if (data) {
        feedbacks.push(data);
      }
      else
        console.log("no data");

    });
    // console.log(feedbacks);
    if (feedbacks.length === 0)
      console.log("no feedbacks");
    else {
      ReactDOM.render(<DisplayFeedback feedbacks={feedbacks} />, document.getElementById('feedBackHolder'));
    }


  }).catch(error => console.log(error))

  return (

    <div> </div>

  )

}

export const FeedBackBody = (props) => {

  return (

    <thead>
      <tr>
        {/* <td> {props.date} </td> */}
        <td> {props.name} </td>
        <td> {props.email} </td>
        <td> {props.score} </td>
        <td> {props.improvement} </td>
        <td> <button class="btn" onClick={deleteFeedBack(props.name + props.email)}>מחק</button> </td>
      </tr>
    </thead>

  )

}

export const FeedBackHeader = () => {

  return (
    <thead>
      <tr>
        {/* <th> Date </th> */}
        <th> שם </th>
        <th> דואר אלקטרוני </th>
        <th> דירוג </th>
        <th> הצעות לשיפור </th>
        <th> </th>
      </tr>
    </thead>
  )
}

export const DisplayFeedback = (props) => {

  var name, email, score, improvement;
  const vals = Object.values(props.feedbacks);
  const deck = [];
  vals.map(feed => {
    Object.keys(feed).map(runner => {
      name = feed["feed_name"];
      email = feed["feed_email"];
      score = feed["score"];
      improvement = feed["improvement"];
    }
    )
    if (name && email && score && improvement) {
      deck.push(<FeedBackBody name={name} email={email} score={score} improvement={improvement} />);
    }

  })
  return (
    <div id="feedbackTable">
      <table table class="table table-dark">
        <FeedBackHeader />
        {deck}
        <button id="backBtn" class="btn" >חזור</button>
      </table>
    </div>
  )
}

//delete feedback by id
export function deleteFeedBack(id) {

  return () => {
    // console.log(id);
    if (id) {
      db.collection('feedbacks').doc(id).delete().then(() => {
        alert("feedback " + id + " was deleted");
        window.location.reload();
      });
    }
    else
      alert("wrong id");
  }
}
