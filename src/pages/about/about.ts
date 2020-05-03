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
import { WebViewOriginal } from '@ionic-native/ionic-webview';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  chosenDate;
  private webview: WebViewOriginal;
  public textEntry: String;
  public imagesource: String;
  public itemDate: Date;
  public title: String;
  public blurb: String;
  //Using photopaths to local files - web support coming in the future
  public picture: any;
  private sanitize: DomSanitizer;
  public base64image: string
  //private win: any = window;
 
  constructor(
              public sanitizer: DomSanitizer,
              private storage: Storage,
              public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public camera: Camera,
              public journalService: JournalEntryProvider,
              private file: File
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
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
  }
  console.log("GETTING IMAGE")
  const tempImage = await this.camera.getPicture(options);
  this.imagesource = tempImage;
  await this.saveImage(tempImage);
}

async saveImage(tempImage){
  const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
  const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);
  
  const newBaseFilesystemPath = this.file.externalDataDirectory; //dataDirectory;
  console.log("NEW BASE PATH FOR NEW IMAGE IS:", newBaseFilesystemPath)
  await this.file.copyFile(tempBaseFilesystemPath, tempFilename, newBaseFilesystemPath, tempFilename)
  
  const storedPhoto = newBaseFilesystemPath + tempFilename;
  const resolvedImg = this.webview.convertFileSrc(storedPhoto);
  const safeImg = this.sanitizer.bypassSecurityTrustUrl(resolvedImg);
  
  const oldpicture = this.picture
  this.picture = resolvedImg;
  console.log("THIS PICTURE CHANGED FROM: ", oldpicture," TO: ", this.picture);
  
}
 

  getImage(){
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
  
    this.camera.getPicture(options).then((imageData) => {
      
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path = imageData.substring(0, imageData.lastIndexOf('/')+1);
      this.imagesource = imageData;
      this.picture = imageData; //'data:image/jpeg/base64,' + 
      //then use the method reasDataURL  btw. var_picture is ur image variable
      console.log("FILENAME", filename);
      console.log("PATH", path);
      //imageData.readAsDataURL(path, filename).then(res=> this.picture);
      
    
    }, (err)=> {
      console.log("OH NOS");
      console.log(err);
    });
  }

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
    


  
  

