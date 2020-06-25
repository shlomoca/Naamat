import './Category.css'
import React, { Component } from 'react';
import { NavBar, BottomBar } from '../../Components';
import { db, storage } from '../../config/Firebase'
import { Dictionary } from '../../Dictionary';


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
                                        <div className="catagoryImgContainer" onClick={() => { alert(cat)}}>
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

