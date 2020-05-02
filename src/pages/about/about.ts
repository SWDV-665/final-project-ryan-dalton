import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal, ModalController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
//import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  chosenDate;
  textEntry: String;
  public imagesource: String;
  public itemDate: Date;
  public title: String;
  public blurb: String;
  //Using photopaths to local files - web support coming in the future
  public picture: String;
  //private win: any = window;
 
  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public viewCtrl: ViewController,
              public navParams: NavParams,
              public camera: Camera,
              public journalService: JournalEntryProvider,
              private file: File
              ) {
               
  }

  ionViewDidEnter(){
    this.textEntry = "Enter info here";
    this.imagesource = "assets/imgs/photo-icon.png";
    this.picture = "assets/imgs/photo-icon.png";
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


  getImage(){
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: true
    }
  
    this.camera.getPicture(options).then((imageData) => {
      let filename = imageData.substring(imageData.lastIndexOf('/')+1);
      let path = imageData.substring(0, imageData.lastIndexOf('/')+1);
      this.imagesource = imageData; //'data:image/jpeg/base64,' + 
      //then use the method reasDataURL  btw. var_picture is ur image variable
      this.file.readAsDataURL(path, filename).then(res=> this.picture = res);
      console.log("LOOOOK: ", this.picture);
    }, (err)=> {
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
    console.log("Captured data:", data);
    this.journalService.addEntry(data);
  }
  assembleEntry(){
    return 0;    
  }

  }
    


  
  

