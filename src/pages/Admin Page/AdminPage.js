import './AdminPage.css';
import $ from 'jquery';
import React, { Component } from 'react';
import { NavBar,  BottomBar } from '../../Components.js';
import {  determineLang } from '../woman page/WomanPage';
import { Dictionary ,langs} from '../../Dictionary';
import { EditWomanModal, CategoryModal, FeedbackModal, NewUserModal, DidYouKnowModal } from '../../forms/Forms';
import { db } from '../../config/Firebase';
import ReactDOM from 'react-dom';


class AdminPage extends Component {
    render() {
        return (
            <div id="APcover" className="cover">
                <div id="mainAPWrapper" className="wrapper">
                    <NavBar AdminPage={true} Admin={true}  />
                    <EditWomanModal />
                    <CategoryModal />
                    <FeedbackModal />
                    <NewUserModal />
                    <DidYouKnowModal />
                    <p id="adminTitle" className="titles">{Dictionary.welcomeManager}</p>
                    <div id="allAdmin">
                        <button className="btnhover" type="button" id="btn1" data-toggle="modal" data-target="#staticBackdrop"> {Dictionary.adminAddWoman} </button>
                        <button className="btnhover" type="button" id="feedbackBtn" onClick={() => { getData("feedbackBtn", "feedback", ["name", "email", "score"], ["improvement", "createdAt"]) }}> {Dictionary.adminFeedback} </button>
                        <button className="btnhover" type="button" id="sugWomenMngBtn" onClick={() => { getData("sugWomenMngBtn", "suggest_women", ["yourName", "yourEmail", "display"]) }}> {Dictionary.manageOffers}</button>
                        <button className="btnhover" type="button" id="categoriesBtn" onClick={() => { getData("categoriesBtn", "categories", ["category"]) }}> {Dictionary.manageCategory} </button>
                        <button className="btnhover" type="button" id="userMngBtn" onClick={() => { getData("userMngBtn", "users", ["email", "admin"]) }}> {Dictionary.adminUserManagement} </button>
                        <button className="btnhover" type="button" id="factMngBtn" onClick={() => { getData("factMngBtn", "didYouKnow", ["langs"]) }}> {Dictionary.didYouKnow} </button>
                        <button className="btnhover" type="button" id="backupWomen" onClick={() => { IndexDataByCollaction("women") }}>  {Dictionary.backupWomen} </button>
                        <button className="btnhover" type="button" id="backupDidYouKnow" onClick={() => { IndexDataByCollaction("didYouKnow") }}>  {Dictionary.backupdidYouKnow} </button>
                    </div>
                    <div id="TableHolder"></div>
                </div>
                <BottomBar />
            </div >

        );
    }
}
export default AdminPage


// calls the collaction from the DB and sends it to the indexing method
function IndexDataByCollaction(collect){
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
            alert("Error, no data in database");
        else {
            // send the index method the data
            indexAndBackup(data,collect);
        }

    }).catch(error => console.log(error));
}

//download a json object
function downloadObject(obj, filename){
    var blob = new Blob([JSON.stringify(obj, null, 2)], {type: "application/json;charset=utf-8"});
    var url = URL.createObjectURL(blob);
    var elem = document.createElement("a");//make an element pointing to the blob
    elem.href = url;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();//download the data
    document.body.removeChild(elem);
  }

//index a collaction and download a backup of the collaction
function indexAndBackup(data,collect){
    let newDocumentName= collect + " Index";
    let IDs= {};
    let backup={};
    data.forEach(singleRow => {
        let languages = [];
        let id = singleRow.id;
        (langs).forEach(lang=>{
            if(singleRow[lang])
                languages.push(lang);
        })
        IDs[id]=languages;
        backup[singleRow.id] = singleRow;
    })
    //update the index collaction with the correct index
    db.collection('indexes').doc(newDocumentName).set({IDs}).then(() => {//save the index in the index collaction
            alert(Dictionary[collect]+" "+ Dictionary.backedUpSuccessfully);
    }).catch(function (error) {
        alert(error)
    });

downloadObject(backup, collect + " backup: "+ new Date()+".json");
}


//insert the collaction that you are looking to take data from and an array of the feilds that you are intrested in getting in your table
//note that if not all feilds will be full the row will not be presented. 
export function getData(btnId, collect, fields, unCheckedFields) {
    ShowHideFunc(["TableHolder"], ["allAdmin", "adminTitle"]);
    db.collection(collect).get().then(snapshot => {
        const data = [];
        //extract data from snapshot
        snapshot.forEach(doc => {//doc is a woman suggested
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
        unCheckedFields = props.unCheckedFields,//fields to search for in data that might not be full
        collect = props.collect,//the collection that the data was taken from
        data = props.data,//the array that the data was pushed in to
        btnId = props.btnId,// get button id from props 
        id;//takes id from data
    const body = [];
    var index = 0;
    data.forEach(singleRow => {
        var col = [];
        var allCollsFull = true;
        col.push(<td className="textAlign index">{index++}</td>);
        //go through the data and take only the requierd feilds
        if (fields)
            fields.forEach(field => {
                console.log(singleRow[Dictionary.getLanguage()]);
                console.log(singleRow[field]);
                if (singleRow[field] || singleRow[field] === false) {
                    col.push(String(singleRow[field]));
                }
                else if (singleRow[Dictionary.getLanguage()])
                    col.push(String(singleRow[Dictionary.getLanguage()]));
                else
                    allCollsFull = false;

            })
        if (unCheckedFields)
            unCheckedFields.forEach(field => {
                if (singleRow[field] !== undefined && singleRow[field] != "")
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
    
    return (

        <div id="feedbackTable">
            <p id="tableTitle" className="titles">{Dictionary[collect]}</p>
            <table className="table table-dark">
                <BuildTableHead fields={fields} unCheckedFields={unCheckedFields} />
                <tbody>
                    {body}
                </tbody>
                <tr>
                    <div id="buttonsTable">
                        <ServiceButtons btnId={btnId} />
                    </div>
                </tr>
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
    if (id) {
        db.collection(collect).doc(id).delete().then(() => {
            ReactDOM.render(<a></a>, document.getElementById("tr" + id));
            alert(Dictionary[collect] + " " + Dictionary.deletedSuccessfully);
        }).catch(error => console.log(error));
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
        if (ValidateEmail(col))
            tds.push(<td className="textAlign">  <a href={"mailto:" + col}> {col}</a> </td>);
        else
            tds.push(<td className="textAlign"> {col} </td>);
    });
    if (collect == "suggest_women")
        tds.push(<td className="editSuggest" > <button className="btn" onClick={() => editSuggestWomen(id)} >{Dictionary.edit}</button></td>)
    tds.push(

        <td className="deleteBtnTd" > <button className="btn-danger deleteBtn" onClick={askAndDelete(collect, id)} >{Dictionary.delete}</button></td>
    );
    return (
        <tr id={"tr" + id}>
            {tds}
        </tr>
    )
}


//make custum buttons by btnId prop
export const ServiceButtons = (props) => {
    var btnId = props.btnId;

    const serviceButtons = [];
    if (btnId) {
        serviceButtons.push(<td><button onClick={() => { ShowHideFunc(["allAdmin", "adminTitle"], ["TableHolder"]); window.location.reload(); }} id="backBtn" className="btn" >{Dictionary.back}</button></td>)
        if (btnId == "userMngBtn") {
            serviceButtons.push(<td><button className="btn" id="addUserBtn" data-toggle="modal" data-target="#newUserModal">{Dictionary.addUserBtn}</button></td>)
        }
        else if (btnId == "factMngBtn") {
            serviceButtons.push(<td><button className="btn" id="addFactBtn" data-toggle="modal" data-target="#DidYouKnowModal">{Dictionary.AddNewFact}</button></td>)
        }
        else if (btnId == "categoriesBtn") {
            serviceButtons.push(<td><button className="btn" id="addCategoryBtn" data-toggle="modal" data-target="#categoryForm">{Dictionary.adminAddCategory}</button></td>)
        }

    }
    return (<tr id="lastrow">{serviceButtons}</tr>)

}


//add women to the add woman modal
function editSuggestWomen(id) {
    var woman;
    db.collection('suggest_women').doc(id).get().then(doc => {
        woman = doc.data();
        $("#name").val(woman.display);
        Object.keys(woman).forEach(field => {
            $("#" + field + determineLang(woman.display)).val(woman[field]);
        })
        alert(Dictionary[determineLang(woman.display)]);
    }).catch(error => console.log(error));

    window.$("#staticBackdrop").modal('show');
}

//make sure that a email was enterd
function ValidateEmail(mail) {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
}
$(document).ready(() => {

});
