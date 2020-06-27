import './Forms.css';
import $ from 'jquery';
import 'jquery-validation';
import React from 'react';
import { db, auth } from '../config/Firebase'
import { Dictionary, langs } from '../Dictionary';
import ImageUpload, { MultiImageUpload } from './ImageUpload';
import { AfterMessage, CategoryCheckBox, CollectionCheckBox } from '../Components';
import { loadWomanToModal } from '../pages/woman page/WomanPage';
import ReactDOM from 'react-dom';
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
                        <form dir="RTL" id="newUserForm" name="newUserForm" onSubmit={addNewUser}  >
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
                    <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.DidYouKnow}</h5>
                </div>
                <div className="modal-content">
                    <div className="modal-body">
                        <form dir="RTL" id="DidYouKnowForm" name="DidYouKnowForm" onSubmit={AddNewFact}  >

                            <div className="input-group mb-3">
                                <label className="regularLabel">{Dictionary.AddNewFact}</label>
                            </div>
                            <br></br>

                            <div className="form-group">

                                <div id="name-group1" className="form-group">
                                    <textarea className="facts" autoComplete="off" type="text" lang="HE" type="text" rows="2" cols="35" id="DidYouKnowHE" name="DidYouKnow" placeholder="הוסיפי עובדה בעברית" defaultValue="" />
                                    <textarea className="facts" autoComplete="off" type="text" lang="EN" type="text" rows="2" cols="35" id="DidYouKnowEN" name="DidYouKnow" placeholder="הוסיפי עובדה באנגלית" defaultValue="" />
                                    <textarea className="facts" autoComplete="off" type="text" lang="AR" type="text" rows="2" cols="35" id="DidYouKnowAR" name="DidYouKnow" placeholder="הוסיפי עובדה בערבית" defaultValue="" />
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
                    <form dir="RTL" id="woman_form" name="woman_form" onSubmit={addWoman}  >
                        <div className="modal-header">
                            <button type="button" id="xClose" className="close" data-dismiss="modal" aria-label="Close" onClick={resetForm("woman_form", "fill1"+Dictionary.getLanguage(), "fill2"+Dictionary.getLanguage())}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.addWoman}</h5>
                        </div>
                        <div className="modal-body">
                            <div id="step1">
                                <ul id="mylinks" className="nav nav-tabs">
                                    <li className="langTabs active"><a href="#HE">עברית</a></li>
                                    <li id="mylinks" className="langTabs"><a data-toggle="tab" href="#EN">English</a></li>
                                    <li id="mylinks" className="langTabs"><a  data-toggle="tab" href="#AR">عربى</a></li>
                                </ul>
                                <div className="addWomanContainer">
                                    <div className="form-group">
                                        <label className="regularLabel" htmlFor="name">{Dictionary.name}*</label>
                                        <input className="regularInput" autoComplete="off" type="text" rows="1" cols="35" id="name" name="name" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="regularLabel" htmlFor="birth">{Dictionary.birth}*</label>
                                        <input className="regularInput" type="date" rows="1" cols="35" id="birth" name="birth" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="regularLabel" htmlFor="death">{Dictionary.death}</label>
                                        <input className="regularInput" type="date" rows="1" cols="35" id="death" name="death" />
                                    </div>


                                    <div className="form-group">
                                        <button id="submit1" type="button" className="btn btn-success" onClick={() => allreadyExist($("#name").val() + $("#birth").val())} >{Dictionary.next}</button>
                                    </div>
                                    <div id="popup">
                                        <span className="popuptext" id="myPopup">{Dictionary.popup}</span>
                                    </div>
                                </div>
                            </div>
                            <div id="step2">
                                <ImageUpload param1="name" param2="birth" pathEnd="/ProfilePic" param1Empty="name not enterd" param2Empty="date of birth not ented" />
                                <div className="tab-content">
                                    <GenralForm lang={langs[0]} active={true} />
                                    <GenralForm lang={langs[1]} />
                                    <GenralForm lang={langs[2]} />
                                </div>
                                {/* <label htmlFor="acceptFiles">{Dictionary.acceptFiles} </label> */}
                                <MultiImageUpload param1="name" param2="birth" param1Empty="name not enterd" param2Empty="date of birth not ented" />

                                <label htmlFor="categorySelect">{Dictionary.choseCategory} </label>
                                <CollectionCheckBox colc={"categories"} doc={"categories"} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="requiredFooter" > {Dictionary.mustfilled}  </div>
                            <button type="button" className="close" className="btn btn-secondary" onClick={resetForm("woman_form", "fill1"+Dictionary.getLanguage(), "fill2"+Dictionary.getLanguage())} data-dismiss="modal">{Dictionary.close}</button>
                            <button type="submit" htmlFor="woman_form" className="btn btn-success" id="submit_form" >{Dictionary.submit} </button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    );
}

export const SuggestWomanModal = () => {
    var i = 0, j = 0;
    return (

        <div className="modal fade" id="suggestWomanModal" data-backdrop="static" data-keyboard="false" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <form dir="RTL" id="suggest_woman_form" name="suggest_woman_form" onSubmit={addsuggest}  >
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
                                <label className="regularLabel" htmlFor="display">{Dictionary.displayname}*</label>
                                <input type="text" autoComplete="off" rows="1" className="regularInput" cols="35" id="display" name="display" required />
                            </div>


                            <label htmlFor="highlights">{Dictionary.highlights}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="highlights" id="highlights"  ></textarea>
                            </div>

                            <label htmlFor="biography">{Dictionary.biography}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="biography" id="biography"  ></textarea>
                            </div>

                            <label htmlFor="history">{Dictionary.History}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="history" id="historical"  ></textarea>
                            </div>

                            <label htmlFor="feminism">{Dictionary.feminism}</label>
                            <div className="form-group">
                                <textarea rows="4" cols="50" name="feminism" id="contribution" ></textarea>
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
                                <input type="text" autoComplete="off" rows="4" cols="50" name="bibliography" id={"bibliography" + j} />
                            </div>
                            <div className="form-group">
                                <a id="fill20"></a>
                                <button id="addBtn" onClick={(e) => {
                                    e.preventDefault();
                                    var fill = $("#fill20");

                                    if ($("#bibliography" + j).val()) {
                                        j++;
                                        fill.append(`<input id=${"bibliography" + j} autoComplete="off"  type="text" rows="4" cols="50" name="quotes" />`)
                                    } else
                                        alert(Dictionary.addBibiloraphy);

                                }}>{Dictionary.addMore}</button>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <div className="requiredFooter">{Dictionary.mustfilled}</div>
                            <button type="button" className="close" className="btn btn-secondary" onClick={resetForm("suggest_woman_form", "fill20")} data-dismiss="modal">{Dictionary.close}</button>
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
            {/* <AfterMessage info='thank you' /> */}
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" onClick={resetForm("feedback_form")} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.feedback}</h5>
                    </div>
                    <div className="modal-body">
                        <form dir="RTL" id="feedback_form" name="feedback_form" onSubmit={addFeedback}  >
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

                            <lable htmlFor="agree">{Dictionary.imAgree}</lable>
                            <input id="agree" name="agree" type="checkbox"></input>


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
            <AfterMessage info='thank you' />
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" onClick={resetForm("category_form")} className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className="modal-title" id="staticBackdropLabel">{Dictionary.addcategory}</h5>
                    </div>
                    <div className="modal-body">
                        <form dir="RTL" id="category_form" onSubmit={addCatagory} name="category_form"  >
                            <div id="name-group" className="form-group">
                                <div id="name-group1" className="form-group">
                                    <label className="regularLabel" htmlFor="category_name">{Dictionary.name}</label>
                                    <input autoComplete="off" type="text" lang="HE" rows="1" cols="35" id="category_nameHE" className="category_name" name="category_name" placeholder={Dictionary.categoryInputHE} required />
                                    <input autoComplete="off" type="text" lang="EN" rows="1" cols="35" id="category_nameEN" className="category_name" name="category_name" placeholder={Dictionary.categoryInputEN} required />
                                    <input autoComplete="off" type="text" lang="AR" rows="1" cols="35" id="category_nameAR" className="category_name" name="category_name" placeholder={Dictionary.categoryInputAR} required />
                                </div>
                            </div>
                            <div id="image-group" className="form-group">
                                <ImageUpload required="required" param1="category_nameHE" param1Empty="category name not enterd" />
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
    var i = 0, j = 0;
    return (

        <div id={props.lang} className={classAttr}>

            <div className="form-group">
                <label for="display">{Dictionary.displayname}</label>
                <input type="text" autoComplete="off" lang={props.lang} rows="1" className="regularInput" cols="35" id={"display" + props.lang} name="display" placeholder={Dictionary.displayname} />
            </div>


            <div className="form-group">
                <lable for="highlights">{Dictionary.searchSummary}</lable>
                <textarea type="text" rows="4" cols="50" maxlength="100" autoComplete="off" name="summary" lang={props.lang} id={"summary" + props.lang} placeholder={Dictionary.summary}  ></textarea>
                <a>‏</a>


                <lable for="highlights">{Dictionary.highlights}</lable>
                <textarea rows="4" cols="50" maxLength="290" name="highlights" lang={props.lang} id={"highlights" + props.lang} placeholder={Dictionary.summeryHighlight}   ></textarea>
                <a>‏</a>

                <lable for="biography">{Dictionary.biography}</lable>
                <textarea rows="4" cols="50" name="biography" lang={props.lang} id={"biography" + props.lang}  ></textarea>
                <a>‏</a>

                <lable for="history">{Dictionary.History}</lable>
                <textarea rows="4" cols="50" name="history" lang={props.lang} id={"historical" + props.lang}  ></textarea>
                <a>‏</a>

                <lable for="feminism">{Dictionary.feminism}</lable>
                <textarea rows="4" cols="50" name="feminism" lang={props.lang} id={"contribution" + props.lang}  ></textarea>
                <a>‏</a>

                <lable for="facts">{Dictionary.facts}</lable>
                <textarea rows="4" cols="50" name="facts" lang={props.lang} id={"facts" + props.lang}  ></textarea>
                <a>‏</a>

                <lable for="quotes">{Dictionary.quotes}</lable>
                <textarea rows="4" cols="50" name="quotes" lang={props.lang} id={"quotes" + props.lang}  ></textarea>
            </div>
            <div className="makbil">
            <div className="form-group ">
                <label htmlFor={"link" + props.lang}>{Dictionary.links} </label>
                <input className="regularInput" id={"description" + props.lang + i} lang={props.lang} autoComplete="off" type="text" rows="4" cols="50" name="description" placeholder={Dictionary.description} />
                <a>‏</a>

                <input className="regularInput" autoComplete="off" id={"link" + props.lang + i} lang={props.lang} type="text" name="link" placeholder={Dictionary.link} />
                <a id={"fill1" + props.lang} ></a>
                <button id="addBtn" onClick={(e) => {
                    e.preventDefault();
                    var fill = $("#fill1" + props.lang);
                    if ($("#description" + props.lang + i).val())
                        if ($("#link" + props.lang + i).val()) {
                            i++;
                            fill.append(`<a>‏</a><input id=${"description" + props.lang + i}  lang = ${props.lang} autoComplete="off" type="text" rows="4" className="regularInput" cols="50" name="description" placeholder=${Dictionary.description} />
                            <a>‏</a>
                        <input id=${"link" + props.lang + i} lang = ${props.lang} type="text" autoComplete="off" rows="4" className="regularInput" cols="50" name="link" placeholder=${Dictionary.link} />`)
                        } else
                            alert(Dictionary.fillLinkDescription);
                }}>{Dictionary.addMore}</button>
            </div>

            <div className="form-group ">
                <label htmlFor={"reading" + props.lang}>{Dictionary.bibliography}
                    <input id={"reading" + props.lang + j} lang={props.lang} type="text" autoComplete="off" rows="4" cols="50" name="reading" placeholder={Dictionary.bibliography} />
                    <a id={"fill2" + props.lang}></a>
                    <button onClick={(e) => {
                        e.preventDefault();
                        var fill = $("#fill2" + props.lang);

                        if ($("#reading" + props.lang + j).val()) {
                            j++;
                            fill.append(`<a>‏</a><input id=${"reading" + props.lang + j} lang=${props.lang} type="text" autoComplete="off" rows="4" cols="50" name="reading" placeholder=${Dictionary.bibliography} /><a>‏</a>`)
                        }
                        else
                            alert(Dictionary.addBibiloraphy);
                    }}>{Dictionary.addMore}</button>
                </label>
            </div>
            </div>


        </div>

    )
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

function AddNewFact(e) {
    e.preventDefault();
    var obj = {};
    if ($("#DidYouKnowHE").val())
        obj["HE"] = $("#DidYouKnowHE").val();
    if ($("#DidYouKnowEN").val())
        obj["EN"] = $("#DidYouKnowEN").val();
    if ($("#DidYouKnowAR").val())
        obj["AR"] = $("#DidYouKnowAR").val();
    obj["id"] = String(new Date());
    db.collection('didYouKnow').doc(obj["id"]).set(obj).then(() => {
        alert(Dictionary.FactAddedSuccefully)
        window.$("#DidYouKnowModal").modal('hide');
        window.location.reload();

    }).catch(function (error) {
        alert(error)
    });
}


//add woman to database
export function addWoman(e) {
    e.preventDefault();

    $("#woman_form").validate({
        // Specify validation rules
        rules: {
            media: {
              
            }
        },
        messages: {}
    });

    if (!$("#woman_form").valid()) return;

    if ($("#mustUpload").data('clicked')) {//צריך לבדוק איך לטפל במקרה הקצה כאשר סדר הלחיצות שונה ואם זה נחוץ

        var HE = {}, EN = {}, AR = {}, gen = {};
        var boolHe = false, boolEn = false, boolAr = false;

        var id = $("#name").val() + $("#birth").val();
        var categories = [], descriptionHE = [], linkHE = [], readingHE = [];
        var descriptionEN = [], linkEN = [], readingEN = [];
        var descriptionAR = [], linkAR = [], readingAR = [];
        $('#submit1').show();

        $($('#woman_form').prop('elements')).each(function () {
            if (this.value && this.type != "file") {
                switch (this.name) {
                    case "linksMedia":
                        gen[this.name] = JSON.parse(this.value);
                        break;
                    case "cat":
                        if (this.checked == 1)
                            categories.push(this.id);
                        break;
                    case "description":
                        let i = (this.id).replace(/[^0-9]/g, '');
                        if (i)
                            ["description" + this.lang][i] = this.value;
                        break;
                    case "link":
                        let j = (this.id).replace(/[^0-9]/g, '');
                        if (j)
                            ["link" + this.lang][j] = this.value;
                        break;
                    case "reading":
                        let k = (this.id).replace(/[^0-9]/g, '');
                        if (k)
                            ["reading" + this.lang][k] = this.value;
                        break;
                    case "display":
                        gen[this.id] = breakName((this.value).toLowerCase());
                    //display is saved broken as well as full so no break
                    default:

                        if (this.lang == "EN") {
                            boolEn = true;
                            EN[this.name] = this.value;
                        }
                        else if (this.lang == "HE") {
                            boolHe = true;
                            HE[this.name] = this.value;
                        }
                        else if (this.lang == "AR") {
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
        // if (categories)
        //     gen["categories"] = categories;
        // langs.forEach(lang => {

        //     if (["description" + lang])
        //         [lang]["description"] = ["description" + lang];
        //     if (["link" + lang])
        //         [lang]["link"] = ["link" + lang];
        //     if (["reading" + lang])
        //         [lang]["reading"] = ["reading" + lang];
        // }
        // );



        if (boolHe)
            gen["HE"] = HE
        if (boolEn)
            gen["EN"] = EN
        if (boolAr)
            gen["AR"] = AR
        db.collection('women').doc(id).set(gen).then(() => {
            alert(Dictionary.uploadSuccess);
            window.$("#staticBackdrop").modal('hide');
            window.location.reload();
        }).catch(error => console.log(error))
    }
    else
        alert("please upload profile picture");
}

// add to suggest woman collection
function addsuggest() {
    var obj = {}
    var id = $("#yourEmail").val()+$("#display").val();

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
            if (this.type == "radio") {
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

    if ($('#mustUpload').data('clicked')) {

        var gen = {}, up;
        var id = $("#category_nameHE").val();

        $($('#category_form').prop('elements')).each(function () {
            if (this.value && (this.type) != ("file")) {
                if (this.type == "hidden")
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
        alert("please upload pic");
    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();
};


//reset the add woman form when close
function resetForm(reset, empty1, empty2) {
    console.log(empty2);
    return () => {
        $("#" + reset).trigger("reset");

        if (empty1)
            $(`#${empty1}`).html("");

        if (empty2)
            $(`#${empty2}`).html("");

        $("#name").attr('readonly', false);
        $("#birth").attr('readonly', false);
        ShowHideFunc(["step1", "submit1"], ["step2"])
    }
};

//check if woman allready exist when we want to add woman 
export function allreadyExist(id, wantToEdit) {

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


//make sure that the use enterd in step one the name and birth date
export function showing(id, wantToEdit) {

    if (($("#name").val() && $("#birth").val()) || wantToEdit) {
        $(id).show();
        $("#submit1").hide()
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
    console.log(broken);
    return broken;
}

(function() {
    var aList = document.getElementsByClassName("link"); // list of elements
    for(var i = 0; i < aList.length; i++) {
      aList[i].addEventListener("click", function(element) {
        for(var i = 0; i < aList.length; i++) {   // loop through elements
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

    // show and hide link input from add woman form.
    // $('#mylinks a').click(function () {
    //     $('#mylinks a').removeClass('highlight');
    //     $(this).addClass('highlight');
    // });

    $('li').click(function () {
        $('li.selected').removeClass('highlight');
        $(this).addClass('highlight');
    });

    // $('li').click(function () {
    //     $('li.selected').removeClass('highlight');
    //     $(this).addClass('highlight');
    // });​

});