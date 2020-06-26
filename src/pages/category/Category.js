import './Category.css'
import React, { Component } from 'react';
import { NavBar, BottomBar } from '../../Components';
import { db, storage } from '../../config/Firebase'
import { Dictionary } from '../../Dictionary';
import { ShowHideFunc } from '../Admin Page/AdminPage';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import { WomenCard } from '../woman page/WomanPage';

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
                    <div id="CatWomen"></div>
                    <div id="category-container">
                        {this.state.categories &&
                            this.state.categories.map(category => {
                                var cat = category["category_name" + Dictionary.getLanguage()],
                                    pic = category["ProfilePic"];
                                if (pic)
                                    return (
                                        <div className="catagoryImgContainer" onClick={() => { getWomanByCatagory(cat) }}>
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

function getWomanByCatagory(cat) {

    ShowHideFunc(["CatWomen"], ["category-container"]);
    ReactDOM.render(<ShoWomanByCat cat={cat} />, document.getElementById("CatWomen"));

}



//get women gets all women that their name is identical to the womenName atribute
export class ShoWomanByCat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cat: props.cat,
            id: props.id,
            fields: props.fields,
            womanData: [],
            Admin: this.props.Admin

        }

    }

    componentWillMount() {
        var info = [],
            page = [],
            cat = this.state.cat,
            managerBtns = "";
        // if (this.state.Admin) {
        //     managerBtns = <div className="editWomanBtn" ><button className="btn" onClick={(e) => { e.preventDefault(); allreadyExist(this.state.id, true); }}>{Dictionary.edit}</button>
        //         <button className=" btn-danger deleteBtn" onClick={() => { if (window.confirm(Dictionary.areYouSure)) deleteWoman(this.state.id) }} >{Dictionary.delete}</button></div>;
        // }

        // .orderby().limit(20)

        var data = [], page = [];
        db.collection("women").where('categories', 'array-contains-any', [cat]).get()
            .then(querySnapshot => {
                querySnapshot.forEach(function (doc) {
                    data.push(doc.data())

                });
                data.forEach(woman => {
                    
                    var id = woman["id"],
                    display = woman["display" + Dictionary.getLanguage()],
                    summary = woman["highlights" + Dictionary.getLanguage()],
                    url = woman["ProfilePic"],
                    woman = false;
                    
                    if (id && display && summary && url) {
                    
                    page.push(
                        
                        <WomenCard id={id} display={display} prof={url} summary={summary} />
                        );
                    }
                })
                
                this.setState({
                    womanData: page
                });
                
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        // }
        // );

    }
    render() {
        return (
            <div id="shoWoman">
                {this.state.womanData}
            </div>
        );
    }
}


