import './WomanPage.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, BottomBar } from '../../Components';
import { db, storage } from '../../config/Firebase'
import { Dictionary, langs } from '../../Dictionary';
import { allreadyExist } from '../../forms/Forms'
import $ from 'jquery';



const MainDetails = (props) => {

    return (
        <div id="main_details" >
            <img id="profilePic" className="roundImage" src={props.link} alt={props.display} />
            {props.managerBtns}
            <h1 id="dispName">{props.display} </h1>
        </div>
    );
}




//WomenDeck expots a list of women by a pop calld cadrs that is an array of fierebase docs
export const WomenDeck = (props) => {
    const vals = Object.values(props.cards);
    const deck = [];
    vals.map(woman => {
        var wName = woman["display" + Dictionary.getLanguage()];
        var sum = woman["highlights" + Dictionary.getLanguage()];
        var id = woman.id;
        var prof = woman["ProfilePic"];
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
//show a specific woman in a card shaped component
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


    render() {
        return (
            <a href={"/womanPage/" + this.state.id}>
                <div className="womanCardsContainer" >

                    <img id={"roundImage" + this.state.id} className="roundImage" src={this.state.url} alt={this.state.display} />
                    <h1  >{this.state.display} </h1>
                    <p>{this.state.summary}  </p>
                    {/* here we will put the woman card discription */}
                </div>
            </a>
        )
    }


}

//delete woman by id.
export function deleteWoman(id) {

    // return () => {
    var woman = db.collection('women').doc(id);
    woman.get().then(temp => {
        if (temp.exists) {
            db.collection('women').doc(id).collection('langs').get().then(res => {
                res.forEach(doc => {
                    // first delete sub-collection
                    doc.ref.delete();
                })
                db.collection('women').doc(id).delete().then(() => {
                    deleteBucket(id);
                    alert(`user ${id} was deleted`);
                    window.location="/";
                })
            })
        }
        else
            alert("woman not found");
    }).catch(error => console.log(error));
   
}

function deleteBucket(id) {
    // Since you mentioned your images are in a folder,
    // we'll create a Reference to that folder:
    var storageRef = storage.ref(id);
    // Now we get the references of these images
    storageRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
            // And finally display them
            imageRef.delete();
        });
    }).catch(function (error) {
        // Handle any errors
        console.log(error);
    });

    

}



//shows a woman by id. gets a prop called id wich should corraspond with a woman id
export const WomanPage = (props) => {
    var id = props.match.params.id,
        Admin = props.Admin;
    const woman = [];
    var obj;

    return (
        <div id="WPcover" className="cover">
            <div id="WomanPageWrapper" className="wrapper" >
                <NavBar AdminPage={false} Admin={Admin} />
                <ShoWoman id={id} fields={["highlights", "biography", "histoy", "feminism", "facts", "quotes"]} Admin={Admin} />
            </div>
            <BottomBar />
        </div>

    )



}




//get women gets all women that their name is identical to the womenName atribute
export class ShoWoman extends Component {
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
        if (this.state.Admin) {
            managerBtns = <div className="editWomanBtn" ><button className="btn" onClick={(e) => { e.preventDefault(); allreadyExist(this.state.id, true); }}>{Dictionary.edit}</button>
                <button className=" btn-danger deleteBtn" onClick={() => { if(window.confirm(Dictionary.areYouSure))deleteWoman(this.state.id)}} >{Dictionary.delete}</button></div>;
        }
        db.collection('women').doc(this.state.id).collection('langs').doc(Dictionary.getLanguage()).get().then(snapshot => {
            const data = snapshot.data();
            info.push(data);
            var alldata = info[0];
            if (alldata) {
                page.push(<MainDetails display={alldata["display"]} link={alldata["ProfilePic"]} managerBtns={managerBtns} />);
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





export function getWomen(womanName) {
    if (womanName) {
        var nameattr = "display" + determineLang(womanName);
        var MaxIndex = getMaxIndex(womanName);
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

                Object.values(info).forEach(fileds => {
                    Object.keys(fileds).forEach(key => {
                        if (key != "ProfilePic")
                            $("#" + key + lang).val(fileds[key]);
                        else {
                            $("#" + key).val(fileds[key]);
                        }
                    })
                })
            }
        })
    })

    window.$("#staticBackdrop").modal('show');

}


$(document).ready(() => {

});