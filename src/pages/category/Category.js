import './Category.css'
import React, { Component } from 'react';
import { NavBar, BottomBar } from '../../Components';
import { db,storage } from '../../config/Firebase'


class Category extends Component {

    state = {
        categories: null
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
            <div>
                <NavBar />
                <div id="category-container">
                {this.state.categories &&
                    this.state.categories.map(category => {
                        return (
                            <div class="container">
                                <img src={category.link} alt="image not found" />
                                <button class="btn">{category.category}</button>
                            </div>)
                    })}
                    </div>
                    <BottomBar />
            </div>
        )
    }

}
export default Category;

