import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal, ModalController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
//import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';
import { DomSanitizer } from '@angular/platform-browser';
//import { Storage } from '@ionic/storage';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


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
  public base64image: string;
 
  constructor(
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private androidPermissions: AndroidPermissions, 
              public webview: WebView,
              public sanitizer: DomSanitizer,
              public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public camera: Camera,
              public journalService: JournalEntryProvider,
              
              
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

  toast(updateString: string){
    console.log("Notified User -", updateString);
    const toast = this.toastCtrl.create({
      message: updateString,
      duration: 3000
    });
    toast.present();

  }

  loadModalContent(textEntry){
    this.textEntry = textEntry;
  }

/* More unused code to get the image to be stored into external android storage.
Apparently Androids have more security than what I am used to. :)

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
**/


//Here we make sure we have Android Permissions to use the camera
  getAndroidPermissions(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    ); 
//Other permissions needed for future functionality:
//this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE
//this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    
  }

  //Complicated function that took way too long to get correctly done to get the photos
  //convert them into base64 and save to a String for upload to Heroku
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
    //By putting getAndroid permissions in here - this shouldn't trigger on webview w/ the Cordova error, we'll see
    //this.getAndroidPermissions()
    this.camera.getPicture(options).then((imageData) => {
      
      //let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      //let path = imageData.substring(0, imageData.lastIndexOf('/')+1);
      this.imagesource = 'data:image/jpeg;base64,' + imageData;
      this.picture = 'data:image/jpeg;base64,' + imageData;
      //then use the method reasDataURL  btw. var_picture is ur image variable
      //const newBaseFilesystemPath = this.file.externalDataDirectory;
      //console.log("FILENAME", filename);
      //console.log("PATH", path);
      //const result = imageData.readAsDataURL(path, filename);//.then(res=> this.picture);
      //this.picture = result;
    
    }, (err)=> {
      alert("Please run App in Android Phone to enable Cordova/Camera Functionality")
      console.log("Camera functionality not available outside of Android App, error here:", err);
      
    });
  }

  /** UNUSED CODE - previously we were trying to convert external storage filepaths
   * to URLs to show in the code. Whitelisting would not allow unsafe URIs despite numerous attempts.
  prepImage(imageSource) {
    
    const resolvedImg= this.webview.convertFileSrc(imageSource);
    console.log("CONVERTED IMAGESOURCE to URL:", resolvedImg);
    this.safeImg = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
    console.log("URL SANITIZED")
    this.picture = this.safeImg;
  }*/

  /**This puts the page data together uploads it as a and sends it to the journal service
  *For upload.  If there is a problem with the data, (because it is incomplete)
  Heroku will accept the data but will not display it on the other page*/
  async buttonClicked(){  
    
    let data = {
      "title": this.title,
      "itemDate": this.chosenDate,
      //if no picture is selected, use the generic photo image shown w/ imagesource path
      "picture": this.picture,
      "blurb": this.blurb
    }
    console.log("Captured data:", this.title, this.chosenDate, this.picture, this.blurb);
    await this.journalService.addEntry(data);
    this.presentLoading();
    this.resetForm();
    await new Promise(resolve => setTimeout(resolve, 2000)); //wait 3 seconds
    this.toast("Uploaded Journal Entry!");
    }

  //This function clears out the form and resets it for a new entry
  resetForm(){
    this.imagesource = "assets/imgs/photo-icon.png";
    this.textEntry = "Enter info here";
    this.picture = "assets/imgs/photo-icon.png";
    this.blurb = "Enter text here";
    this.chosenDate = "";
    this.title = "";
  }

  //This function utilizes the loading controller to create a short loading animation
  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Uploading entry...",
      duration: 2000
    });
    loader.present();
  }


  }
    


  
  

