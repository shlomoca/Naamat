import React, { Component } from 'react';
import { storage } from '../config/Firebase';
import { Dictionary } from '../Dictionary';
import $ from 'jquery';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      url: "",
      required: props.required
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }


  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }

  handleUpload = () => {
    var param1 = this.props.param1;
    var param2 = this.props.param2;
    var pathEnd = this.props.pathEnd;
    var path;
    if (!param1)
      return;
    if (!$("#" + param1).val()) {
      alert(this.props.param1Empty);
      return;
    }
    path = $("#" + param1).val();
    if (this.props.param2)
      if (!$("#" + param2).val()) {
        alert(this.props.param2Empty);
        return;
      }
      else
        path += $("#" + param2).val();
    if (pathEnd)
      path += pathEnd;
    {

      const { image } = this.state;
      const uploadTask = storage.ref(path).put(image);
      console.log(path);
      uploadTask.on('state_changed',
        (snapshot) => {
          // progrss function ....
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          this.setState({ progress });
        },
        (error) => {
          // error function ....
          console.log(error);
        },
        () => {
          //displays the picture on screen directly
          // complete function ....
          storage.ref().child(path).getDownloadURL().then(url => {
            alert(Dictionary.uploadSuccess);
            $("#insertdata").val(url);
            this.setState({
              progress: 0,
              image: image,
              url: url
            });
          });
          // console.log(url);
          // this.setState({ url });
          //})
        });
    }
  }
  render() {

    return (
      <div >
        <p>{Dictionary.profilepic}</p>
        <progress value={this.state.progress} max="100" />
        <div className="form-group"> 
        <input type="file" name="file" id="inputGroupFile04 media"  aria-describedby="inputGroupFileAddon04" accept="image/*,audio/*,video/*" onChange={this.handleChange} required={this.state.required}/>
        </div>
        <input type="hidden" id="ProfilePic" name="ProfilePic" value={this.state.url} required/>
        <button type="button" onClick={this.handleUpload}>{Dictionary.upload}</button>
        <br />
      </div>
    )
  }
}
export default ImageUpload;


export class MultiImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      file: null,
      url: "",
      links: [],
      required: props.required
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }


  handleChange = e => {

    const file = Array.from(e.target.files);
    this.setState({ file });
  }

  handleUpload = () => {
    var param1 = this.props.param1;
    var param2 = this.props.param2;
    var pathEnd = this.props.pathEnd;
    var path;
    var links = [];
    if (!param1)
      return;
    if (!$("#" + param1).val()) {
      alert(this.props.param1Empty);
      return;
    }
    path = $("#" + param1).val();
    if (this.props.param2)
      if (!$("#" + param2).val()) {
        alert(this.props.param2Empty);
        return;
      }
      else
        path += $("#" + param2).val();

    

    const storageRef = storage.ref();
    this.state.file.forEach((file) => {
      var filePath = path + '/' + file.name;
      storageRef
        .child(`${path}/${file.name}`)
        .put(file).on('state_changed',
          (snapshot) => {
            // progrss function 
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            this.setState({ progress });
          },
          (error) => {
            // error function
            console.log(error);
          },
          () => {
            //get photo url function
            const refer = storage.ref(filePath);
            refer.getDownloadURL().then(url => {
              links.push(url);
              this.setState({ links: links });
            })
          })
    })


  }
  render() {

    return (
      <div >
        <p>{Dictionary.media}</p>
        <progress value={this.state.progress} max="100" />
        <div className="form-group">
          <input type="file" name="multi_media" id="multi_media" skip={true} aria-describedby="inputGroupFileAddon04" accept="image/*,audio/*,video/*" multiple onChange={this.handleChange} required={this.state.required} />
        </div>
        <input type="hidden" id="linksMedia" name="linksMedia" value={this.state.links} />
        <button type="button" onClick={this.handleUpload}>{Dictionary.upload}</button>
        <br />
      </div>
    )
  }
}
