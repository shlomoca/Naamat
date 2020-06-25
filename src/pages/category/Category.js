import './Category.css'
import React, { Component } from 'react';
import { NavBar, BottomBar } from '../../Components';
import { db, storage } from '../../config/Firebase'


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
                                if (category.link)
                                    return (
                                        <div className="catagoryImgContainer" >
                                            <button className="catagoryBtn" onClick={() => { alert(category.catagory) }}>
                                                <img className="catagoryImg" src={category.link} alt={category.catagory} />
                                                <div className="catagoryText">{category.category}</div>
                                            </button>
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

