import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController} from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  presentModal() {
    const modal = this.modalCtrl.create('ModalPage');
    modal.present();
  }

}


