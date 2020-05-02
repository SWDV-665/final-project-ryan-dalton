import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CardViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-view',
  templateUrl: 'card-view.html',
})



export class CardViewPage {
  public title: String;
  public itemDate: String;
  public picture: String;
  public blurb: String;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.title = this.navParams.get('title');
    this.itemDate = this.navParams.get('itemDate');
    this.picture = this.navParams.get('picture');
    this.blurb = this.navParams.get('blurb');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardViewPage');
    
  }

}
