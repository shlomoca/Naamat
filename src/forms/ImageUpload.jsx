import React, { Component } from 'react';
import { storage } from '../config/Firebase';
import { Dictionary } from '../Dictionary';
import $ from 'jquery';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ReactDOM from 'react-dom';
import './ImageUpload.css';
class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      crop: {
        unit: '%',
        width: 60,
        aspect: 1 / 1,
      },
      progress: 0,
      url: "",
      required: props.required
    }

    this.handleUpload = this.handleUpload.bind(this);
  }

  handleUpload = () => {

    $("#uploadBtn").data('clicked', true);//set clicked of the button to true
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
              url: url
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
        this.setState({ blob });//save tha blob in the state in order to send it to storage
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
            <img id="croppedUrl" alt="Crop" style={{ maxWidth: '20%', maxHeight: '20%' }} src={croppedImageUrl} />
          )}

        </div>
        <input type="file" name="file" id="inputGroupFile04 media" aria-describedby="inputGroupFileAddon04" accept="image/*" onChange={this.onSelectFile} required={this.state.required} />
        <input type="hidden" id="ProfilePic" name="ProfilePic" value={this.state.url} required />
        <button type="button" id="uploadBtn" onClick={this.handleUpload}>{Dictionary.upload}</button>
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
    var media = document.getElementsByClassName("photoPrev");
    var len = media.length;
    var biggistIndex = 0;
    if (len) {
      for (let i = 0; i < len; i++)
        links.push(media[i].src)
      biggistIndex = media[len - 1].name;
    }
    this.setState({ links: JSON.stringify(links) });


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
      var message = true;
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
              //get photo url function and add an Image preview of it
              const refer = storage.ref(filePath);
              refer.getDownloadURL().then(url => {
                biggistIndex++;
                links.push(url);
                var id = biggistIndex;
                addPreview(url, id);
                this.setState({ links: JSON.stringify(links) });
              }).catch(error => console.log(error));
              if (message) {
                alert(Dictionary.uploadSuccess);
                message = false;
              }
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
          <input type="file" name="multi_media" id="multi_media" skip={true} aria-describedby="inputGroupFileAddon04" accept="image/*" multiple onChange={this.handleChange} required={this.state.required} />
        </div>
        <button type="button" onClick={this.handleUpload}>{Dictionary.upload}</button>
        <div id="presentImages"></div>
        <br />
      </div>
    )
  }
}


//Image element that with three discriptions
export const ImagePreview = (props) => {
  var src = props.src, id = props.id, defHE = props.defHE, defEN = props.defEN, defAR = props.defAR;
  return (<div className="photoPrevContainer" id={"pic" + id}>
    <button type="close" className="deleteImage" aria-label="delete" onClick={() => {deleteImage(src,id)}}>X</button>
    <img className="photoPrev" name={id} id={"linkPic" + id} alt="photo preview" src={src} />
    <div id="descriptionContainer">
      <input type="text" className="photoPrevDescHE" id={"prevDesc" + id + "HE"} name="prevDesc" autoComplete="off" lang="HE" placeholder={Dictionary.addHebDesc} defaultValue={defHE} />
      <input type="text" className="photoPrevDescEN" id={"prevDesc" + id + "EN"} name="prevDesc" autoComplete="off" lang="EN" placeholder={Dictionary.addEngDesc} defaultValue={defEN} />
      <input type="text" className="photoPrevDescAR" id={"prevDesc" + id + "AR"} name="prevDesc" autoComplete="off" lang="AR" placeholder={Dictionary.addArDesc} defaultValue={defAR} />
    </div>
  </div>);
}
export function addPreview(url, id, defHE, defEN, defAR) {
  var node = document.createElement('div')
  node.setAttribute("id", "renderPreview" + id);
  node.setAttribute("class", "SingleRenderBox");
  document.getElementById("presentImages").appendChild(node);
  ReactDOM.render(<ImagePreview src={url} id={id} defHE={defHE} defEN={defEN} defAR={defAR} />, node);
  
}
function deleteImage(url, id){
  if (window.confirm(Dictionary.areYouSure)) {
    (document.getElementById("renderPreview" + id)).remove();
    storage.refFromURL(url).delete().then(function () { }).catch(function (error) { console.log(error); alert("delete faild"); });
  }
}
