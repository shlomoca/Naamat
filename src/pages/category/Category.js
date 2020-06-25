import './Category.css'
import React, { Component } from 'react';
import { NavBar, BottomBar } from '../../Components';
import { db, storage } from '../../config/Firebase'
import { Dictionary } from '../../Dictionary';
import { ShowHideFunc } from '../Admin Page/AdminPage';
import ReactDOM from 'react-dom';

class Category extends Component {


    constructor(props) {
        super(props);

        this.state = {
            categories: null,
            Admin: props.Admin
        }
    }


    componentDidMount() {
        db.collection('categories').get().then(snapshot => {
            const categories = [];
            snapshot.forEach(doc => {
                const data = doc.data();
                categories.push(data);
            })
            this.setState({ categories: categories })

        }).catch(error => console.log(error))
    }

    render() {
        return (
            <div id="CPcover" className="cover">
                <div id="CPWrapper" className="wrapper">
                    <NavBar AdminPage={false} Admin={this.state.Admin} />
                    <div id="category-container">
                        {this.state.categories &&
                            this.state.categories.map(category => {
                                var cat =category["category_name"+Dictionary.getLanguage()],
                                pic=category["ProfilePic"];
                                if (pic)
                                    return (
                                        <div className="catagoryImgContainer" onClick={() => { getWomanByCatagory(cat)}}>
                                                <img className="catagoryImg" src={pic} alt={cat} />
                                                <div className="catagoryText">{cat}</div>
                                        </div>);
                            })}
                    </div>
                </div>
                <BottomBar />
            </div>
        )
    }

}
export default Category;

 function getWomanByCatagory(cat){

    // ShowHideFunc([""],[""]);
    // ReactDOM.render(<ShoWomanByCat  />,document.getElementById(""));
alert(cat);
 }



//get women gets all women that their name is identical to the womenName atribute
export class ShoWomanByCat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            fields: props.fields,
            womanData: [],
            Admin: this.props.Admin

        }

    }

    componentWillMount() {
        var info = [],
            page = [],
            managerBtns = "";
        // if (this.state.Admin) {
        //     managerBtns = <div className="editWomanBtn" ><button className="btn" onClick={(e) => { e.preventDefault(); allreadyExist(this.state.id, true); }}>{Dictionary.edit}</button>
        //         <button className=" btn-danger deleteBtn" onClick={() => { if (window.confirm(Dictionary.areYouSure)) deleteWoman(this.state.id) }} >{Dictionary.delete}</button></div>;
        // }


        db.collection("women").where("capital", "==", true)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
        db.collection('women').doc(this.state.id).get().then(snapshot => {
            const data = snapshot.data();
            info.push(data);
            var alldata = info[0];
            if (alldata) {
                // page.push(<MainDetails display={alldata["display"]} link={alldata["ProfilePic"]} managerBtns={managerBtns} />);
                (Object.values(this.state.fields)).forEach(key => {
                    if (alldata[key])
                        page.push(<p><b>{Dictionary[key]}:</b> {alldata[key]}</p>);
                })
            }
            else
                alert(Dictionary.nothingToShow)
            this.setState({
                womanData: page,
                id: this.state.id
            });

        }
        );

    }
    render() {
        return (
            <div id="shoWoman">
                {this.state.womanData}
            </div>
        );
    }
}
