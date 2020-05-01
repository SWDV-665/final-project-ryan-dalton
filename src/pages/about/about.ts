import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal, ModalController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { CameraServiceProvider } from '../../providers/camera-service/camera-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  textEntry: String;
  data: JSON;

 
  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public viewCtrl: ViewController, 
              public navParams: NavParams,
              public camera: CameraServiceProvider,
              ) {
              
              this.textEntry = null;
              this.data = null;
  
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

  openGallery(){
    this.camera.openGallery()
  }

 
  }

  
  

