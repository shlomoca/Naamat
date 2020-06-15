import './Forms.css';
import $ from 'jquery';
import 'jquery-validation'
import React from 'react';
import { db } from '../config/Firebase'
import { Dictionary,langs } from '../Dictionary';
import ImageUpload from './ImageUpload';


export const FeedbackButton = () => {
    return (
        <div class="modal fade" id="feedbackForm" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" onClick={resetForm("feedback_form")} class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="staticBackdropLabel">{Dictionary.feedback}</h5>
                    </div>
                    <div class="modal-body">
                        <form dir="RTL" id="feedback_form" name="feedback_form"  >

                            <div id="name-group" class="form-group">
                                <input type="text" rows="1" class="details" id="feed_name" cols="35" name="feed_name" placeholder="name" required />
                            </div>
                            <div id="email-group" class="form-group">
                                <input type="email" rows="1" class="details" id="feed_email" cols="35" name="feed_email" placeholder="email" required />
                            </div>


                            <div id="name-group" classname="form-group starContainer">
                                {Dictionary.HowWasVisit}
                                <div className="starrating risingstar d-flex justify-content-center flex-row-reverse">
                                    <input type="radio" className="star" id="star5" name="rating" value="5" /><label for="star5" title="5 star"></label>
                                    <input type="radio" className="star" id="star4" name="rating" value="4" /><label for="star4" title="4 star"></label>
                                    <input type="radio" className="star" id="star3" name="rating" value="3" /><label for="star3" title="3 star"></label>
                                    <input type="radio" className="star" id="star2" name="rating" value="2" /><label for="star2" title="2 star"></label>
                                    <input type="radio" className="star" id="star1" name="rating" value="1" /><label for="star1" title="1 star"></label>
                                </div>
                            </div>

                            <div id="name-group" class="form-group">
                                {/* <label for="profession"></label> */}
                                <textarea rows="4" class="details2" id="improvement" cols="35" name="improvement" placeholder={Dictionary.seggestions} ></textarea>

                            </div>

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success">{Dictionary.submit} <span class="fa fa-arrow-right"></span></button>
                                <button type="button" onClick={resetForm("feedback_form")} class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export const GenralForm = (props) => {
var classAttr="tab-pane fade form_content";
    if(props.active)
    classAttr="tab-pane fade form_content show active";
    return (
       
        <div id={props.lang}  class={classAttr}>
            <div id="name-group" class="form-group">
                {/* <label for="name"></label> */}
                <input type="text" lang={props.lang} rows="1" class="details" cols="35" id={"name"+ props.lang} name="name" placeholder={Dictionary.name} required />
            </div>

            <div id="name-group" class="form-group">
                {/* <label for="display"></label> */}
                <input type="text" lang={props.lang} rows="1" class="details" cols="35" id={"display"+ props.lang} name="display" placeholder="display name arabic" />
            </div>

            <div id="name-group" class="form-group">
                <input type="text" lang={props.lang} rows="1" class="details" cols="35" id={"timeline"+ props.lang} name="timelineme" placeholder="Year in timeline" />
            </div>

            <div id="name-group" class="form-group">
                <label for="born_date">{Dictionary.bday}</label>
                <input type="date" lang={props.lang} name="date" id={"date"+ props.lang}  required/>
            </div>

            <div id="name-group" class="form-group">
                <label for="death_date">{Dictionary.dethDay}</label>
                <input type="date" lang={props.lang} name="death" id={"death"+ props.lang} />
            </div>

            {/* <label for="img">Select image:</label>
                                <input type="file" id="img" name="image" name="img" accept="image/*|audio/*|video/*" />
                                <button id="add">add</button> */}
            {/* <div id="name-group" class="form-group">
                                <label id="lb" for="inputGroupFile04">{Dictionary.upload}</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" name="file" class="custom-file-input" id="inputGroupFile04" id="media" aria-describedby="inputGroupFileAddon04" />
                                        <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                                    </div>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">{Dictionary.upload}</button>
                                    </div>
                                </div>
                            </div> */}

            <ImageUpload />

            <div class="form-group">
                <textarea rows="4" class="details" cols="50" name="highlights" id={"highlights"+ props.lang} placeholder="Highlights" ></textarea>
            </div>


            <div class="form-group">
                <textarea rows="4" class="details" cols="50" name="biography" id={"biography"+ props.lang} placeholder="Biography" ></textarea>
            </div>

            <div class="form-group">
                <textarea rows="4" class="details" cols="50" name="history" id={"historical"+ props.lang} placeholder="Historical events related" ></textarea>
            </div>

            <div class="form-group">
                <textarea rows="4" class="details" cols="50" name="feminism" id={"contribution"+ props.lang} placeholder="Contribution to Feminism" ></textarea>
            </div>


            <div class="form-group">
                <textarea rows="4" class="details" cols="50" name="facts" id={"facts"+ props.lang} placeholder="Interesting fact / story" ></textarea>
            </div>

            <div class="form-group">
                <select name="type" id="type">
                    <option value="bibliography" name="bibliography">Bibliography</option>
                    <option value="link" name="link">Link</option>
                </select>
                <input type="text" rows="4" class="details" cols="50" name="quotes" id={"quotes"+ props.lang} placeholder="Quotes and notable works" />
                <input id={"link"+ props.lang} type="text" rows="4" class="details" cols="50" name="link" placeholder="link" />
            </div>
            </div>
        
    )
}



export const EditWomanForm = () => {
    return (

        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <form dir="RTL" id="woman_form" name="woman_form"  >
                    <div class="modal-header">
                        <button type="button" id="xClose" class="close" data-dismiss="modal" aria-label="Close" onClick={resetForm("woman_form")}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="staticBackdropLabel">{Dictionary.addWoman}</h5>
                    </div>

                    <div class="modal-body">
                        <ul class="nav nav-tabs">
                            <li class="active langTabs"><a data-toggle="tab" href="#HE">עברית</a></li>
                            <li className="langTabs"><a data-toggle="tab" href="#EN">English</a></li>
                            <li className="langTabs"><a data-toggle="tab" href="#AR">Arabic</a></li>
                        </ul>

                        <div class="tab-content">
                            <GenralForm lang={langs[0]} active={true} />
                            <GenralForm lang={langs[1]}  />
                            <GenralForm lang={langs[2]} />
                            
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="close" class="btn btn-secondary" onClick={resetForm("woman_form")} data-dismiss="modal">{Dictionary.close}</button>
                        <button type="submit" for="woman_form" class="btn btn-success" id="submit_form" >{Dictionary.submit} <span class="fa fa-arrow-right"></span></button>
                    </div>
                        </form>
                    
                </div>
            </div>
        </div>
    );
}


$("document").ready(function () {

    // show and hide link input from add woman form.
    $("#link").hide();
    $('select[name=type]').change(function () {
        if ($('select[name=type]').val() == 'link') {
            $('#link').show();
        } else {
            $("#link").hide();
        }
    });

    //fill name and display name at same time.
    $("#name").on('keyup', function () {
        $("#display").val($(this).val());
    });

    //add woman from the form to database
    $("#woman_form").submit(function (event) {
        if (!$("#woman_form").valid()) return;
        //confirm id not exeisting??
        var elements = document.getElementById("woman_form").elements;
        var obj = {}
        var id = $("#nameHE").val() + $("#dateHE").val();
        alert("formSubmited");
        
        for (var i = 0, element; element = elements[i++];) {
            alert(element.name);
    if (!(element.value === "")){

    //    obj[element.id]=element.value();
       alert(element.id +"is going in"+element.value());
    }
}       
        // obj["id"]=id;
        // obj["name"] = $("#name").val();
        // obj["display"] = $("#display").val();
        // obj["birth"] = $("#date").val();
        // obj["death"] = $("#death").val();
        // obj["timeline"] = $("#timeline").val();
        // obj["biography"] = $("#biography").val();
        // obj["highlights"] = $("#highlights").val();
        // obj["contribution"] = $("#contribution").val();
        // obj["historical"] = $("#historical").val();
        // obj["facts"] = $("#facts").val();
        // obj["media"] = $("#media").val();
        db.collection('women').doc(id).set(obj);
        alert("it was submitted");
        $("#staticBackdrop").modal('hide');
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

    //add feedback to database
    $("#feedback_form").submit(function (event) {
        if (!$("#feedback_form").valid()) return;
        //confirm id not exeisting?
        var obj = {}
        var id = $("#feed_name").val();
        obj["name"] = $("#feed_name").val();
        obj["email"] = $("#feed_email").val();
        obj["improvement"] = $("#improvement").val();
        db.collection('feedbacks').doc(id).set(obj);
        // console.log(obj);
        // db.collection('feedbacks').add({
        //     name: $("#feed_name").val(),
        //     email: $("#feed_email").val(),
        //     improvement: $("#improvement").val()
        // });

        $("#feedbackForm").modal('hide');
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });





    // $("#woman_form").submit(function (event) {
    //     if (!$("#woman_form").valid()) return;

    //     alert("hii");

    //     
    //     event.preventDefault();
    // });


});

//reset the add woman form when close
function resetForm(id) {
    return () => {
        console.log(id);
        $("#" + id).trigger("reset");
    }
};


