import './Category.css'
import React, { Component } from 'react';
import { NavBar, BottomBar } from '../../Components';
import { db } from '../../config/Firebase'


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

{/* <div>
                <NavBar />

                <div class="container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRCGr0Zt1YnKCHjFGOCLzLAKng9zXDYObGIhEoJfhU1_kTv7Do1&usqp=CAU" alt="Snow" />
                    <button class="btn">פוליטיקה</button>
                </div>

                <div class="container">
                    <img src="https://cdn.brainpop.com/he/he/new_common_images/images/10/103566.jpg" alt="Snow" />
                    <button class="btn">מדעים</button>
                </div>

                <div class="container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8m6X1kQLG23ItGp7yhe3KDNY-RFuY4OJogQz-Ox2lsttKZPbp&usqp=CAU" alt="Snow" />
                    <button class="btn">ספורט</button>
                </div>

                <BottomBar />
            </div> */}