import './Category.css'
import React, { Component } from 'react';
import { NavBar, BottomBar } from '../../Components';
import { db } from '../../config/Firebase'
import { Dictionary } from '../../Dictionary';
import { ShowHideFunc } from '../Admin Page/AdminPage';
import ReactDOM from 'react-dom';
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
        //when the component will mount, call of the catagories to the components 
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
                                if (pic && cat) {

                                    return (
                                        <div className="catagoryImgContainer" onClick={() => { getWomanByCatagory(cat) }}>
                                            <img className="catagoryImg" src={pic} alt={cat} />
                                            <div className="catagoryText">{cat}</div>
                                        </div>);
                                }
                                else
                                    return <div></div>
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
        var data = [];
        const numberOfWomen = 20;//limit number of women loaded this way to 20
        db.collection("women").where('categories', 'array-contains', cat).limit(numberOfWomen).get()
            .then(Snapshot => {
                Snapshot.forEach(function (doc) {
                    data.push(doc.data())
                });
                if (data.length === 0){
                    page.push(<div>{Dictionary.nothingToShow}</div>)
                    this.setState({ womanData: page });
                }

                else {
                    data.forEach(woman => {
                        if (woman[Dictionary.getLanguage()]) {
                            var id = woman["id"],
                                display = woman[Dictionary.getLanguage()]["display"],
                                summary = woman[Dictionary.getLanguage()]["highlights"],
                                url = woman["ProfilePic"];
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
                }
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


