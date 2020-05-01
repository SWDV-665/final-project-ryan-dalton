import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';


/*
  Generated class for the CameraServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CameraServiceProvider { 
  base64image: any;
  myphoto: any;
  myphotopath: string;

  constructor(public http: HttpClient, private camera: Camera) {
    console.log('Started CameraServiceProvider Provider');
    
  }

//Function to open the phone camera
openCamera(){
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  this.camera.getPicture(options).then((imageData) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.myphoto = 'data:image/jpeg;base64,' + imageData;
   this.base64image = imageData.base64image;
   //this.fileURI = imageData.fileURI;
  }, (err) => {
   // Handle error
   console.log(err)
  });
}


takePhoto(){
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  this.camera.getPicture(options).then((imageData) => {
    this.myphoto = 'data:image/jpeg/base64,' + imageData;
  }, (err)=> {
    console.log(err);
  });
}

getImage(){
  const options: CameraOptions = {
    quality: 70,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum:false
  }

  this.camera.getPicture(options).then((imageData) => {
    this.myphoto = 'data:image/jpeg/base64,' + imageData;
  }, (err)=> {
    console.log(err);
  });
}
}
