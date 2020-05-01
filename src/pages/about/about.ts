import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal, ModalController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
//import { CameraServiceProvider } from '../../providers/camera-service/camera-service';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  textEntry: String;
  public imagesource: String;
  //private win: any = window;
 
  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public viewCtrl: ViewController, 
              public navParams: NavParams,
              public camera: Camera
              
              ) {
              
              this.textEntry = null;
              this.imagesource = "assets/imgs/photo-icon.png" 
              
  }

  ionViewDidEnter(){
    //Refresh
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
      console.log("Added image URI: ", imageData)
    }, (err)=> {
      console.log(err);
    });
  }

  }
    


  
  

