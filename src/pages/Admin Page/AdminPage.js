import './AdminPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar, DisplayModal, BottomBar, AfterMessage, usersManager } from '../../Components.js';
import { getWoman, WomenCard } from '../woman page/WomanPage';
import { Dictionary } from '../../Dictionary';
import { EditWomanModal, CategoryModal, FeedbackModal, NewUserModal } from '../../forms/Forms';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';
import { db } from '../../config/Firebase';
import ReactDOM from 'react-dom';

class AdminPage extends Component {
    render() {
        return (
            <div id="APcover" className="cover">
                <div id="mainAPWrapper" className="wrapper">
                    <NavBar AdminPage={true} Admin={true} />
                    <EditWomanModal />
                    <CategoryModal />
                    <FeedbackModal />
                    <NewUserModal />
                    <div className="backBtn">
                        {/* <Link to="/"><button id="backBtn" className="btn">{Dictionary.back}</button></Link> */}
                    </div>
                    <p id="adminTitle">{Dictionary.welcomeManager}</p>
                    <div id="allAdmin">
                        <button className="btnhover" type="button" id="btn1" data-toggle="modal" data-target="#staticBackdrop"> {Dictionary.adminAddWoman} </button>
                        <button className="btnhover" type="button" id="btn2" > {Dictionary.adminEditWoman} </button>
                        <button className="btnhover" type="button" id="feedbackBtn" onClick={() => { getData("feedbackBtn", "feedback", ["name", "email", "improvement", "score"]) }}> {Dictionary.adminFeedback} </button>
                        <button className="btnhover" type="button" id="btn5" data-toggle="modal" data-target="#categoryForm"> {Dictionary.adminAddCategory} </button>
                        <button className="btnhover" type="button" id="categoriesBtn" onClick={() => { getData("categoriesBtn", "categories", ["category"]) }}> {Dictionary.manageCategory} </button>
                        <button className="btnhover" type="button" id="userMngBtn" onClick={() => { getData("userMngBtn", "users", ["email", "admin"]) }}> {Dictionary.adminUserManagement} </button>
                        {/* <button className="btnhover" type="button" id="btn4"> {Dictionary.adminEditAbout} </button> */}

                    </div>
                    <div id="TableHolder"></div>
                </div>
                <BottomBar />
            </div >

        );
    }
}
export default AdminPage

//insert the collaction that you are looking to take data from and an array of the feilds that you are intrested in getting in your table
//note that if not all feilds will be full the row will not be presented. 
export function getData(btnId, collect, fields, unCheckedFields) {
    ShowHideFunc(["TableHolder"], ["allAdmin"])
    db.collection(collect).get().then(snapshot => {
        const data = [];
        //extract data from snapshot
        snapshot.forEach(doc => {
            const info = doc.data();
            if (info) {
                data.push(info);
            }
            else
                console.log("no data");

        });
        if (data.length === 0)
            alert(Dictionary.nothingToShow);
        else {
            //render the table
            ReactDOM.render(<DisplayData btnId={btnId} collect={collect} data={data} fields={fields} unCheckedFields={unCheckedFields} />, document.getElementById('TableHolder'));
        }

    }).catch(error => console.log(error))
}




//DisplayData will enter the data in to the table 
const DisplayData = (props) => {
    var fields = props.fields,//fields to search for in data
    unCheckedFields=props.unCheckedFields,//fields to search for in data that might not be full
        collect = props.collect,//the collection that the data was taken from
        data = props.data,//the array that the data was pushed in to
        btnId = props.btnId,// get button id from props 
        id;//takes id from data
    const body = [];
    var index = 1;
    data.forEach(singleRow => {
        var col = [];
        var allCollsFull = true;
        col.push(<td className="textAlign index">{index++}</td>);
        //go through the data and take only the requierd feilds
        if(fields)
        fields.forEach(field => {
            if (singleRow[field] != undefined && singleRow[field] != "")
                col.push(String(singleRow[field]));
            else
                allCollsFull = false;
        })
        if(unCheckedFields)
        unCheckedFields.forEach(field => {
            if (singleRow[field] != undefined && singleRow[field] != "")
                col.push(String(singleRow[field]));
                else
                col.push(String("-"));
        })
        //get id from the DB
        id = singleRow["id"];
        if (allCollsFull) {
            body.push(<BuildTableBody collect={collect} id={id} colls={col} />);
        }
        else {
            console.log("col not full so it was not added");
            console.log(col);
        }


    })

    const serviceButtons = [];
    serviceButtons.push(<button onClick={() => ShowHideFunc(["allAdmin"], ["TableHolder"])} id="backBtn" className="btn" >{Dictionary.back}</button>)
    if (btnId == "userMngBtn") {
        serviceButtons.push(<button className="btn" id="addUserBtn" data-toggle="modal" data-target="#newUserModal">{Dictionary.addUserBtn}</button>)
    }

    return (
        <div id="feedbackTable">
            <table className="table table-dark">
                <BuildTableHead fields={fields} unCheckedFields={unCheckedFields}/>
                <tbody>
                    {body}
                </tbody>
                <div id="buttonsTable">
                    {serviceButtons}
                </div>
            </table>
        </div>
    )
}
//asks if action is inteded and renders the item out of the container
export function askAndDelete(collect, id) {
    return () => {
        var del = window.confirm(Dictionary.areYouSure);
        if (del == true)
            removeItem(collect, id);
    }
}
//delelte id in collaction and render it out of the container
export function removeItem(collect, id) {
    console.log(collect, id);
    if (id) {
        db.collection(collect).doc(id).delete().then(() => {
            ReactDOM.render(<a></a>, document.getElementById("tr" + id));
            console.log(collect, id);
            alert(Dictionary.collect + " " + Dictionary.deletedSuccessfully);//see how to make collect readable
        });
    }
    else
        alert(Dictionary.error);
}


//show everything in the show array and hide all from the hide array
export function ShowHideFunc(show, hide) {
    if (show)
        show.forEach(shower => {
            $("#" + shower).show();
        })
    if (hide)
        hide.forEach(hider => {
            $("#" + hider).hide();
        })
}

//gets all fuilds requierd and maks a table head
export const BuildTableHead = (props) => {
    var fields = props.fields,
    unCheckedFields = props.unCheckedFields;
    const res = []
    res.push(<th className="textAlign">#</th>)
    if (fields)
        fields.forEach(field => {
            res.push(<th className="textAlign"> {Dictionary[field]} </th>)
        })
    if (unCheckedFields)
        unCheckedFields.forEach(field => {
            res.push(<th className="textAlign"> {Dictionary[field]} </th>)
        })
    return (
        <thead>
            <tr>
                {res}
            </tr>
        </thead>
    )
}
//put a row of objects in to the table one collum at a time
export const BuildTableBody = (props) => {
    var colls = props.colls,//data colums
        collect = props.collect,
        id = props.id;

    var tds = [];

    colls.forEach(col => {
        tds.push(<td className="textAlign"> {col} </td>);
    });
    tds.push(
        <td className="deleteBtnTd" > <button className="btn-danger deleteBtn" onClick={askAndDelete(collect, id)} >{Dictionary.delete}</button></td>
    );
    return (
        <tr id={"tr" + id}>
            {tds}
        </tr>
    )
}


$(document).ready(() => {
    //    deleteWoman("דניאל רז2020-06-10");


});
