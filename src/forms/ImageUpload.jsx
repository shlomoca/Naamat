import React, { Component } from 'react';
import { storage } from '../config/Firebase';
import { Dictionary } from '../Dictionary';
import $ from 'jquery';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
        src: null,
        crop: {
          unit: '%',
          width: 60,
          aspect: 1/1,
        },
      progress: 0,
      url: "",
      required: props.required
    }
    
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload = () => {

    $("#mustUpload").data('clicked',true);//set clicked of the cutton to true
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

      const { blob } = this.state;
      const uploadTask = storage.ref(path).put(blob);//upload cropped photo to firabse storage
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
            this.setState({
              progress: 0,
              url:url
            });
          }).catch(error => console.log(error));
        });
    }
  }

onSelectFile = e => {
  if (e.target.files && e.target.files.length > 0) {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      this.setState({ src: reader.result })
    );
    reader.readAsDataURL(e.target.files[0]);
  }
};

// If you setState the crop in here you should return false.
onImageLoaded = image => {
  this.imageRef = image;
};

onCropComplete = crop => {
  this.makeClientCrop(crop);
};

onCropChange = (crop, percentCrop) => {
  this.setState({ crop });
};

async makeClientCrop(crop) {
  if (this.imageRef && crop.width && crop.height) {
    const croppedImageUrl = await this.getCroppedImg(
      this.imageRef,
      crop,
      'newFile.jpeg'
    );
    this.setState({ croppedImageUrl });
  }
}

getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error('Canvas is empty');
        return;
      }
      blob.name = fileName;
      this.setState({blob});//save tha blob in the state in order to send it to storage
      window.URL.revokeObjectURL(this.fileUrl);
      this.fileUrl = window.URL.createObjectURL(blob);
      resolve(this.fileUrl);
    }, 'image/jpeg');
  });
}


  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <div className="center" >
        <p>{Dictionary.profilepic}</p>
        <progress value={this.state.progress} max="100" />
        <div className="form-group" id="imgUp">
         
         
        {src && (
          <ReactCrop
          src={src}
          crop={crop}
          ruleOfThirds
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <img id="croppedUrl"  alt="Crop" style={{ maxWidth: '20%', maxHeight: '20%' }} src={croppedImageUrl} />
        )}
          
          <input type="file" name="file" id="inputGroupFile04 media" aria-describedby="inputGroupFileAddon04" accept="image/*" onChange={this.onSelectFile} required={this.state.required} />
        </div>
        <input type="hidden" id="ProfilePic" name="ProfilePic" value={this.state.url} required />
        <button type="button" id="mustUpload" onClick={this.handleUpload}>{Dictionary.upload}</button>
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


    if (this.state.file) {
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
                this.setState({ links: JSON.stringify(links) });
              }).catch(error => console.log(error));
              alert(Dictionary.uploadSuccess);
            })
      })
    }


  }
  render() {

    return (
      <div >
        <p >{Dictionary.media + Dictionary.acceptFiles}</p>
        <progress value={this.state.progress} max="100" />
        <div className="form-group">
          רכיב בפיתוח. כרגע התמונות עולות אבל אין הצגה שלהן
          <input type="file" name="multi_media" id="multi_media" skip={true} aria-describedby="inputGroupFileAddon04" accept="image/*" multiple onChange={this.handleChange} required={this.state.required} />
        </div>
        <input type="hidden" id="linksMedia" name="linksMedia" value={this.state.links} />
        <button type="button" onClick={this.handleUpload}>{Dictionary.upload}</button>
        <br />
      </div>
    )
  }
}
