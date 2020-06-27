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
                    <NavBar AdminPage={false} Admin={this.state.Admin} categoryPage={true} />
                    <div id="CatWomen"></div>
                    <div id="category-container">
                        {this.state.categories &&
                            this.state.categories.map(category => {
                                var cat = category[Dictionary.getLanguage()],
                                    pic = category["ProfilePic"];
                                if (pic && cat)
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
            fields: props.fields,
            womanData: [],

        }

    }

    componentWillMount() {
        var page = [],
            cat = this.state.cat;
        // .orderby().limit(20)
        var data = [], page = [];
        db.collection("women").where('categories', 'array-contains', cat).get()
        .then(querySnapshot => {
            console.log(querySnapshot)
                querySnapshot.forEach(function (doc) {
                    console.log("in snap")
                    data.push(doc.data())
                });
                data.forEach(woman => {
                    console.log("in data")
                    if (woman[Dictionary.getLanguage()]) {
                        var id = woman["id"],
                            display = woman[Dictionary.getLanguage()]["display"],
                            summary = woman[Dictionary.getLanguage()]["highlights"],
                            url = woman["ProfilePic"],
                            woman = false;
                            console.log(id)
                            console.log(display)
                            console.log(summary)
                            console.log(url)
                        if (id && display && summary && url) {
                            page.push(
                                <WomenCard id={id} display={display} prof={url} summary={summary} />
                            );
                        }
                        else {
                            if (id)
                                console.log("brokenID")
                            else {

                                if (display)
                                    console.log("ID:" + id + "no display name")
                                if (summary)
                                    console.log("ID:" + id + "no summary")
                                if (url)
                                    console.log("ID:" + id + "no url")
                            }


                        }
                    }
                })

                this.setState({
                    womanData: page
                });

            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

    }
    render() {
        return (
            <div id="shoWoman2">
                {this.state.womanData}
            </div>
        );
    }
}


