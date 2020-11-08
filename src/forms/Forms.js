import './Forms.css';
import $ from 'jquery';
import 'jquery-validation';
import React from 'react';
import { db, auth } from '../config/Firebase'
import { Dictionary, langs, getRTL } from '../Dictionary';
import ImageUpload, { MultiImageUpload } from './ImageUpload';
import {  CollectionCheckBox } from '../Components';
import { loadWomanToModal } from '../pages/woman page/WomanPage';

import { ShowHideFunc } from '../pages/Admin Page/AdminPage';
import * as moment from 'moment';
import 'moment/locale/he'


export const NewUserModal = () => {
    return (
        <div className="modal fade" id="newUserModal">
            <div className="modal-dialog modal-lg" >
                <div className="modal-header">
                    <button type="button" onClick={resetForm("newUserForm")} className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.addUserBtn}</h5>
                </div>
                <div className="modal-content">
                    <div className="modal-body">
                        <form id="newUserForm" name="newUserForm" onSubmit={addNewUser}  >
                            <div className="form-group">
                                <label className="regularLabel">{Dictionary.enterMail}</label>
                                < input type="email"
                                    id="email"
                                    name="email"
                                    placeholder={Dictionary.enterMail}
                                    defaultValue="" required
                                >
                                </input>
                            </div>
                            <br></br>
                            <div className="form-group">
                                <label className="regularLabel">{Dictionary.enterPass}</label>
                                < input type="password"
                                    id="password"
                                    name="password"
                                    placeholder={Dictionary.enterPass}
                                    defaultValue="" required
                                >
                                </input>
                            </div>
                            <br></br>

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Admin</label>
                                </div>
                                <select className="custom-select" id="adminSelect" required>
                                    <option selected disabled="disabled">{Dictionary.isAdmin}</option>
                                    <option value={true} >Yes</option>
                                    <option value={false}>No</option>
                                </select>
                            </div>
                            <div className="modal-footer">
                                <button id="addUserBtn"
                                    type="submit"
                                    text={Dictionary.addUserBtn}
                                    className="btn btn-success"
                                    onClick={addNewUser} >
                                    {Dictionary.addUserBtn}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DidYouKnowModal = () => {
    return (
        <div className="modal fade" id="DidYouKnowModal">
            <div className="modal-dialog modal-lg" >
                <div className="modal-header">
                    <button type="button" onClick={resetForm("DidYouKnowForm")} className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.didYouKnow}</h5>
                </div>
                <div className="modal-content">
                    <div className="modal-body">
                        <form id="DidYouKnowForm" name="DidYouKnowForm" onSubmit={AddNewFact}  >

                            <div className="input-group mb-3">
                                <label className="regularLabel">{Dictionary.AddNewFact}</label>
                            </div>
                            <br></br>

                            <div className="form-group">

                                <div id="name-group1" className="form-group">
                                    <textarea className="facts" autoComplete="off" type="text" lang="HE" rows="2" cols="35" id="DidYouKnowHE" name="didYouKnow" placeholder={Dictionary.addHebFact} defaultValue="" />
                                    <textarea className="facts" autoComplete="off" type="text" lang="EN" rows="2" cols="35" id="DidYouKnowEN" name="didYouKnow" placeholder={Dictionary.addEngFact} defaultValue="" />
                                    <textarea className="facts" autoComplete="off" type="text" lang="AR" rows="2" cols="35" id="DidYouKnowAR" name="didYouKnow" placeholder={Dictionary.addArFact} defaultValue="" />
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button id="addFactBtn"
                                    type="submit"
                                    text={Dictionary.AddNewFact}
                                    className="btn btn-success"
                                    onClick={AddNewFact} >
                                    {Dictionary.AddNewFact}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export const EditWomanModal = () => {

    return (

        <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <form id="woman_form" name="woman_form" onSubmit={addWoman}  >
                        <div className="modal-header">
                            <button type="button" id="xClose" className="close" data-dismiss="modal" aria-label="Close" onClick={resetForm("woman_form", "fill1" + Dictionary.getLanguage(), "fill2" + Dictionary.getLanguage(), ["presentImages"])}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.addWoman}</h5>
                        </div>
                        <div className="modal-body">
                            <div id="step1">
                                <ul className="nav nav-pills sticky">
                                    <li id="liHE" className="langTabs active"><a class="nav-link active" data-toggle="tab" href="#HE" >עברית</a></li>
                                    <li id="liEN" className="langTabs"><a class="nav-link" data-toggle="tab" href="#EN" >English</a></li>
                                    <li id="liAR" className="langTabs"><a class="nav-link" data-toggle="tab" href="#AR" >عربى</a></li>
                                </ul>

                                <div className="addWomanContainer">
                                    <div className="form-group inputFeilds">
                                        <label className="regularLabel" htmlFor="name">{Dictionary.name}*</label>
                                        <input className="regularInput" autoComplete="off" type="text" cols="35" id="name" name="name" required />
                                    </div>

                                    <div className="form-group inputFeilds">
                                        <label className="regularLabel" htmlFor="birth" >{Dictionary.birth}*</label>
                                        <input className="regularInput" type="date" cols="35" id="birth" name="birth" required />
                                    </div>
                                    <div className="form-group inputFeilds">
                                        <label className="regularLabel" htmlFor="death">{Dictionary.death}</label>
                                        <input className="regularInput" type="date" cols="35" id="death" name="death" />
                                    </div>
                                    <p id="ImportantMSG">{Dictionary.ImportantMSG}</p>

                                    <div className="form-group">
                                        <button id="submitPart1" type="button" className="btn btn-success" onClick={() => { allreadyExist($("#name").val() + $("#birth").val()); }} >{Dictionary.next}</button>
                                    </div>
                                    <div id="popup">
                                        <span className="popuptext" id="myPopup">{Dictionary.popup}</span>
                                    </div>
                                </div>
                            </div>
                            <div id="step2">
                                <div id="profPicArea">
                                    <ImageUpload id="womanFormPic" param1="name" param2="birth" pathEnd="/ProfilePic" param1Empty="name not enterd" param2Empty="date of birth not ented" />
                                </div>
                                <div className="tab-content">
                                    <GenralForm lang={langs[0]} active={Dictionary.getLanguage() === langs[0]} />
                                    <GenralForm lang={langs[1]} active={Dictionary.getLanguage() === langs[1]} />
                                    <GenralForm lang={langs[2]} active={Dictionary.getLanguage() === langs[2]} />
                                </div>
                                {/* <label htmlFor="acceptFiles">{Dictionary.acceptFiles} </label> */}
                                <MultiImageUpload param1="name" param2="birth" param1Empty="name not enterd" param2Empty="date of birth not ented" />

                                <label htmlFor="categorySelect"><b>{Dictionary.choseCategory}</b> </label>
                                <CollectionCheckBox colc={"categories"} doc={"categories"} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="requiredFooter" > {Dictionary.mustfilled}  </div>
                            <button type="button" className="btn btn-secondary" onClick={resetForm("woman_form", "fill1" + Dictionary.getLanguage(), "fill2" + Dictionary.getLanguage(), ["presentImages"])} data-dismiss="modal">{Dictionary.close}</button>
                            <button type="submit" htmlFor="woman_form" className="btn btn-success" id="submit_form" >{Dictionary.submit} </button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    );
}

export const SuggestWomanModal = () => {
    var j = 0;
    return (

        <div className="modal fade" id="suggestWomanModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <form id="suggest_woman_form" name="suggest_woman_form" onSubmit={addsuggest}  >
                        <div className="modal-header">
                            <button type="button" id="xClose" className="close" data-dismiss="modal" aria-label="Close" onClick={resetForm("suggest_woman_form", "fill20")}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.suggest}</h5>
                        </div>

                        <div className="modal-body">

                            <div className="form-group">
                                <label className="regularLabel" htmlFor="yourName">{Dictionary.name}*</label>
                                <input type="text" rows="1" autoComplete="off" className="regularInput" cols="35" id="yourName" name="yourName" required />
                            </div>

                            <div className="form-group">
                                <label className="regularLabel" htmlFor="yourEmail">{Dictionary.enterMail}*</label>
                                <input type="text" autoComplete="off" rows="1" className="regularInput" cols="35" id="yourEmail" name="yourEmail" required />
                            </div>

                            <div className="form-group">
                                <label className="regularLabel" htmlFor="display">{Dictionary.name}*</label>
                                <input type="text" autoComplete="off" rows="1" className="regularInput" cols="35" id="display" name="display" required />
                            </div>


                            <div className="form-group">
                                <label className="regularLabel" htmlFor="birthday">{Dictionary.birth}</label>
                                <input type="date" className="regularInput" rows="1" cols="35" id="birthday" name="birth" required />
                            </div>


                            <label htmlFor="highlights">{Dictionary.highlights}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="highlights" id="highlights"  ></textarea>
                            </div>

                            <label htmlFor="biography">{Dictionary.biography}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="biography" id="biography"  ></textarea>
                            </div>

                            <label htmlFor="history">{Dictionary.history}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="history" id="history"  ></textarea>
                            </div>

                            <label htmlFor="feminism">{Dictionary.feminism}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="feminism" id="feminism" ></textarea>
                            </div>

                            <label htmlFor="facts">{Dictionary.facts}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="facts" id="facts" ></textarea>
                            </div>

                            <label htmlFor="quotes">{Dictionary.quotes}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="quotes" id="quotes"  ></textarea>
                            </div>


                            <label htmlFor="bibliography">{Dictionary.bibliography}</label>
                            <div className="form-group">
                                <input type="text" autoComplete="off" rows="4" cols="50" name="reading" id={"reading" + j} />
                           
                            <div className="form-group">
                                <a id="fill20"></a>
                                <button className="btn addBtn" onClick={(e) => {
                                    e.preventDefault();
                                    var fill = $("#fill20");

                                    if ($("#reading" + j).val()) {
                                        j++;
                                        fill.append(`<input id=${"reading" + j} autoComplete="off"  type="text" rows="4" cols="50" name="reading" />`)
                                    } else
                                        alert(Dictionary.addBibiloraphy);

                                }}>{Dictionary.addMore}</button>
                            </div>
                             </div>
                            <div className="form-group flex">
                                <lable htmlFor="agree">{Dictionary.iAgree}</lable>
                                <input className="agree" name="agree" type="checkbox"></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="requiredFooter">{Dictionary.mustfilled}</div>
                            <button type="button"  className="btn btn-secondary close" onClick={resetForm("suggest_woman_form", "fill20")} data-dismiss="modal">{Dictionary.close}</button>
                            <button type="submit" htmlFor="suggest_woman_form" className="btn btn-success" id="submit_form" >{Dictionary.submit}</button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export const FeedbackModal = () => {
    return (
        <div className="modal fade" id="feedbackForm" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" onClick={resetForm("feedback_form")} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.feedback}</h5>
                    </div>
                    <div className="modal-body">
                        <form id="feedback_form" name="feedback_form" onSubmit={addFeedback}  >
                            <div className="form-group">
                                <label className="regularLabel" htmlFor="feed_name">{Dictionary.name}*</label>
                            </div>
                            <input type="text" rows="1" className="regularInput" id="feed_name" cols="35" name="name" required />
                            <div id="email-group" className="form-group">
                                <label className="regularLabel" htmlFor="feed_email">{Dictionary.enterMail}*</label>
                            </div>
                            <input type="email" autoComplete="false" rows="1" className="regularInput" id="feed_email" cols="35" name="email" required />
                            {/* </div> */}
                            <div id="howWas" className="form-group"> {Dictionary.HowWasVisit} </div>
                            <div className="starLocation">
                                <div className="form-group starContainer">
                                    {/* centerd info */}
                                    <div className="starrating risingstar d-flex justify-content-center flex-row-reverse">
                                        <input type="radio" className="star" id="star5" name="rating" value="5" /><label htmlFor="star5" title="5 star"></label>
                                        <input type="radio" className="star" id="star4" name="rating" value="4" /><label htmlFor="star4" title="4 star"></label>
                                        <input type="radio" className="star" id="star3" name="rating" value="3" /><label htmlFor="star3" title="3 star"></label>
                                        <input type="radio" className="star" id="star2" name="rating" value="2" /><label htmlFor="star2" title="2 star"></label>
                                        <input type="radio" className="star" id="star1" name="rating" value="1" /><label htmlFor="star1" title="1 star"></label>
                                    </div>
                                </div>
                            </div>
                            <div id="name-group" className="form-group">
                                <label htmlFor="improvement">{Dictionary.seggestions}</label>
                                <textarea rows="4" id="improvement" cols="35" name="improvement" ></textarea>

                            </div>
                            <div className="form-group flex">
                                <label htmlFor="agree">{Dictionary.iAgree}</label>
                                <input className="agree" name="agree" type="checkbox"></input>
                            </div>


                            <div className="modal-footer">
                                <div className="requiredFooter">{Dictionary.mustfilled}</div>
                                <button type="submit" className="btn btn-success">{Dictionary.submit} </button>
                                <button type="button" onClick={resetForm("feedback_form")} className="btn btn-secondary" data-dismiss="modal">{Dictionary.close}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CategoryModal = () => {
    return (
        <div className="modal fade" id="categoryForm" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" onClick={resetForm("category_form")} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.addcategory}</h5>
                    </div>
                    <div className="modal-body">
                        <form id="category_form" onSubmit={addCatagory} name="category_form"  >
                            <div id="name-group" className="form-group">
                                <div id="name-group1" className="form-group">
                                    <label className="regularLabel" htmlFor="category_name">{Dictionary.name}</label>
                                    <input autoComplete="off" type="text" lang="HE" rows="1" cols="35" id="category_nameHE" className="category_name" name="category_name" placeholder={Dictionary.categoryInputHE} required />
                                    <input autoComplete="off" type="text" lang="EN" rows="1" cols="35" id="category_nameEN" className="category_name" name="category_name" placeholder={Dictionary.categoryInputEN} required />
                                    <input autoComplete="off" type="text" lang="AR" rows="1" cols="35" id="category_nameAR" className="category_name" name="category_name" placeholder={Dictionary.categoryInputAR} required />
                                </div>
                            </div>
                            <div id="image-group" className="form-group">
                                <ImageUpload id="catagoryFormPic" required="required" param1="category_nameHE" param1Empty="category name not enterd" />
                            </div>
                            <div className="modal-footer">
                                <div className="requiredFooter" > {Dictionary.mustfilled}  </div>
                                <button type="submit" id="submitCategory" htmlFor="category_form" className="btn btn-success">{Dictionary.submit} </button>
                                <button type="button" onClick={resetForm("category_form")} className="btn btn-secondary" data-dismiss="modal">{Dictionary.close}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}

export const GenralForm = (props) => {
    var classAttr = "tab-pane fade form_content";
    if (props.active)
        classAttr = "tab-pane fade form_content show active";
    var i = 0, j = 0, lang = props.lang;
    return (

        <div id={lang} className={classAttr} dir={getRTL(props.lang)}>

            <div className="form-group">
                <InputPiece attrName="display" lang={lang} />
                <TextArea attrName="summary" maxLength={100} lang={lang} placeholder={Dictionary.searchSummary} />
                <TextArea attrName="highlights" maxLength={290} lang={lang} placeholder={Dictionary.summeryHighlight} />
                <TextArea attrName="biography" lang={lang} />
                <TextArea attrName="history" lang={lang} />
                <TextArea attrName="feminism" lang={lang} />
                <TextArea attrName="facts" lang={lang} />
                <TextArea attrName="quotes" lang={lang} />

            </div>
            <div className="makbil">
                <div className="form-group width45percent">
                    <label htmlFor={"link" + lang}><b>{Dictionary.links}</b> </label>
                    <input className="regularInput" id={"description" + lang + i} lang={lang} autoComplete="off" type="text" rows="4" cols="50" name="description" placeholder={Dictionary.description} />
                    

                    <input className="regularInput" autoComplete="off" id={"link" + lang + i} lang={lang} type="text" name="link" placeholder={Dictionary.link} />
                    <a id={"fill1" + lang} ></a>
                    <br />
                    <button className="btn addBtn" onClick={(e) => {
                        e.preventDefault();
                        var fill = $("#fill1" + lang);
                        if ($("#description" + lang + i).val() && $("#link" + lang + i).val()) {
                            i++;
                            fill.append(`<br /><input id=${"description" + lang + i}  lang = ${lang} autoComplete="off" type="text" rows="4" class="regularInput" cols="50" name="description" placeholder=${Dictionary.description} />
                            
                            <a/><input id=${"link" + lang + i} lang = ${lang} type="text" autoComplete="off" rows="4" class="regularInput" cols="50" name="link" placeholder=${Dictionary.link} />`)
                        } else
                            alert(Dictionary.fillLinkDescription);
                    }}>{Dictionary.addMore}</button>
                </div>

                <div className="form-group width45percent">
                    <label htmlFor={"reading" + lang}>
                        <b>{Dictionary.bibliography}</b>
                    </label>

                    <input id={"reading" + lang + j} className="regularInput" lang={lang} type="text" autoComplete="off" rows="4" cols="50" name="reading" placeholder={Dictionary.bibliography} />
                    <a id={"fill2" + lang}></a>
                    <br />
                    <button className="btn addBtn" onClick={(e) => {
                        e.preventDefault();
                        var fill = $("#fill2" + lang);
                        if ($("#reading" + lang + j).val()) {
                            j++;
                            fill.append(`<br /><input id=${"reading" + lang + j} lang=${lang} type="text" class="regularInput" autoComplete="off" rows="4" cols="50" name="reading" placeholder=${Dictionary.bibliography} />`)
                        }
                        else
                            alert(Dictionary.addBibiloraphy);
                    }}>{Dictionary.addMore}</button>
                </div>
            </div>


        </div>

    )
}

function lockInputs() {//lock inputs for edit. using in EditWomanModal when we add new woman
    $("#name").attr('readonly', true);
    $("#birth").attr('readonly', true);
}


function addNewUser(e) {
    e.preventDefault();
    $("#newUserForm").validate({
        // Specify validation rules
        rules: {
            email: {
                required: true,
                minlength: 1,
                email: true,
            },
            password: {
                required: true,
                minlength: 1,
            },
        },
        messages: {}
    });

    if (!$("#newUserForm").valid()) return;

    var email = $("#email").val();
    var password = $("#password").val();
    var admin = $("#adminSelect").val() ? true : false;

    var obj = {};
    obj["email"] = email;
    obj["id"] = email;
    obj["superUser"] = false;
    obj["admin"] = admin;

    db.collection('users').doc(email).set(obj).then(() => {
        auth.createUserWithEmailAndPassword(email, password).then(() => {
            alert(Dictionary.userAddedSuccefully);
            window.location.reload();
        }).catch(function (error) {
            alert(error)
        });
    }).catch(function (error) {
        alert(error)
    });
}

function AddNewFact(e) {//add new fact in three languages
    e.preventDefault();
    var obj = {}, added = false;
    //get facts in all languages
    langs.forEach(lang => {

        if ($("#DidYouKnow" + lang).val()) {
            obj[lang] = $("#DidYouKnow" + lang).val();
            added = true;
        }
    });
    if (!added) {
        alert(Dictionary.noFactToAdd)
        return;
    }

    obj["id"] = String(new Date());
    db.collection('didYouKnow').doc(obj["id"]).set(obj).then(() => {
        alert(Dictionary.FactAddedSuccefully)
        window.$("#DidYouKnowModal").modal('hide');//close adding form
        window.location.reload();//make new fact apper in the table

    }).catch(function (error) {
        alert(error)
    });
}


//add woman to database
export function addWoman(e) {
    e.preventDefault();
    if (!$("#ProfilePic").val()) {
        alert(Dictionary.mustUpload);
        return;
    }

    var HE = {}, EN = {}, AR = {}, gen = {};
    var boolHe = false, boolEn = false, boolAr = false;


    var id = $("#name").val() + $("#birth").val();
    var categories = [], descriptionHE = {}, linkHE = {}, readingHE = {};
    var descriptionEN = {}, linkEN = {}, readingEN = {};
    var descriptionAR = {}, linkAR = {}, readingAR = {};
    var photos = { numOfPhotos: 0 };

    //confirm all photos have description and save discriptions
    var photosByClass = document.getElementsByClassName("photoPrev");
    let len = photosByClass.length;
    for (let i = 0; i < len; i++) {
        let pic = photosByClass[i];
        let name = pic.name;
        photos[photos.numOfPhotos] = {};
        photos[photos.numOfPhotos].pic = pic.src;
        let hebrew = $("#prevDesc" + name + "HE").val();
        let english = $("#prevDesc" + name + "EN").val();
        let arabic = $("#prevDesc" + name + "AR").val();
        if (hebrew)
            photos[photos.numOfPhotos]["HE"] = hebrew;
        if (english)
            photos[photos.numOfPhotos]["EN"] = english;
        if (arabic)
            photos[photos.numOfPhotos]["AR"] = arabic;
        if (!hebrew && !english && !arabic) {
            alert("please enter discriptions for all photos");
            return;
        }
        photos.numOfPhotos++;
    }


    $('#submitPart1').show();

    //go over all input elements and insert them in to the document
    $($('#woman_form').prop('elements')).each(function () {
        if (this.value && this.type !== "file") {
            switch (this.name) {
                case "prevDesc":
                    //already coverd as part of the validation
                    break;
                case "cat":
                    if (this.checked)
                        categories.push(this.id);
                    break;
                case "description"://if the element is a link description
                    let i = (this.id).replace(/[^0-9]/g, '');
                    if (i) {
                        if (this.lang === "AR")
                            descriptionAR[i] = this.value;
                        else if (this.lang === "EN")
                            descriptionEN[i] = this.value;
                        else if (this.lang === "HE")
                            descriptionHE[i] = this.value;
                    }
                    break;
                case "link":
                    let j = (this.id).replace(/[^0-9]/g, '');
                    if (j) {
                        if (this.lang === "AR")
                            linkAR[j] = this.value;
                        else if (this.lang === "EN")
                            linkEN[j] = this.value;
                        else if (this.lang === "HE")
                            linkHE[j] = this.value;
                    }
                    break;
                case "reading":
                    let k = (this.id).replace(/[^0-9]/g, '');
                    if (k)
                        if (this.lang === "AR")
                            readingAR[k] = this.value;
                        else if (this.lang === "EN")
                            readingEN[k] = this.value;
                        else if (this.lang === "HE")
                            readingHE[k] = this.value;
                    break;
                case "display":
                    gen[this.id] = breakName((this.value).toLowerCase());
                //display is saved broken as well as full so no break
                default:

                    if (this.lang === "EN") {
                        boolEn = true;
                        EN[this.name] = this.value;
                    }
                    else if (this.lang === "HE") {
                        boolHe = true;
                        HE[this.name] = this.value;
                    }
                    else if (this.lang === "AR") {
                        boolAr = true;
                        AR[this.name] = this.value;
                    }
                    else {
                        gen[this.name] = this.value;
                        gen["id"] = id;
                    }
                    break;
            }

        }
    });
    if (categories)
        gen["categories"] = categories;
    var linksHE = mergelinks(descriptionHE, linkHE);
    if (linksHE)
        HE["links"] = linksHE;
    var linksEN = mergelinks(descriptionEN, linkEN);
    if (linksEN)
        EN["links"] = linksEN;
    var linksAR = mergelinks(descriptionAR, linkAR);
    if (linksAR)
        AR["links"] = linksAR;
    if (readingHE)
        HE["reading"] = readingHE;
    if (descriptionEN)
        EN["description"] = descriptionEN;
    if (linkEN)
        EN["link"] = linkEN;
    if (readingEN)
        EN["reading"] = readingEN;
    if (descriptionAR)
        AR["description"] = descriptionAR;
    if (linkAR)
        AR["link"] = linkAR;
    if (readingAR)
        AR["reading"] = readingAR;
    if (boolHe)
        gen["HE"] = HE
    if (boolEn)
        gen["EN"] = EN
    if (boolAr)
        gen["AR"] = AR
    if (photos.numOfPhotos)
        gen["photos"] = photos;

    db.collection('women').doc(id).set(gen).then(() => {
        alert(Dictionary.uploadSuccess);
        window.$("#staticBackdrop").modal('hide');
        window.location.reload();

    }).catch(error => console.log(error))

}

//gets multiple links and discriptions and makes them a json
function mergelinks(discription, links) {
    if (!discription || !links)
        return;
    var entries = []
    Object.keys(discription).forEach(key => {
        if (links[key] && discription[key]) {
            entries.push(
                [discription[key], links[key]]
            )
        }

    });
    return Object.fromEntries(entries);
}




// add to suggest woman collection
function addsuggest() {
    var obj = {}
    var id = $("#yourEmail").val() + $("#display").val();

    $($('#suggest_woman_form').prop('elements')).each(function () {
        if (this.value) {
            obj[this.id] = this.value;
        }
    });
    obj["id"] = id;
    obj["date"] = moment().local('he').format('L');

    db.collection('suggest_women').doc(id).set(obj).then(function () {
        window.$("#suggestWomanModal").modal('hide');
    }).catch(error => console.log(error));
}

//add feedback to database
function addFeedback(e) {
    e.preventDefault();
    var obj = {}
    var id = $("#feed_name").val() + $("#feed_email").val();
    var maxscoreSet = false;
    $($('#feedback_form').prop('elements')).each(function () {
        if (this.value) {
            //if it is the stars rating
            if (this.type === "radio") {
                if ($(this).is(':checked') && !maxscoreSet) {
                    maxscoreSet = true;
                    obj["score"] = this.value;
                }
            }
            else
                obj[this.name] = this.value;
        }
    });
    if (!maxscoreSet) {
        alert(Dictionary.enterScore);
        return;
    }

    obj["id"] = id;
    obj["createdAt"] = moment().local('he').format('L');
    if (id);
    db.collection('feedback').doc(id).set(obj).then(function () {
        window.$("#feedbackForm").modal('hide');
        window.location.reload();
    }).catch(error => console.log(error));
}
//adds catagory to database
function addCatagory(event) {

    $("#category_form").validate({
        // Specify validation rules
        rules: {
            ProfilePic: {
                required: true,
            },
            category_nameHE: {
                required: true
            },
            category_nameAN: {
                required: true
            },
            category_nameAR: {
                required: true
            }
        },
        messages: {}
    });

    if (!$("#category_form").valid()) return;

    if ($('#uploadBtn').data('clicked')) {

        var gen = {};
        var id = $("#category_nameHE").val();

        $($('#category_form').prop('elements')).each(function () {
            if (this.value && (this.type) !== ("file")) {
                if (this.type === "hidden")
                    gen[this.id] = this.value;
                else
                    gen[this.lang] = this.value;
            }
        });
        gen["id"] = id;
        db.collection('categories').doc(id).set(gen)
            .catch(error => console.log(error));
        window.$("#categoryForm").modal('hide');
        $("#category_form").trigger("reset");
    } else
        alert(Dictionary.mustUpload);
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
};


//reset the add woman form when close
function resetForm(reset, empty1, empty2, removeinners) {
    return () => {

        $("#" + reset).trigger("reset");

        if (empty1)
            $(`#${empty1}`).html("");

        if (empty2)
            $(`#${empty2}`).html("");

        $("#name").attr('readonly', false);
        $("#birth").attr('readonly', false);
        ShowHideFunc(["step1", "submitPart1"], ["step2"])
        removeInner(removeinners)
    }
};

//check if woman allready exist when we want to add woman 
export function allreadyExist(id, wantToEdit) {
    console.log(id)
    if (id) {
        var woman = db.collection('women').doc(id);
        woman.get().then(doc => {
            if (doc.exists) {
                if (wantToEdit || window.confirm(Dictionary.editExistVal)) {
                    showing("#step2", wantToEdit);
                    loadWomanToModal(id);
                }

            }
            else
                showing("#step2");
        }).catch(error => console.log(error))
    }
    else
        showing("#step2");


}


//make sure that the user enterd in step one the name and birth date
export function showing(id, wantToEdit) {
    if (($("#name").val() && $("#birth").val()) || wantToEdit) {
        $(id).show();
        $("#submitPart1").hide()
        lockInputs();
    }
    else {
        $("#popup").show();
        $("#popup").fadeOut(2000, function () {
            // Animation complete.
        });
    }

}

function breakName(name) {
    var len = name.length,
        broken = [];
    for (let i = 1; i <= len; i++) {
        broken.push(name.substring(0, i))
    }
    return broken;
}

(function () {
    var aList = document.getElementsByClassName("link"); // list of elements
    for (var i = 0; i < aList.length; i++) {
        aList[i].addEventListener("click", function (element) {
            for (var i = 0; i < aList.length; i++) {   // loop through elements
                aList[i].classList.remove("show_team"); // and remove the class "show_team"
            }
            // add class "show_team" to the clicked element
            element.target.classList.add("show_team");
        });
    }
})();


$("document").ready(function () {
    //make sure only step 1 is shown 
    $("#step2").hide();
    $("#popup").hide();



    $('li').click(function () {
        $('li.selected').removeClass('highlight');
        $(this).addClass('highlight');
    });


});
function removeInner(ids) {
    if (!ids)
        return
    ids.forEach(id => {
        var node = document.getElementById(id);
        if (node)
            node.innerHTML = "";
    })
}

//A textArea component for the main form information textareas 
export const TextArea = props => {
    let attrName = props.attrName,
        lang = props.lang,
        maxLength = props.maxLength,
        placeholder = props.placeholder;
    ;
    return (
        <div className="mainFormFeilds">
            <lable for={attrName}><b>{Dictionary[attrName]}</b></lable>
            <textarea className="textAreaBox" rows={4} name={attrName} lang={lang} maxLength={maxLength} id={attrName + lang} placeholder={placeholder}  ></textarea>
        </div>
    )
}
//A input component for the main form inputs 
export const InputPiece = props => {
    let attrName = props.attrName,
        lang = props.lang,
        placeholder = props.placeholder ? props.placeholder : Dictionary[attrName];

    return (
        <div className="mainFormFeilds">
            <lable for={attrName}><b>{Dictionary[attrName]}</b></lable>
            <input type="text" autoComplete="off" lang={lang} className="regularInput" id={attrName + lang} name={attrName} placeholder={placeholder} />
        </div>
    )
}

