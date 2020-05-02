import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal, ModalController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
//import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';


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
              public journalService: JournalEntryProvider
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
    this.textEntry = textEntry
    
  }


  getImage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imagesource = imageData; //'data:image/jpeg/base64,' + 
      this.picture = imageData;
      console.log("Added image URI: ", imageData)
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
    


  
  

