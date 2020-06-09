import './WomanPage.css';
import React, { Component } from 'react';
// import { Dictionary, LangBtn } from '../../Dictionary'
import { NavBar, BottomBar } from '../../Components';
import { EditWomanForm } from '../../forms/Forms';
import { db } from '../../config/Firebase'
import { Dictionary } from '../../Dictionary';





const MainDetails = (props) => {

    return (
        <div id="main_details">
            <img/>
            <h1 >{props.display} </h1>
    <p>{Dictionary.name}:{props.womanName}</p>
            <p>{Dictionary.bday}:{props.bday}</p>
            
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


                <div id="details"  >

                    <img id="pic" src="https://naamat.org.il/wp-content/themes/Naamat-Child-Theme/images/footer-img.jpg" />
                </div>
                {this.state.women &&
                    this.state.women.map(woman => {
                        return (
                            <div id=  "womanContainer">
                            <MainDetails display={woman.display} womanName={woman.name} bday={woman.birth}  />
                                
                                <p>Date of death: {woman.death}</p>
                                <p>Highlight: {woman.highlights}</p>
                                <p>Biography: {woman.biography}</p>
                                <p>Quotes and noable: {woman.quotes}</p>
                                <p>History: {woman.historical}</p>
                                <p>Contribution {woman.contribution}</p>
                                <p>Facts: {woman.facts}</p>
                                <p>media: {woman.media}</p>

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