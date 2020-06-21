import './Forms.css';
import $ from 'jquery';
import 'jquery-validation';
import React from 'react';
import { db } from '../config/Firebase'
import { Dictionary, langs } from '../Dictionary';
import ImageUpload from './ImageUpload';
import { AfterMessage } from '../Components';




// function hideMe() {
//     var x = document.getElementById("submit1");
//     if (x.style.display === "none") {
//       x.style.display = "block";
//     } else {
//       x.style.display = "none";
//     }
//   }


export const FeedbackModal = () => {

    return (
        <div class="modal fade" id="feedbackForm" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <AfterMessage info='thank you' />
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" onClick={resetForm("feedback_form")} class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="staticBackdropLabel">{Dictionary.feedback}</h5>
                    </div>
                    <div class="modal-body">
                        <form dir="RTL" id="feedback_form" name="feedback_form" method="POST"  >

                            <div id="name-group" class="form-group">
                                <input type="text" rows="1" class="details" id="feed_name" cols="35" name="feed_name" placeholder="name" required />
                            </div>
                            <div id="email-group" class="form-group">
                                <input type="email" rows="1" class="details" id="feed_email" cols="35" name="feed_email" placeholder="email" required />
                            </div>


                            <div id="name-groups" classname="form-group starContainer">
                                {/* centerd info */}
                                <div align="center"> {Dictionary.HowWasVisit} </div>
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
                                <button type="button" onClick={resetForm("feedback_form")} class="btn btn-secondary" data-dismiss="modal">{Dictionary.close}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AddCategoryModal = () => {
    return (
        <div class="modal fade" id="categoryForm" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <AfterMessage info='thank you' />
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" onClick={resetForm("category_form")} class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title" id="staticBackdropLabel">{Dictionary.addcategory}</h5>
                    </div>
                    <div class="modal-body">
                        <form dir="RTL" id="category_form" name="category_form"  >

                            <div id="name-group" class="form-group">
                                <lable for="category_name">{Dictionary.name}</lable>
                                <input type="text" rows="1" class="details" id="category_name" cols="35" name="category_name" placeholder="Category name" required />
                            </div>
                            <div id="image-group" class="form-group">
                                <ImageUpload param1="category_name" param1Empty="category name not enterd" />
                            </div>

                            <div class="modal-footer">
                                <button type="submit" class="btn btn-success">{Dictionary.submit} <span class="fa fa-arrow-right"></span></button>
                                <button type="button" onClick={resetForm("category_form")} class="btn btn-secondary" data-dismiss="modal">Close</button>
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
    return (

        <div id={props.lang} class={classAttr}>


            <div id="name-group1" class="form-group">
                {/* <label for="display"></label> */}
                <input type="text" lang={props.lang} rows="1" class="detailsNew" cols="35" id={"display" + props.lang} name="display" placeholder="display name" />
            </div>
            <ImageUpload param1="name" param2="birth" pathEnd="/ProfilePic" param1Empty="name not enterd" param2Empty="date of birth not ented" />



            {/* <div class="form-group"> */}
                <textarea rows="4" class="detail" cols="50" name="highlights" lang={props.lang} id={"highlights" + props.lang} placeholder="Highlights"  ></textarea>
            {/* </div> */}


            {/* <div class="form-group"> */}
                <textarea rows="4" class="detail" cols="50" name="biography" lang={props.lang} id={"biography" + props.lang} placeholder="Biography" ></textarea>
            {/* </div> */}

            {/* <div class="form-group"> */}
                <textarea rows="4" class="detail" cols="50" name="history" lang={props.lang} id={"historical" + props.lang} placeholder="Historical events related" ></textarea>
            {/* </div> */}

            {/* <div class="form-group"> */}
                <textarea rows="4" class="detail" cols="50" name="feminism" lang={props.lang} id={"contribution" + props.lang} placeholder="Contribution to Feminism" ></textarea>
            {/* </div> */}


            {/* <div class="form-group"> */}
                <textarea rows="4" class="detail" cols="50" name="facts" lang={props.lang} id={"facts" + props.lang} placeholder="Interesting fact / story" ></textarea>
            {/* </div> */}

            <div class="form-group">
                <select name="type" id="type">
                    <option value="bibliography" name="bibliography">Bibliography</option>
                    <option value="link" name="link">Link</option>
                </select>
                <input type="text" rows="4" class="details" cols="50" name="quotes" lang={props.lang} id={"quotes" + props.lang} placeholder="Quotes and notable works" />
                <input id={"link" + props.lang} type="text" rows="4" class="details" cols="50" name="link" placeholder="link" />
            </div>
        </div>

    )
}


export const EditWomanModal = () => {

    return (

        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <form dir="RTL" id="woman_form" name="woman_form" method="POST"  >
                        <div class="modal-header">
                            <button type="button" id="xClose" class="close" data-dismiss="modal" aria-label="Close" onClick={resetForm("woman_form")}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 class="modal-title" id="staticBackdropLabel">{Dictionary.addWoman}</h5>
                        </div>

                        <div class="modal-body">
                            <div id="step1">
                                {/* <h2>step 1</h2> */}
                                <ul id="mylinks" class="nav nav-tabs">
                                    <li  class="langTabs active"><a data-toggle="tab" href="#HE">עברית</a></li>
                                    <li class="langTabs"><a data-toggle="tab" href="#EN">English</a></li>
                                    <li class="langTabs"><a data-toggle="tab" href="#AR">عربى</a></li>
                                </ul>
                                <div id="name-group" class="form-group">
                                    {/* <label for="name"></label> */}
                                    <label id="lineName" for="name">{Dictionary.name}</label>
                                    <input type="text" rows="1" class="details" cols="35" id="name" name="name" placeholder="" />

                                    <div class="bdayclass">
                                <div id="name-group" class="form-group">
                                    <div  id="line2" for="birth">{Dictionary.bday}</div>
                                    <input class ="details2" type="date" name="birth" id="birth" />
                                <div class="dethDay"> 
                                <div id="name-group" class="form-group">
                                    <label id="line3" for="death">{Dictionary.dethDay}</label>
                                    <input type="date" name="death" id="death" />
                                </div>
                                </div>
                                    </div>
                                </div>
                                </div>
                                <button  id="submit1" type="button" class="btn btn-success" onClick=  {showing("#step2")} >{Dictionary.next}</button>
                            </div>
                            <div id="popup">
                                <span class="popuptext" id="myPopup">בבקשה מלא את כל הפרטים</span>
                            </div>
                            <div id="step2">
                                <div class="tab-content">
                                    <GenralForm lang={langs[0]} active={true} />
                                    <GenralForm lang={langs[1]} />
                                    <GenralForm lang={langs[2]} />
                                </div>

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
    //make sure only step 1 is shown 
    $("#step2").hide();
    $("#popup").hide();
    // show and hide link input from add woman form.
    $('#mylinks a').click(function () {
        $('#mylinks a').removeClass('highlight');
        $(this).addClass('highlight');
    });
    $("#link").hide();
    $('select[name=type]').change(function () {
        if ($('select[name=type]').val() == 'link') {
            $('#link').show();
        } else {
            $("#link").hide();
        }
    });

    //add woman from the form to database
    $("#woman_form").submit(function (event) {
        if (!$("#woman_form").valid()) return;
        //confirm id not exeisting??
        var he = {},en = {},ar = {},gen = {};
        var boolHe = false,boolEn = false,boolAr = false;
       
        var id = $("#name").val() + $("#birth").val();

        $($('#woman_form').prop('elements')).each(function () {
            if (this.value) {
                if(this.name==="highlights"||this.name==="display"){
                        gen[this.id]=(this.value).toLowerCase();
                    }
                if (this.lang == "EN"){
                    boolEn=true;
                    en["id"] = id;
                    en[this.name] = this.value;
                    
                }
                else if (this.lang == "HE"){
                    boolHe=true;
                    he["id"] = id;
                    he[this.name] = this.value;
                }
                else if (this.lang == "AR"){
                    boolAr=true;
                    ar["id"] = id;
                    ar[this.name] = this.value;
                }
                else{
                    gen[this.name] = this.value;
                    gen["id"] = id;
                }
            }
        });

       
        db.collection('women').doc(id).set(gen);
        if(boolHe)
        db.collection('women').doc(id).collection("langs").doc("HE").set(he);
        if(boolEn)
        db.collection('women').doc(id).collection("langs").doc("EN").set(en);
        if(boolAr)
        db.collection('women').doc(id).collection("langs").doc("AR").set(ar);
        window.$("#staticBackdrop").modal('hide');
        // $("#staticBackdrop").modal('hide');
        // $("#afterMessage").modal('show');
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

    //add feedback to database
    $("#feedback_form").submit(function (event) {
        if (!$("#feedback_form").valid()) return;

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
                    obj[this.id] = this.value;
            }
        });
        console.log(obj);

        db.collection('feedbacks').doc(id).set(obj).then(function () {
            window.$("#feedbackForm").modal('hide');
        });

        // $("#afterMessage").modal('show');
        // stop the form from submitting the normal way and refreshing the page
        event.preventDefault();
    });

});

//reset the add woman form when close
function resetForm(id) {
    return () => {
        $("#" + id).trigger("reset");
        $("#step1").show();
        $("#step2").hide();
        
    }
};

//make sure that the use enterd in step one the name and birth date
function showing(id, id2) {
    return () => {
        if (!($("#name").val()) || !($("#birth").val())) {
            $("#popup").show();
            $("#popup").fadeOut(2000, function () {
                // Animation complete.
            });
        }
        else {
            $(id).show();
            $(id2).hide();
            $("#submit1").hide()

        }
    }


}


