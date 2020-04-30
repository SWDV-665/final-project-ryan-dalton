import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  public textEntry:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('Loaded text entry ModalPage');
  }

  saveModal(textEntry) {
    if (textEntry === undefined) {
      alert("You need to type something in to save.")
      return;
    }
    else {
    console.log('Saved the following:', textEntry)
    this.viewCtrl.dismiss(textEntry) }
  }
  closeModal() {
    this.viewCtrl.dismiss();

  }

}
