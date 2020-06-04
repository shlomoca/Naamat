import './WomanPage.css';
import React, { Component } from 'react';
import { Dictionary, LangBtn } from '../../Dictionary'
import { NavBar, EditWoman } from '../../Components';




const Buttons = (props) => {

    return (<a></a>);

}
const TextBox = (props) => {

    return (<a></a>);
}

class WomanPage extends Component {
    render() {
        return (
            <div id="WomanPageWrapper" class="wrapper">
                {/* <NavBar /> */}
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
                    Launch static backdrop modal
                </button>
                <EditWoman />
            </div>

        )

    }
}
export default WomanPage;