import './Forms.css';
import $ from 'jquery';
import 'jquery-validation'
import React from 'react';
import { db } from '../config/Firebase'
import { Dictionary } from '../Dictionary';


export const FeedbackButton = () => {
    return (
        <div class="modal fade" id="feedbackForm" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="staticBackdropLabel">{Dictionary.feedback}</h5>
                    </div>
                    <div class="modal-body">
                        <form dir="RTL" id="woman_form" name="woman_form" method="POST" >

                            <div id="name-group" class="form-group">
                                <input type="text" rows="1" class="details" cols="35" name="name" placeholder="name" required />
                            </div>
                            <div id="email-group" class="form-group">
                                <input type="email" rows="1" class="details" cols="35" name="name" placeholder="email" required />
                            </div>


                            <div id="name-group" classname="form-group starContainer">
                                How was your visit?
                                    <div className="starrating risingstar d-flex justify-content-center flex-row-reverse">
                                    <input type="radio" className="star" id="star5" name="rating" value="5" /><label for="star5" title="5 star"></label>
                                    <input type="radio" className="star" id="star4" name="rating" value="4" /><label for="star4" title="4 star"></label>
                                    <input type="radio" className="star" id="star3" name="rating" value="3" /><label for="star3" title="3 star"></label>
                                    <input type="radio" className="star" id="star2" name="rating" value="2" /><label for="star2" title="2 star"></label>
                                    <input type="radio" className="star" id="star1" name="rating" value="1" /><label for="star1" title="1 star"></label>
                                </div>
                            </div>
                            





                            <div id="name-group" class="form-group">
                                <label for="profession"></label>
                                <textarea rows="4" class="details" cols="50" name="comment" placeholder="?Any seggestions for improvament" required></textarea>

                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">{Dictionary.submit} <span class="fa fa-arrow-right"></span></button>
                    </div>
                </div>
            </div>
        </div>
    );
};



export const EditWomanForm = () => {
    return (

        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="staticBackdropLabel">Add Woman</h5>
                    </div>
                    <div class="modal-body">
                        <form dir="RTL" id="woman_form" name="woman_form"  >

                            <div id="name-group" class="form-group">
                                {/* <label for="name"></label> */}
                                <input type="text" rows="1" class="details" cols="35" id="name" name="name" placeholder={Dictionary.name} required />
                            </div>

                            <div id="name-group" class="form-group">
                                {/* <label for="display"></label> */}
                                <input type="text" rows="1" class="details" cols="35" id="display" name="display" placeholder="display name" />
                            </div>

                            <div id="name-group" class="form-group">
                                <input type="text" rows="1" class="details" cols="35" id="timeline" name="Year in timelineme" placeholder="Year in timeline" />
                            </div>

                            <div id="name-group" class="form-group">
                                <label for="born_date">Date of birth</label>
                                <input type="date" name="date" id="date" />
                            </div>

                            <div id="name-group" class="form-group">
                                <label for="profession">Date of death</label>
                                <input type="date" name="death_date" id="death" />
                            </div>

                            <div id="name-group" class="form-group">
                                {/* <label for="img">Select image:</label>
                                <input type="file" id="img" name="image" name="img" accept="image/*|audio/*|video/*" />
                                <button id="add">add</button> */}
                                <lable id="lb" for="inputGroupFile04">upload</lable>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" name="file" class="custom-file-input" id="inputGroupFile04" id="media" aria-describedby="inputGroupFileAddon04" />
                                        <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                                    </div>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <textarea rows="4" class="details" cols="50" name="highlights" id="highlights" placeholder="Highlights" ></textarea>
                            </div>


                            <div class="form-group">
                                <textarea rows="4" class="details" cols="50" name="biography" id="biography" placeholder="Biography" ></textarea>
                            </div>

                            <div class="form-group">
                                <textarea rows="4" class="details" cols="50" name="history" id="historical" placeholder="Historical events related" ></textarea>
                            </div>

                            <div class="form-group">
                                <textarea rows="4" class="details" cols="50" name="feminism" id="contribution" placeholder="Contribution to Feminism" ></textarea>
                            </div>

                            <div class="form-group">
                                <textarea rows="4" class="details" cols="50" name="facts" id="facts" placeholder="Interesting fact / story" ></textarea>
                            </div>

                            <div class="form-group">
                                <select name="type" id="type">
                                    <option value="bibliography" name="bibliography">Bibliography</option>
                                    <option value="link" name="link">Link</option>
                                </select>
                                <input type="text" rows="4" class="details" cols="50" name="quotes" id="quotes" placeholder="Quotes and notable works" />
                                <input id="link" type="text" rows="4" class="details" cols="50" name="link" placeholder="link" />
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-success" id="submit_form" >Submit <span class="fa fa-arrow-right"></span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

$("document").ready(function () {

    // show  and hide link input from add woman form.
    $("#link").hide();
    $('select[name=type]').change(function () {
        if ($('select[name=type]').val() == 'link') {
            $('#link').show();
        } else {
            $("#link").hide();
        }
    });

    //add woman from the form 
    $("#woman_form").submit(function (event) {
        if (!$("#woman_form").valid()) return;


        db.collection('women').add({
            name: $("#name").val(),
            display: $("#display").val(),
            birth: $("#date").val(),
            death: $("#death").val(),
            timeline: $("#timeline").val(),
            biography: $("#biography").val(),
            highlights: $("#highlights").val(),
            contribution: $("#contribution").val(),
            historical: $("#historical").val(),
            facts: $("#facts").val(),
            media: $("#media").val()
        })

        $("#staticBackdrop").modal('hide');
        event.preventDefault();
    });

});



    // $("#woman_form").submit(function (event) {
    //     if (!$("#woman_form").valid()) return;

    //     alert("hii");

    //     // stop the form from submitting the normal way and refreshing the page
    //     event.preventDefault();
    // });


