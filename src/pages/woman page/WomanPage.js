import './WomanPage.css';
import React, { Component } from 'react';
// import { Dictionary, LangBtn } from '../../Dictionary'
import { NavBar, BottomBar } from '../../Components';
import { EditWomanForm, FeedbackButton } from '../../forms/Forms';
import { db } from '../../config/Firebase'
import { Dictionary } from '../../Dictionary';





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


                {/* <div id="details"  >

                    
                </div> */}
                {this.state.women &&
                    this.state.women.map(woman => {
                        return (
                            <div id="womanContainer">
                                <img id="profilePic" src="https://naamat.org.il/wp-content/themes/Naamat-Child-Theme/images/footer-img.jpg" />
                                <MainDetails display={woman.display} womanName={woman.name} bday={woman.birth} />

                                <p><b>Date of death:</b> {woman.death}</p>
                                <p><b>Highlight:</b> {woman.highlights}</p>
                                <p><b>Biography:</b> {woman.biography}</p>
                                <p><b>Quotes and noable:</b> {woman.quotes}</p>
                                <p><b>History:</b> {woman.historical}</p>
                                <p><b>Contribution:</b> {woman.contribution}</p>
                                <p><b>Facts:</b> {woman.facts}</p>
                                <p><b>media:</b> {woman.media}</p>

                            </div>)
                    })}
                <BottomBar />
            </div>

        )

    }
}
export default WomanPage;




// constructor() {
    //     super();
    //     this.womanRef = firebase.firestore().collaction('women');
    //     this.state = {
    //         Quotes: "",
    //         biography: "",
    //         contribution: "",
    //         birth: "",
    //         death: "",
    //         display: "",
    //         highlights: "",
    //         historicalEvents: "",
    //         interestingFacts: "",
    //         media: []
    //     }

    // }