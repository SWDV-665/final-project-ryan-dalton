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
  public mode: string;
  public savedEntry:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.textEntry = this.navParams.get('textEntry');
    this.mode = this.navParams.get('mode');
    if (this.textEntry === "Enter info here"){
      this.textEntry = "" //Opt to just have the placeholder the first time
      
    }
    this.savedEntry = this.textEntry;

  }

  ionViewDidLoad() {
    console.log('Loaded ModalPage');
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
  closeModal(){ 
  if (this.mode === "edit"){

    this.viewCtrl.dismiss(this.savedEntry);} //keep users previous information showing
    else{
      this.viewCtrl.dismiss(); //Close and don't save info
    }

  }

}
