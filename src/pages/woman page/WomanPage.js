import './WomanPage.css';
import React, { Component } from 'react';
// import { Dictionary, LangBtn } from '../../Dictionary'
import { NavBar } from '../../Components';
import { EditWomanForm } from '../../forms/Forms';





const MainDetails = (props) => {

    return (
        <div id="woman_details">
            <p>{props.womanName}</p>
            <p>{props.womanAge}</p>
            <h3 >{props.womanName} </h3>
        </div>
    );
}



class WomanPage extends Component {
    render() {
        return (
            <div id="WomanPageWrapper" class="wrapper" >
                <NavBar />
                <button id="addBtn" type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                    Add Woman
                </button>
                <EditWomanForm />
                <div id="details" dir="RTL" >
                    <MainDetails womanName="hagit peer"  womanAge="40"  />
                    <img id="pic" src="https://naamat.org.il/wp-content/themes/Naamat-Child-Theme/images/footer-img.jpg" />
                </div>
            </div>

        )

    }
}
export default WomanPage;