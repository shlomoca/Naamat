import './WomanPage.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, BottomBar } from '../../Components';
import { db } from '../../config/Firebase'
import { Dictionary, langs } from '../../Dictionary';
import $ from 'jquery';
import { storage } from '../../config/Firebase';
import { render } from '@testing-library/react';
import { Link } from 'react-router-dom';


const MainDetails = (props) => {

    return (
        <div id="main_details" >
            <img id="profilePic" className="roundImage" src={props.link} alt={props.display} />
            <h1 >{props.display} </h1>
        </div>
    );
}

export class WomenCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            display: props.display,
            summery: props.summery,
            url: props.prof
        }
    }

    // componentDidMount() {
    //     storage.ref("/" + this.state.id).child("ProfilePic").getDownloadURL().then(url => {
    //         this.state.url = url;
    //     });
    // }
    render() {
        return (
            // <Link to={"/womanPage"+this.state.id}>
            <div id="womanCardsContainer" >
                <img id={"roundImage" + this.state.id} className="roundImage" src={this.state.url} alt={this.state.display} />
                <h1  >{this.state.display} </h1>
                <p>{this.state.summary}  </p>
                <button onClick={editWoman(this.state.id)}>Edit</button>
            </div>
            //    </Link>
        )
    }


}


//WomenDeck expots a list of women by a pop calld cadrs that is an array of fierebase docs
export const WomenDeck = (props) => {
    const vals = Object.values(props.cards);
    const deck = [];
    vals.map(woman => {
        var wName = woman["display" + Dictionary.getLanguage()];
        var sum = woman["highlights" + Dictionary.getLanguage()];
        var id = woman.id;
        var prof = woman.ProfilePic;
        if (wName && sum)
            deck.push(
                <WomenCard display={wName} summary={sum} id={id} prof={prof} />);
    })

    return (
        <div id="deckContainer">
            {deck}
        </div>
    )
}


//delete woman by id.
export function deleteWoman(id) {

    return () => {
        console.log(id);
        if (id) {
            db.collection('women').doc(id).delete().then(() => {
                alert("woman " + id + " was deleted");
                window.location.reload();
            });
        }
        else
            alert("wrong id");
    }

}



//shows a woman by id. gets a prop called id wich should corraspond with a woman id
export const WomanPage = (props) => {
    var id = props.id;
    //get woman by id
    const woman = [];
    var obj;

    // db.collection('women').doc(id).collection('langs').doc(Dictionary.getLanguage()).get().then(snapshot => {
    //     woman.push(snapshot.data());
    //     obj = Object.keys(woman[0]);
    //     console.log(obj);
    //     ReactDOM.render(

    //     )
    // })
    // .catch(error => {
    //     alert("woman not found");
    //     console.log(error);
    // });

    return (
        <div id="WomanPageWrapper" class="wrapper" >
            {/* </div> */}

            <NavBar />
            <ShowWoman id={"גולדה מאיר1898-03-03"}/>
            {/* <div id="womenHolder"  > */}

            {/* 
{ getWomen("shlomo carmi")} */}
            {/* <MainDetails display={obj["display" + Dictionary.getLanguage()]} link={"https://naamat.org.il/wp-content/themes/Naamat-Child-Theme/images/footer-img.jpg"} bday={woman["date" + Dictionary.getLanguage()]} /> */}
            {/* <p><b>{Dictionary.dethDay}:</b> {woman.death}</p>
                <p><b>{Dictionary.highlights}:</b> {woman.highlights}</p>
                <p><b>{Dictionary.biography}:</b> {woman.biography}</p>
                <p><b>{Dictionary.QuotesAnd}:</b> {woman.quotes}</p>
                <p><b>{Dictionary.History}:</b> {woman.historical}</p>
                <p><b>{Dictionary.Contribution}:</b> {woman.contribution}</p>
                <p><b>{Dictionary.facts}:</b> {woman.facts}</p>
                <p><b>{Dictionary.media}:</b> {woman.media}</p>
                <button onClick={deleteWoman(woman.id)} >{Dictionary.delete}</button> */}


            <BottomBar />
        </div>)



}

// class WomanPage extends Component {

//     state = {
//         women: null
//     }

//     componentDidMount() {
//         db.collection('women').get().then(snapshot => {
//             const women = [];
//             snapshot.forEach(doc => {
//                 const data = doc.data();
//                 women.push(data);
//             })
//             this.setState({ women: women })

//         }).catch(error => console.log(error))
//     }

//     render() {
//         return (
//             <div id="WomanPageWrapper" class="wrapper" >

//                 <NavBar />
//                 <FeedbackModal />
//                 <ScrollUpButton />
//                 <div id="womenHolder"></div>

//                 {this.state.women &&
//                     this.state.women.map(woman => {
//                         return (
//                             <div id="womanContainer">
//                                 <img id="profilePic" src="https://naamat.org.il/wp-content/themes/Naamat-Child-Theme/images/footer-img.jpg" />

//                                 <MainDetails display={woman["display" + Dictionary.getLanguage()]} womanName={woman["name" + Dictionary.getLanguage()]} bday={woman["date" + Dictionary.getLanguage()]} />

//                                 <p><b>{Dictionary.dethDay}:</b> {woman.death}</p>
//                                 <p><b>{Dictionary.highlights}:</b> {woman.highlights}</p>
//                                 <p><b>{Dictionary.biography}:</b> {woman.biography}</p>
//                                 <p><b>{Dictionary.QuotesAnd}:</b> {woman.quotes}</p>
//                                 <p><b>{Dictionary.History}:</b> {woman.historical}</p>
//                                 <p><b>{Dictionary.Contribution}:</b> {woman.contribution}</p>
//                                 <p><b>{Dictionary.facts}:</b> {woman.facts}</p>
//                                 <p><b>{Dictionary.media}:</b> {woman.media}</p>
//                                 <button onClick={deleteWoman(woman.id)} >Delete</button>


//                             </div>)
//                     })}
//                 <BottomBar />

//             </div>

//         )

//     }
// }
// export default WomanPage;


//get women gets all women that their name is identical to the womenName atribute



// const showWoman = (props) => {

// }

export class ShowWoman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            womanData: []
        
        }

    }

    componentWillMount() {
        var info = [];
        var display="",
        ProfilePic=""
        db.collection('women').doc(this.state.id).collection('langs').doc(Dictionary.getLanguage()).get().then(snapshot => {
            const data = snapshot.data();
            // snapshot.forEach(doc => {
            //     const data = doc.data();
                info.push(data);
            // })
            var details=[];
            // console.log(info);
            // console.log(Object.keys(info[0]));
            var alldata=info[0];
            (Object.keys(alldata)).forEach(key => {
                if (alldata[key]) {

                    if(key==="display")
                     display=alldata[key]; 
                    else if(key==="ProfilePic")
                     ProfilePic= alldata[key];
                    else
                    details.push(<p><b>{Dictionary[key]}:</b> {alldata[key]}</p>);
                }
            })
            var both=[]
            both.push(<MainDetails display={display} link={ProfilePic}/>);
            both.push(details);
            this.setState({ womanData: both });
            // this.state.womanData.push();
            // this.state.womanData.push(details);
            // console.log(details);
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
// export class getWomen extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             womanName: props.womanName ,
//             women : []
//         }

//     }

//     componentWillMount() {
//         var womanName = this.state.womanName;
//         if (womanName) {
//             var nameattr = "display" + determineLang(womanName);
//             // console.log(nameattr);
//             var MaxIndex = getMaxIndex(womanName);
//             // console.log(MaxIndex)
//             //     //get a women arry with all women results for this search
//             // }
//             //  )   // ).catch(error => console.log(error));

//             //get all the women that ae in the lexicografical area of the search term womanName
//             const women = [];
//             db.collection('women').where(nameattr, ">=", womanName).where(nameattr, "<", MaxIndex).get().then(snapshot => {
//                     snapshot.forEach(doc => {
//                         const data = doc.data();
//                         if (data) {
//                             women.push(data);
//                         }
//                         else
//                         console.log("no data");
//                     })
//                 // var data = snapshot.docs.data();
//                 // women.push(data);
//                 // var obj = Object.keys(women[0]);
//                 // console.log(obj);
//                 this.setState({ women: women });
//             })
//                 .catch(error => {
//                     alert("woman not found");
//                     console.log(error);
//                 });
//         }
//     }
//     render() {
//         return (<WomenDeck cards={this.state.women} />)
//         }
//     }

// // <Link to={"/womanPage"+this.state.id}>
// <div id="womanCardsContainer" >
//     <img id={"roundImage" + this.state.id} className="roundImage" src={this.state.url} alt={this.state.display} />
//     <h1  >{this.state.display} </h1>
//     <p>{this.state.summary}  </p>
//     <button onClick={editWoman(this.state.id)}>Edit</button>
// </div>
// //    </Link>







export function getWomen(womanName) {
    if (womanName) {
        // console.log("min: " + womanName);
        var nameattr = "display" + determineLang(womanName);
        // console.log("min: "+ womanName);
        var MaxIndex = getMaxIndex(womanName);
        // console.log("max: " + MaxIndex)
        //get all the women that ae in the lexicografical area of the search term womanName
        db.collection('women').where(nameattr, ">=", womanName).where(nameattr, "<", MaxIndex).get().then(snapshot => {
            const women = [];
            //get a women arry with all women results for this search
            snapshot.forEach(doc => {
                const data = doc.data();
                if (data) {
                    women.push(data);
                }
                else
                    console.log("no data");

            });
            // console.log(women);
            if (women.length === 0) {
                var find = document.getElementById("womenHolder");
                var deck = document.getElementById("deckContainer");
                if (deck)
                    ReactDOM.unmountComponentAtNode(deck);
                if (find)
                    ReactDOM.unmountComponentAtNode(find);
            }

            else {
                ReactDOM.render(<WomenDeck cards={women} />, document.getElementById('womenHolder'));
            }


        }).catch(error => console.log(error))
    }
    else
        console.log("women not found");
}

//get the next lexicographic index
function getMaxIndex(str) {
    var char = str.slice(-1);
    var newchar = String.fromCharCode(char.charCodeAt(0) + 1);
    var newstr = str.substring(0, str.length - 1);
    if (str.match(/[\u0600-\u06FF]/i)) {
        if (!(newchar.match(/[\u0600-\u06FF]/i)))
            newchar = "اا";
        return newstr.concat(newchar);

    }
    if (str.match(/[\u0590-\u05FF]/i)) {
        if (!(newchar.match(/[\u0590-\u05FF]/i)))
            newchar = "אא";
        return newstr.concat(newchar);
    }
    if (str.match(/^[a-zA-Z]/i)) {
        if (char == 'z' || char == 'Z')
            newchar = "aa";
        return newstr.concat(newchar);
    }
    return str;

}
//deteminLang determins what is the lang first letter in str
function determineLang(str) {
    if (str[0].match(/[\u0600-\u06FF]/i)) {
        return "AR";
    }
    if (str[0].match(/[\u0590-\u05FF]/i)) {
        return "HE";
    }
    if (str[0].match(/^[a-zA-Z]/i)) {
        return "EN";
    }
    return "HE"
}

//editWoman adds the infomation of a woman to the add woman model
export function editWoman(id) {
    var woman;


    db.collection('women').doc(id).get().then(doc => {
        woman = doc.data();

        
            $("#name").val(woman.name);
            $("#name").attr('readonly', true);

            $("#birth").val(woman.birth);
            $("#birth").attr('readonly', true);

            $("#death").val(woman.death);
        
    })

    langs.forEach(lang => {

        db.collection('women').doc(id).collection('langs').doc(lang).get().then(doc => {

            const info = [];
            const data = doc.data();
            if (data) {
                info.push(data);
            }

            if (info.length != 0) {

                Object.values(info).map(fileds => {
                    Object.keys(fileds).map(key => {

                        $("#" + key + lang).val(fileds[key]);
                    })
                })
            }
        })
    })

}


$(document).ready(() => {

    // getWomen("shlomo carmi");
});