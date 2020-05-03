import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal, ModalController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
//import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';
import { File } from '@ionic-native/file';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  
  chosenDate;
  public safeImg: any;
  public textEntry: String;
  public imagesource: String;
  public itemDate: Date;
  public title: String;
  public blurb: String;
  //Using photopaths to local files - web support coming in the future
  public picture: any;
  private sanitize: DomSanitizer;
  public base64image: string;
  private win: any = window;
 
  constructor(
              private androidPermissions: AndroidPermissions, 
              public webview: WebView,
              public sanitizer: DomSanitizer,
              public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public camera: Camera,
              public journalService: JournalEntryProvider,
              private file: File,
              
              ) {
                this.imagesource = "assets/imgs/photo-icon.png";
                this.textEntry = "Enter info here";
                this.picture = "assets/imgs/photo-icon.png";
                this.blurb = "Enter text here";
                
  }
  ionViewDidEnter(){
    
  }

  checkAllEntries() {
    return true;
  }

  presentModal() {
    const myModal: Modal = this.modalCtrl.create('ModalPage');
    myModal.present();
    
    myModal.onDidDismiss((textEntry) => {
      console.log("brought data", textEntry, "out of ModalPage");
      this.loadModalContent(textEntry);
      this.blurb = textEntry;
    })

  }

  loadModalContent(textEntry){
    this.textEntry = textEntry;
  }

  async getImageSaved() {
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  }
  console.log("GETTING IMAGE")
  this.camera.getPicture(options).then((imageData) =>{
  this.imagesource = imageData,
  this.picture = imageData,
  this.saveImage(imageData);
  });
  
}

saveImage(tempImage){
  const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
  const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);
  
  const newBaseFilesystemPath = this.file.externalDataDirectory; //dataDirectory;
  console.log("NEW BASE PATH FOR NEW IMAGE IS:", newBaseFilesystemPath);
  console.log("THE NEW NAME FOR THE IMAGE IS:", tempFilename);
  this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath, tempFilename);
  
  const storedPhoto = newBaseFilesystemPath + tempFilename;
 
  const oldpicture = this.picture
  this.picture = storedPhoto;
  console.log("THIS PICTURE CHANGED FROM: ", oldpicture," TO: ", this.picture);
  
}
  //Here we make sure we have Android Permissions to manipulate storagea and use the camera
  getAndroidPermissions(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );
    
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
  );
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
  )
  
  }

  getImage(){
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      targetWidth:200,
      targetHeight:200
    }
    this.getAndroidPermissions()
    this.camera.getPicture(options).then((imageData) => {
      
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path = imageData.substring(0, imageData.lastIndexOf('/')+1);
      this.imagesource = 'data:image/jpeg;base64,' + imageData;
      this.picture = 'data:image/jpeg;base64,' + imageData;
      //then use the method reasDataURL  btw. var_picture is ur image variable
      //const newBaseFilesystemPath = this.file.externalDataDirectory;
      //console.log("FILENAME", filename);
      //console.log("PATH", path);
      //const result = imageData.readAsDataURL(path, filename);//.then(res=> this.picture);
      //this.picture = result;
    
    }, (err)=> {
      console.log("OH NOS");
      console.log(err);
    });
  }

  /** 
  prepImage(imageSource) {
    
    const resolvedImg= this.webview.convertFileSrc(imageSource);
    console.log("CONVERTED IMAGESOURCE to URL:", resolvedImg);
    this.safeImg = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
    console.log("URL SANITIZED")
    this.picture = this.safeImg;
  }*/

  buttonClicked(){  
    
    let data = {
      "title": this.title,
      "itemDate": this.chosenDate,
      "picture": this.picture,
      "blurb": this.blurb
    }
    console.log("Captured data:", this.title, this.chosenDate, this.picture, this.blurb);
    this.journalService.addEntry(data);
  }


  }
    


  
  

