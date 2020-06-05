import './Forms.css';
import $ from 'jquery';
import React from 'react';


export const FeedbackButton = () => {
    return (
        <div class="modal fade" id="feedbackForm" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">visit feedback</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form dir="RTL" id="woman_form" name="woman_form" method="POST" >

                            <div id="name-group" class="form-group">
                                <input type="text" rows="1" class="details" cols="35" name="name" form="woman_form" placeholder="name" required />
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
                            <div id="name-group" classname="form-group starContainer">
                                how were the guides?
                                    <div className="starrating risingstar d-flex justify-content-center flex-row-reverse">
                                    <input type="radio" className="star" id="guidesStar5" name="ratinguide" value="5" /><label for="guidesStar5" title="5 star"></label>
                                    <input type="radio" className="star" id="guidesStar4" name="ratinguide" value="4" /><label for="guidesStar4" title="4 star"></label>
                                    <input type="radio" className="star" id="guidesStar3" name="ratinguide" value="3" /><label for="guidesStar3" title="3 star"></label>
                                    <input type="radio" className="star" id="guidesStar2" name="ratinguide" value="2" /><label for="guidesStar2" title="2 star"></label>
                                    <input type="radio" className="star" id="guidesStar1" name="ratinguide" value="1" /><label for="guidesStar1" title="1 star"></label>
                                </div>
                            </div>

                       

                           

                            <div id="name-group" class="form-group">
                                <label for="profession">Any seggestions for improvament?</label>
                                <textarea rows="4" class="details" cols="50" name="comment" form="woman_form" placeholder="Any seggestions for improvament?" required></textarea>
                               
                            </div>


                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Submit <span class="fa fa-arrow-right"></span></button>
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
                        <h5 class="modal-title" id="staticBackdropLabel">Add Woman</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form dir="RTL" id="woman_form" name="woman_form" method="POST" >

                            <div id="name-group" class="form-group">
                                <input type="text" rows="1" class="details" cols="35" name="name" form="woman_form" placeholder="name" required />
                            </div>

                            <div id="name-group" class="form-group">
                                <input type="text" rows="1" class="details" cols="35" name="comment" form="woman_form" placeholder="display name" />
                            </div>

                            <div id="name-group" class="form-group">
                                <input type="text" rows="1" class="details" cols="35" name="Year in timelineme" form="woman_form" placeholder="Year in timeline" required />
                            </div>

                            <div id="name-group" class="form-group">
                                <label for="born_date">Date of birth</label>
                                <input type="date" required />
                            </div>

                            <div id="name-group" class="form-group">
                                <label for="profession">Date of death</label>
                                <input type="date" />
                            </div>

                            <div id="name-group" class="form-group">
                                <label for="img">Select image:</label>
                                <input type="file" id="img" name="img" accept="image/*|audio/*|video/*" />
                                <button id="add">add</button>
                            </div>

                            <div id="highlights" class="form-group">
                                <textarea rows="4" class="details" cols="50" name="comment" form="woman_form" placeholder="Highlights" required></textarea>
                            </div>


                            <div id="biography" class="form-group">
                                <textarea rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Biography" required></textarea>
                            </div>

                            <div id="historical" class="form-group">
                                <textarea rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Historical events related" required></textarea>
                            </div>

                            <div id="contribution" class="form-group">
                                <textarea rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Contribution to Feminism" required></textarea>
                            </div>

                            <div id="interesting" class="form-group">
                                <textarea rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Interesting fact / story" required></textarea>
                            </div>

                            <div id="quotes" class="form-group">
                                <select name="type" id="type">
                                    <option value="bibliography">Bibliography</option>
                                    <option value="link">Link</option>
                                </select>
                                <input type="text" rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="Quotes and notable works" />
                                <input id="link" type="text" rows="4" class="details" cols="50" name="quotes" form="woman_form" placeholder="link" />
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Submit <span class="fa fa-arrow-right"></span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

$("document").ready(function () {

    $('select[name=type]').change(function () {
      if ($('select[name=type]').val() == 'link') {
        $('#link').show();
      } else {
        $('#link').hide();
      }
    });
  
  });
  