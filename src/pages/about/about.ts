import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Modal, ModalController} from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

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
    })

  }

  
}
  

