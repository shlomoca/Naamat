import './WomanPage.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Dictionary, LangBtn } from '../../Dictionary'
import { NavBar, BottomBar } from '../../Components';
import { EditWomanForm, FeedbackButton } from '../../forms/Forms';
import { db } from '../../config/Firebase'
import { Dictionary } from '../../Dictionary';
import $ from 'jquery';
import ScrollUpButton from "react-scroll-up-button";





const MainDetails = (props) => {

    return (
        <div id="main_details">
            <img />
            <h1 >{props.display} </h1>
            <p><b>{Dictionary.name}:</b>{props.womanName}</p>
            <p><b>{Dictionary.bday}</b>:{props.bday}</p>

        </div>
    );
}

export const WomenCard = (props) => {
    return (
        <div id="womanCardsContainer">
            <img id="roundImage" src={props.link} alt={props.display} />
            <h1 >{props.display} </h1>
            <p>{props.summary}  </p>
        </div>
    )
}
export const WomenDeck = (props) => {
    // var deck= <div id='womanDeck'></div>;
    {/* var deck = document.createElement('div').createAttribute("id").setAttribute("womanDeck"); */ }
    //  console.log(props.cards);
    //  return (
    //     {if(props.cards)
    //    deck.appendChild( <WomenCard display="one women" summary="someone importent" link="https://stack.com.au/wp-content/uploads/2019/05/Rick_Morty_S4.jpg" />
    // deck+=</div>;
    //    deck
    // )

    const cards = Object.values(props.cards);
    const deck = [];

    console.log(cards);

    cards.map(woman => {
        deck.push(<WomenCard display={woman.nameHE} summary={woman.highlightsHE} link={woman.link} />)
    })

    return (
        <div>
            {deck}
        </div>
    )
}


//delete woman by id.
export function deleteWoman(id) {

    return () => {
        console.log(id);
        if (id) {
            db.collection('women').doc(id).delete().then(() => {
                alert("woman " + id + " was deleted");
                window.location.reload();
            });
        }
        else
            alert("wrong id");
    }

}

class WomanPage extends Component {

    state = {
        women: null
    }

    componentDidMount() {
        db.collection('women').get().then(snapshot => {
            const women = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                women.push(data);
            })
            this.setState({ women: women })

        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div id="WomanPageWrapper" class="wrapper" >

                <NavBar />
                <FeedbackButton />
                <ScrollUpButton />
                <div id="womenHolder"></div>

                {this.state.women &&
                    this.state.women.map(woman => {
                        return (
                            <div id="womanContainer">
                                <img id="profilePic" src="https://naamat.org.il/wp-content/themes/Naamat-Child-Theme/images/footer-img.jpg" />

                                <MainDetails display={woman["display" + Dictionary.getLanguage()]} womanName={woman["name" + Dictionary.getLanguage()]} bday={woman["date" + Dictionary.getLanguage()]} />

                                <p><b>{Dictionary.dethDay}:</b> {woman.death}</p>
                                <p><b>{Dictionary.highlights}:</b> {woman.highlights}</p>
                                <p><b>{Dictionary.biography}:</b> {woman.biography}</p>
                                <p><b>{Dictionary.QuotesAnd}:</b> {woman.quotes}</p>
                                <p><b>{Dictionary.History}:</b> {woman.historical}</p>
                                <p><b>{Dictionary.Contribution}:</b> {woman.contribution}</p>
                                <p><b>{Dictionary.facts}:</b> {woman.facts}</p>
                                <p><b>{Dictionary.media}:</b> {woman.media}</p>
                                <button onClick={deleteWoman(woman.id)} >Delete</button>


                            </div>)
                    })}
                <BottomBar />

            </div>

        )

    }
}
export default WomanPage;


//get women gets all women that their name is identical to the womenName atribute
export function getWoman(womanName) {
    // console.log(womanName);
    if (womanName) {

        db.collection('women').where("nameHE", "==", womanName).get().then(snapshot => {
            const women = [];
            //get a women arry with all women results for this search
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data) {
                    women.push(data);
                }
                else
                    console.log("no data");

            });
            console.log(women);
            var sortedWomen = {};
            if (women.length === 0)
                console.log("no women");
            else {

                // women.forEach(element => {
                //     var obj = {};
                //     var keys = Object.keys(element);
                //     //filter only the full attributes
                //     keys.forEach(key => {
                //         if (element[key]) {
                //             obj[key] = element[key];
                //         }

                //     });
                //     sortedWomen[obj["id"]] = obj;

                // });

                
                ReactDOM.render(<WomenDeck cards={women} />, document.getElementById('womenHolder'))


            }


        }).catch(error => console.log(error))
    }
    else
        console.log("women not found");
}


$(document).ready( () => {
    
    getWoman("שלמה כרמי");
});