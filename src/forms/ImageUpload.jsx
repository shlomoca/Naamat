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
      url: ""
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
      alert(path);

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
        <input type="file" name="file" id="inputGroupFile04" id="media" aria-describedby="inputGroupFileAddon04" accept="image/*,audio/*,video/*" onChange={this.handleChange} required/>
        <input type="hidden" id="insertdata" name="ProfilePic" value={this.state.url} />
        <button type="button" onClick={this.handleUpload}>{Dictionary.upload}</button>
        <br />
      </div>
    )
  }
}
export default ImageUpload;