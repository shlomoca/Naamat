import './AdminPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, PictursCarousel, DisplayModal, BottomBar, AfterMessage, usersManager } from '../../Components.js';
import { getWoman, WomenCard } from '../woman page/WomanPage';
import { Dictionary } from '../../Dictionary';
import { EditWomanModal, AddCategoryModal, FeedbackModal } from '../../forms/Forms';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';
import { db } from '../../config/Firebase';
import ReactDOM from 'react-dom';

class AdminPage extends Component {
    render() {
        return (
            <div id="mainUPWrapper" className="wrapper">
                <NavBar/>
                <EditWomanModal/>
                <AddCategoryModal/>
                <FeedbackModal/>
                <div class="backBtn">
                <Link to="/"><button id="backBtn" class="btn">{Dictionary.back}</button></Link>
                </div>
        <p id="adminTitle">{Dictionary.welcomeManager}</p>
                <div id="allAdmin"> 
                <div  class="adminButtons">
                    <div id="rightButtons">
                        <button class="btnhover" type="button" id="btn1" data-toggle="modal" data-target="#staticBackdrop"> {Dictionary.adminAddWoman} </button>
                        <button class="btnhover" type="button" id="btn2" > {Dictionary.adminEditWoman} </button>
                        <button class="btnhover" type="button" id="btn3" onClick={()=>{getFeedback()}}> {Dictionary.adminFeedback} </button>
                        {/* <button class="btnhover" type="button" id="btn4"> {Dictionary.adminEditAbout} </button> */}
                        <button class="btnhover" type="button" id="btn8"> חסר שימוש כרגע </button>
                    </div>
                    <div id="leftButtons">
                        <button class="btnhover" type="button" id="btn5" data-toggle="modal" data-target="#categoryForm"> {Dictionary.adminAddCategory} </button>
                        <button class="btnhover" type="button" id="btn6" onClick={usersManager}> {Dictionary.adminUserManagement} </button>
                        <button class="btnhover" type="button" id="btn7">  חסר שימוש כרגע  </button>
                        <button class="btnhover" type="button" id="btn8"> חסר שימוש כרגע </button>
                    </div>
                </div>
                </div>
                <div id="feedBackHolder"></div>
            </div>
            
        );

    }
}
export default AdminPage


export function getFeedback() {
    // console.log("matan and sahar");
    //get all the women that ae in the lexicografical area of the search term womanName
    $("#allAdmin").hide();
    $("#feedBackHolder").show()
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
        <tr id={props.name + props.email}>
          {/* <td> {props.date} </td> */}
          <td> {props.name} </td>
          <td> {props.email} </td>
          <td> {props.score} </td>
          <td> {props.improvement} </td>
          <td> <button class="btn" onClick={askAndDelete(props.name + props.email)} >{Dictionary.delete}</button></td>
          {/* <td> <button class="btn" onClick={deleteFeedBack(props.name + props.email)}>מחק</button> </td> */}
          {/* onclick="if (confirm('Are you...?')) commentDelete(1); return false" */}
          {/* <td> <button class="btn" onClick={() => { if (window.confirm('בטוח שתרצה למחוק?')) deleteFeedBack(props.name+props.email) } }>מחק</button> </td> */}
        </tr>
      </thead>
  
    )
  }


  export const FeedBackHeader = (props) => {
var feilds=props.feilds;
const res=[]
feilds.forEach({

})
    return (
      <thead>
        <tr>
          {/* <th> Date </th> */}
          <th> {Dictionary.name} </th>
          <th> {Dictionary.email} </th>
          <th> {Dictionary.score} </th>
          <th> {Dictionary.improvement}  </th>
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
          <button onClick={hideFeedTable()} id="backBtn" class="btn" >{Dictionary.back}</button>
        </table>
      </div>
    )
  }

  export function askAndDelete(id) {

  return () => {

    var del = window.confirm(Dictionary.areYouSure);
    // console.log(del);
    if (del == true) {
      deleteFeedBack(id)
    }
    // return deleteFeedBack(id);
  }
}
//delete feedback by id
export function deleteFeedBack(id) {

  console.log(id);
  if (id) {
    db.collection('feedbacks').doc(id).delete().then(() => {

      ReactDOM.render(<div></div>, document.getElementById(id));

    });
  }
  else
    alert(Dictionary.error);
}


//hiding feedback table and showing the managment buttons again
function hideFeedTable(id) {
    return () => {
  
      $("#allAdmin").show();
      $("#feedBackHolder").hide()
    }
  
  }

$(document).ready(() => {
//    deleteWoman("דניאל רז2020-06-10");


});
