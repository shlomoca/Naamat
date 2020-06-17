import React, { Component } from 'react';
import { storage } from '../config/Firebase';
import { Dictionary } from '../Dictionary';
import $ from 'jquery';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: '',
      progress: 0
    }
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  /* handleChange = e => {
     for(let i=0; i<e.target.files.length;i++){
       const image = e.target.files[i];
       this.setState(() => ({ image }));
     }
   }*/

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  }


  /*
  onUploadSubmission = e => {
   e.preventDefault(); // prevent page refreshing
     const promises = [];
     e.target.files.forEach(file => {
      const uploadTask = storage.ref.child(`your/file/path/${file.name}`).put(file);
         promises.push(uploadTask);
         uploadTask.on(
            "STATE_CHANGED",
            (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              this.setState({ progress });
              },
              error => console.log(error.code),
              async () => {
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                 // do something with the url
               }
              );
            });
        Promise.all(promises)
  .then(() => alert('All files uploaded'))
         .catch(err => console.log(err.code));
  }*/

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
          // storage.ref('images').child(image.name).getDownloadURL().then(url => {
          //alert("upload completed");
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
        <input type="file" name="file" id="inputGroupFile04" id="media" aria-describedby="inputGroupFileAddon04" accept="image/*|audio/*|video/*" onChange={this.handleChange} />
        <button type="button" onClick={this.handleUpload}>{Dictionary.upload}</button>
        <br />
        {/* <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded images" height="300" width="400" /> */}
      </div>
    )
  }
}

/* <div id="name-group" class="form-group">
                                <label id="lb" for="inputGroupFile04">{Dictionary.upload}</label>
                                <div class="input-group">
                                    <div class="custom-file">
                                        <input type="file" name="file" class="custom-file-input" id="inputGroupFile04" id="media" aria-describedby="inputGroupFileAddon04" />
                                        <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                                    </div>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">{Dictionary.upload}</button>
                                    </div>
                                </div>
                            </div> */
export default ImageUpload;