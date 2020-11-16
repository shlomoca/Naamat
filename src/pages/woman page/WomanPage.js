import './WomanPage.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { NavBar, BottomBar, DisplayModal } from '../../Components';
import { db, storage } from '../../config/Firebase'
import { Dictionary, langs } from '../../Dictionary';
import { allreadyExist, EditWomanModal, SuggestWomanModal } from '../../forms/Forms';
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import $ from 'jquery';
import { addPreview } from '../../forms/ImageUpload.jsx';




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
    vals.forEach(woman => {
        if (woman[Dictionary.getLanguage()]) {
            var wName = woman[Dictionary.getLanguage()]["display"];
            var sum = woman[Dictionary.getLanguage()]["summary"];
            var id = woman.id;
            var prof = woman["ProfilePic"];
            if (wName && sum)
                deck.push(
                    <WomenCard display={wName} summary={sum} id={id} prof={prof} woman={true} />);
        }
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
            summary: props.summary,
            url: props.prof,
            woman: props.woman
        }
    }

    render() {
        var imgClas = (this.state.woman) ? "roundImageSerach" : "catImage",
            containerCls = (this.state.woman) ? "womanCardsContainer" : "catCardsContainer",
            nameCls = (this.state.woman) ? "womanTitleSerach" : "catTitle",
            summaryCls = (this.state.woman) ? "summarySearch" : "catSummery",
            aCont = (this.state.woman) ? "" : "catContainCard"
        return (
            <div className={containerCls}>
                <a className={aCont} href={"/womanPage/" + this.state.id}>
                    {/* id={"roundImage" + this.state.id} */}
                    <img className={imgClas} src={this.state.url} alt={this.state.display} />
                    <h3 className={nameCls}>{this.state.display}</h3>
                    <a className={summaryCls} > {this.state.summary} </a>
                </a>
            </div>
        )
    }


}

//delete woman by id.
export function deleteWoman(id) {

    var woman = db.collection('women').doc(id);
    woman.delete().then(() => {
        deleteBucket(id);
        alert(`user ${id} was deleted`);

    }
    ).catch(error => {
        console.log(error)
        alert("woman not found");
    });
}

function deleteBucket(id) {
    console.log("deleting bucket")
    // Since you mentioned your images are in a folder,
    // we'll create a Reference to that folder:
    var storageRef = storage.ref(id);
    // Now we get the references of these images
    storageRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
            // And finally delete them
            imageRef.delete().then(() => {

                window.location = "/";
            }).catch(error => console.log(error));
        })
    }).catch(function (error) {
        // Handle any errors
        console.log(error);
    });



}



//shows a woman by id. gets a prop called id wich should corraspond with a woman id
export const WomanPage = (props) => {
    var id = props.match.params.id,
        Admin = props.Admin;

    return (
        <div id="WPcover" className="cover">
            <div id="WomanPageWrapper" className="wrapper" >
                <NavBar AdminPage={false} Admin={Admin} />
                <EditWomanModal />
                <ShoWoman id={id} fields={["highlights", "biography", "history", "feminism", "facts", "quotes"]} Admin={Admin} />
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
        if (this.state.Admin) {//add edit and delete button for admin users
            managerBtns = <div className="editWomanBtn" ><button className="btn" onClick={(e) => { allreadyExist(this.state.id, true); }}>{Dictionary.edit}</button>
                <button id="womanDeleteBtn" className=" btn-danger deleteBtn" onClick={() => { if (window.confirm(Dictionary.areYouSure)) deleteWoman(this.state.id) }} >{Dictionary.delete}</button></div>;
        }
        //get the data of a specific woman from the woman collaction 
        db.collection('women').doc(this.state.id).get().then(snapshot => {
            const data = snapshot.data();
            info.push(data);
            var alldata = info[0];
            if (alldata && alldata[Dictionary.getLanguage()]) {//if there is a value in the system language

                //main details is the part of the page that will stay sticky
                page.push(<MainDetails display={alldata[Dictionary.getLanguage()]["display"]} link={alldata["ProfilePic"]} managerBtns={managerBtns} />);
                if (alldata["birth"])
                    page.push(<p><b >{Dictionary.birth}:</b> {formatDate(alldata["birth"])}</p>);
                if (alldata["death"])
                    page.push(<p><b>{Dictionary.death}:</b> {formatDate(alldata["death"])}</p>);

                //add all full fields to the page
                (Object.values(this.state.fields)).forEach(key => {
                    if (alldata[Dictionary.getLanguage()][key])
                        page.push(<p><b>{Dictionary[key]}:</b> {alldata[Dictionary.getLanguage()][key]}</p>);
                })
                console.log(alldata[Dictionary.getLanguage()])

                //add the further reading links and bibliography 
                page.push(<FurtherReading links={alldata[Dictionary.getLanguage()]["links"]} bibliography={alldata[Dictionary.getLanguage()]["reading"]} />)

                //add photo strip to the buttom of the page
                page.push(<ShowPhotos photos={alldata["photos"]} />)

            }
            else {
                alert(Dictionary.nothingToShow)
                window.location.href = '/';
            }
            this.setState({
                womanData: page,
                id: this.state.id
            });

        }
        ).catch(error => console.log(error));

    }
    render() {
        return (
            <div id="shoWoman">
                {this.state.womanData}
            </div>
        );
    }
}

//format a date to string in the format dd/mm/yy
function formatDate(date) {
    let info = new Date(date);
    let d = info.getDate() + '/' + (info.getMonth() + 1) + '/' + info.getFullYear();
    return d;
}

//component to present information about the furthur reading atrribute for a women 
const FurtherReading = (props) => {
    var links = props.links,
        bibliography = props.bibliography;
    var obj = [];
    if (bibliography) {
        Object.values(bibliography).forEach(value => {
            obj.push(<p><b>{value}</b></p>);
        })
    }
    if (links) {
        let id = 0;
        Object.keys(links).forEach(key => {
            if (key && links[key]) {
                obj.push(<p><b><DisplayModal id={id} link={links[key]} details={key} /></b></p>);
                id++
            }
        })
    }

    if (obj.length > 0)
        return (<div><b>{Dictionary.furtherReading}:</b><p></p>{obj}</div>);
    else
        return (<div></div>)
}


//searches for woman and 
export function getWomen(womanName, admin) {
    if (womanName) {
        var nameattr = "display" + determineLang(womanName);
        //get all the women that start with the term search
        db.collection('women').where(nameattr, "array-contains", womanName).get().then(snapshot => {
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

            var find = document.getElementById("womenHolder");
            var deck = document.getElementById("deckContainer");
            if (deck)
                ReactDOM.unmountComponentAtNode(deck);
            if (find)
                ReactDOM.unmountComponentAtNode(find);

            if (women.length !== 0) {
                ReactDOM.render(<WomenDeck cards={women} />, document.getElementById('womenHolder'));
            }
            else if (!admin)
                ReactDOM.render(<Suggest />, document.getElementById('womenHolder'));


        }).catch(error => console.log(error))
    }
    else
        console.log("women not found");
}


//a component for calling the suggest women modal
export class Suggest extends Component {


    render() {
        return (
            <div className="suggest">
                <button type="button" id="suggest" className="btn " data-toggle="modal" data-target="#suggestWomanModal">
                    {Dictionary.suggest}</button>;
                <SuggestWomanModal />
            </div>
        )
    }


}


//get the next lexicographic index 
// function getMaxIndex(str) {
//     var char = str.slice(-1);
//     var newchar = String.fromCharCode(char.charCodeAt(0) + 1);
//     var newstr = str.substring(0, str.length - 1);
//     if (str.match(/[\u0600-\u06FF]/i)) {
//         if (!(newchar.match(/[\u0600-\u06FF]/i)))
//             newchar = "اا";
//         return newstr.concat(newchar);

//     }
//     if (str.match(/[\u0590-\u05FF]/i)) {
//         if (!(newchar.match(/[\u0590-\u05FF]/i)))
//             newchar = "אא";
//         return newstr.concat(newchar);
//     }
//     if (str.match(/^[a-zA-Z]/i)) {
//         if (char === 'z' || char === 'Z')
//             newchar = "aa";
//         return newstr.concat(newchar);
//     }
//     return str;

// }


//deteminLang determins what is the lang first letter in str
export function determineLang(str) {
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

//loadWomanToModal adds the infomation of a woman to the add woman model
export function loadWomanToModal(id) {
    var woman;
    db.collection('women').doc(id).get().then(doc => {
        woman = doc.data();
        if (woman.length !== 0) {
            $("#name").val(woman.name).attr('readonly', true);
            $("#birth").val(woman.birth).attr('readonly', true);
            $("#death").val(woman.death);
            $("#ProfilePic").val(woman.ProfilePic);


            if (woman["categories"]) {
                Object.values(woman["categories"]).forEach(cat => {
                    $("#" + cat).prop('checked', true);
                })
            }
            console.log(woman)
            langs.forEach(lang => {
                var arr = woman[lang];
                if (arr)
                    Object.keys(arr).forEach(field => {
                        $("#" + field + lang).val(arr[field]);

                        if (field === "reading") {
                            let i = 0;
                            Object.values(arr[field]).forEach(val => {
                                if (i !== 0) {
                                    var fill = $("#fill2" + Dictionary.getLanguage());
                                    fill.append(`<a>‏</a><input id=${"reading" + Dictionary.getLanguage() + i} lang=${Dictionary.getLanguage()} type="text" autoComplete="off" rows="4" cols="50" name="reading" placeholder=${Dictionary.bibliography} /><a>‏</a>`)
                                    $("#" + field + lang + i).val(val);
                                }
                                else
                                    $("#" + field + lang + i).val(val);
                                i++;
                            })
                        }

                        if (field === "links") {
                            let i = 0;
                            var array = arr[field];
                            Object.keys(array).forEach(key => {
                                if (i !== 0) {
                                    var fill = $("#fill1" + Dictionary.getLanguage());
                                    fill.append(`<a>‏</a><input id=${"description" + Dictionary.getLanguage() + i}  lang = ${Dictionary.getLanguage()} autoComplete="off" type="text" rows="4" className="regularInput" cols="50" name="description" placeholder=${Dictionary.description} />
                                    <a>‏</a>
                                <input id=${"link" + lang + i} lang = ${Dictionary.getLanguage()} type="text" autoComplete="off" rows="4" className="regularInput" cols="50" name="link" placeholder=${Dictionary.link} />`)
                                    $("#description" + lang + i).val(key);
                                    $("#link" + lang + i).val(array[key]);
                                }
                                else {
                                    $("#description" + lang + i).val(key);
                                    $("#link" + lang + i).val(array[key]);
                                }
                                i++;
                            })
                        }

                    })
            })


            //add  photo previews to the page
            let pics = woman.photos
            if (pics) {
                var links = [];
                Object.keys(pics).forEach(key => {
                    let i = pics[key]
                    if (i.pic) {
                        links.push(i.pic);
                        addPreview(i.pic, key, i.HE, i.EN, i.AR);
                    }
                })
            }
        }
    }).catch(error => console.log(error));

    window.$("#staticBackdrop").modal('show');

}

//a container that can slide photos by grabbing them. cliking on a photo will open a modal
export class ShowPhotos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: this.props.photos,
            pos: { top: 0, left: 0, x: 0, y: 0 },
           
        }
    }

    componentDidMount() {
        const ele = document.getElementById('photoContainer');
        if (this.props.photos && ele)
            ele.addEventListener('mousedown', this.mouseDownHandler);
    }

    mouseDownHandler = function (e) {
        e.preventDefault();//remove photo defult drag

        const ele = document.getElementById('photoContainer');
        if (ele) {
            this.setState({
                pos: {
                    // The current scroll 
                    left: ele.scrollLeft,
                    top: ele.scrollTop,
                    // Get the current mouse position
                    x: e.clientX,
                    y: e.clientY,
                }
            })
            // Change the cursor and prevent user from selecting the text
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';
        }

        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }.bind(this);


    mouseMoveHandler = function (e) {
        const ele = document.getElementById('photoContainer');
        // How far the mouse has been moved
        const dx = e.clientX - this.state.pos.x;
        const dy = e.clientY - this.state.pos.y;

        // Scroll the element
        if (ele) {
            ele.scrollTop = this.state.pos.top - dy;
            ele.scrollLeft = this.state.pos.left - dx;
           
        }
        


    }.bind(this);




    mouseUpHandler = function (e) {
        const ele = document.getElementById('photoContainer');
        if (ele) {
            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
        }
        document.removeEventListener('mousemove', this.mouseMoveHandler);
    }.bind(this);

    render() {
        //remove the download and hide thumbnails buttons
        const options = {
            buttons: {
                showDownloadButton: false,
                showThumbnailsButton: false,
            }
        }

        if (!this.props.photos)
            return (<div></div>);
        return (
            <SimpleReactLightbox>
                <SRLWrapper options={options}>
                    <div id="photoContainer" >
                        <div id="lightBox">
                            {Object.keys(this.props.photos).map(key => {
                                return (
                                    <div className="lightBoxImageContainer">
                                        <img className="lightBoxImage" src={this.props.photos[key].pic} alt={this.props.photos[key][Dictionary.getLanguage()]}></img>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </SRLWrapper>
            </SimpleReactLightbox>

        );
    }
}


