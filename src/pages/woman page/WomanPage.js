import './WomanPage.css';
import React, { Component } from 'react';
// import { Dictionary, LangBtn } from '../../Dictionary'
import { NavBar } from '../../Components';
import { EditWomanForm } from '../../forms/Forms';
import { db } from '../../config/Firebase'




const MainDetails = (props) => {

    return (
        <div id="woman_details">
            <h3 >{props.womanName} </h3>
            <p>{props.womanName}</p>
            <p>{props.womanAge}</p>
            <p>{props.highlights}</p>
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
            // console.log(snapshot);
        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div id="WomanPageWrapper" class="wrapper" >

                <NavBar />
                <button id="addBtn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                    Add Woman
                </button>
                <EditWomanForm />
                <div id="details" dir="RTL" >
                    <MainDetails womanAge="40" highlights="מהמייסדות ומהמובילות של מפלגת הפועל הצעיר ותנועת הפועלות, חברת הכנסת הראשונה" />
                    <img id="pic" src="https://naamat.org.il/wp-content/themes/Naamat-Child-Theme/images/footer-img.jpg" />
                </div>
                {this.state.women &&
                this.state.women.map(woman =>{
                    return(
                    <div>
                        <p>Name: {woman.name}</p>
                        <p>{woman.display}</p>
                        <p>Date of birth: {woman.birth}</p>
                        <p>Date of death: {woman.death}</p>
                        <p>Highlight: {woman.highlights}</p>
                        <p>Biography: {woman.biography}</p>
                        <p>Quotes and noable: {woman.quotes}</p>
                        
                    </div>)
                })}

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