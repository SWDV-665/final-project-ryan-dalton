import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal, ModalController} from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  textEntry: String;

 
  constructor(public navCtrl: NavController, 
              public modalCtrl: ModalController, 
              public viewCtrl: ViewController, 
              public navParams: NavParams) {
              
              this.textEntry = null;
      
  
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

  
}
  

