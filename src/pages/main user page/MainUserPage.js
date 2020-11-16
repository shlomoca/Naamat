import './MainUserPage.css';
import React, { Component } from 'react';
import { NavBar, BottomBar } from '../../Components.js';
import { db } from '../../config/Firebase';
import { Dictionary } from '../../Dictionary';
import { Link } from 'react-router-dom';

//landing page for the regular user
class MainUserPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      img: {},
      carouselSlids: 0,
      Admin: props.Admin
    }
  }
  render() {
    return (
      <div>
        <div id="mainUPWrapper" className="wrapper">
          <NavBar AdminPage={false} Admin={this.props.Admin} mainUserPage={true} />
          <PictursCarousel />

        </div>
        <BottomBar />
      </div>
    );

  }
}
export default MainUserPage


//a picture carusal that takes a constent number of women and a constent number of facts and presents them to the user 
export class PictursCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: [],
      indicators: [],
      items: [],
      dataslide: 0,
    }
  }

  componentDidMount() {
    const WOMEN_TO_PULL = 3;
    const FACTS_TO_PULL = 3;
    this.getIndexes(WOMEN_TO_PULL, FACTS_TO_PULL);//put women ids and fact ids in the state

  }

  //get indexes calls the indexes and chooses random values from
  //input: num of women desierd and num of facts
  getIndexes(women, facts) {
    db.collection('indexes').get().then(snapshot => {//get indexing files
      let snaps = {};
      snapshot.forEach(snap => {//put actual ids in to snaps
        if (snap.data() && snap.data()["IDs"]) {
          let IDpool = snap.data()["IDs"];
          let kind = snap.id;
          snaps[kind] = {};
          Object.keys(IDpool).forEach(key => {
            if (IDpool[key].includes(Dictionary.getLanguage()))
              snaps[kind][key] = IDpool[key];
          })
        }
      })
      
      //we are using {all} so I can know what to what collaction the id belongs.
      let all = {};
      //extract the amount of ids that were asked for in the function parameters
      Object.keys(snaps).forEach(key => {
        let arr = [];
        let kind = (key === "women Index") ? "women" : "facts";
        let amount = (kind === "women") ? women : facts;

        let data = Object.keys(snaps[key]);//make the ids of this kind an array

        if (amount > data.length)//make sure that there are enough ids
          amount = data.length;

        arr = this.randomizeArr(data, amount);//returns a random arr in the amount size

        //add the number of slides reternd so we know how meny slides we will have
        this.setState({ dataslide: this.state.dataslide + arr.length });
        all[key] = arr;
      });

      Object.keys(all).forEach(key => {//go over both keys and call all ids from firestore
        let collect = (key === "women Index") ? "women" : "didYouKnow";
        all[key].forEach(id => {//for each id for this key

          db.collection(collect).doc(id).get().then(snapshot => {
            if (snapshot.data()) {
              let item;
              let data = snapshot.data();
              if (collect === "women") {
                item = this.pushWomen(data);
              }
              else if (collect === "didYouKnow") {
                item = this.pushFact(data);
              }

              if (item) {//add item to the items state
                let items = this.state.items;
                items.push(item);
                this.setState({ items: items });
              }
              else
                this.setState({ dataslide: this.state.dataslide - 1 });//remove slide becuse id was not used


              if (this.state.dataslide === this.state.items.length)
                this.mixSlides();

            }

          }).catch(error => console.log(error))
        })
      })


    }).catch(error => console.log(error))
  }

  //make sure there is somthing to present and return a carusel slide
  pushWomen(data) {
    if (data["ProfilePic"] && data[Dictionary.getLanguage()]) {//if women has a profile pic and data in user language
      if (data[Dictionary.getLanguage()]["display"] && data[Dictionary.getLanguage()]["highlights"]) {//if there is also a display name and Highlights
        let activated = this.state.activated;
        let active = !activated;
        var slide = <CarouselSlide display={data[Dictionary.getLanguage()]["display"]} highlights={data[Dictionary.getLanguage()]["highlights"]} id={data["id"]} src={data["ProfilePic"]} active={active} />;
        if (!activated)
          this.setState({ activated: true, first: slide });//remember that we activated this slide
        return slide;

      }
    }
  }
  //make sure there is somthing to present and return a carusel slide
  pushFact(data) {
    if (data[Dictionary.getLanguage()]) {//if women has a profile pic and data in user language
      let activated = this.state.activated;
      let active = !activated;
      let slide = <CarouselSlide display={Dictionary.didYouKnow} highlights={data[Dictionary.getLanguage()]} active={active} />;
      if (!activated)
        this.setState({ activated: true, first: slide });//remember that we activated this slide
      return slide;
    }
  }

  //mix slides and add indicators
  mixSlides() {
    let items = this.state.items;
    let len = this.state.dataslide;
    let indicators = [];
    items = this.randomizeArr(items, len);

    for (let i = 0; i < len; i++) {
      let active = this.state.first === items[i];
      indicators.push(<CarouselLi dataslide={i} active={active} />);
    }
    this.setState({ indicators: indicators, items: items });//set the random order and indicators

  }

  //get an array and a target size and return a mixed array with target size values
  randomizeArr(array, targetSize) {
    var res = [];
    var arr = array.slice();
    if (arr.length < targetSize)
      targetSize = arr.length;

    for (let i = 0; i < targetSize; i++) {//get random values from intended document
      let rand = Math.floor(Math.random() * arr.length);
      let val = arr[rand];
      arr.splice(rand, 1);//cut out the wanted object 
      res.push(val);

    }
    return res

  }


  render() {
    return (
      <div id="pictureCarousel">
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol id="carouselIndicators" className="carousel-indicators">
            {this.state.indicators}
          </ol>
          <div id="carouselInner" className="carousel-inner">
            {this.state.items}
          </div>
          <div>
          <a className="carousel-control-next arrow" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">{Dictionary.prev}</span>
          </a>
          </div>
          <div>
          <a className="carousel-control-prev arrow" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">{Dictionary.next}</span>
          </a>
          </div>
        </div>
      </div>
    )
  }

}

//one slide content for the picture carusel
export const CarouselSlide = props => {
  let clas = props.active ? "carousel-item active" : "carousel-item";
  let img = props.src ? <img src={props.src} className="roundedImg" alt={props.display} height="150px" width="150px" /> : "";
  let id = `/womanPage/${props.id}`;

  if (props.id) {//if it is a women slide
    return (
      <div className={clas} >
        <Link to={id}>
          <div className="titleContainer">
            <div className="boldH1">
              {props.display}
            </div>
            <div className="imageContainer">
              {img}
            </div>
          </div>
        </Link>

        <Link to={id} className="slideDesc">
          <div className="boldH3" >
            {props.highlights}
          </div>
        </Link>
        <div className="leftEnd">
        <Link to={id}  >
          {Dictionary.furtherReading}
        </Link>
        </div>
      </div>

    )
  }
  else {//if it is a fact slide

    return (
      <div className={clas} >
        <div className="titleContainer">
          <div className="boldH1">
            {props.display}
          </div>
        </div>
        <div className="boldH3">
          <a className="factDesc">
            {props.highlights}
          </a>
        </div>
      </div>

    )
  }
}

//carusel indicator showing witch slide is shoing at this moment
export const CarouselLi = props => {
  var clas = "";
  if (props.active)
    clas = "active";
  return (
    <li data-target="#carouselExampleIndicators" data-slide-to={props.dataSlideTo} className={clas}></li>
  )
}








