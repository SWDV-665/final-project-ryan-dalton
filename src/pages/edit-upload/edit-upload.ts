import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavParams, NavController } from 'ionic-angular';
import { AboutPage } from '../../pages/about/about';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';

/**
 * Generated class for the EditUploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-upload',
  templateUrl: 'edit-upload.html',
})
export class EditUploadPage{
  public title: String;
  public itemDate: String;
  public picture: String;
  public blurb: String;
  public id: String;

  constructor(
    public about: AboutPage,
    public loadingCtrl: LoadingController,
    public dataService: JournalEntryProvider,
    public navParams: NavParams,
    public navCtrl: NavController){
      this.title = this.navParams.get('title');
      this.itemDate = this.navParams.get('itemDate');
      this.picture = this.navParams.get('picture');
      this.blurb = this.navParams.get('blurb');
      this.id = this.navParams.get('._id');
  }

  getImage(){
    //Call the code from the about page for uploading a new picture
    this.about.getImage();
  }


  presentModal(){
    this.about.presentModal()
  }
  async buttonClicked(id){  
    
    let data = {
      "title": this.title,
      "itemDate": this.itemDate,
      //if no picture is selected, use the generic photo image shown w/ imagesource path
      "picture": this.picture,
      "blurb": this.blurb,
      "_id": this.id,
    }
    console.log("Captured data:", this.title, this.itemDate, this.picture, this.blurb);
    await this.dataService.editEntry(data, this.id);
    this.about.presentLoading();
    await new Promise(resolve => setTimeout(resolve, 2000)); //wait 2 seconds
    this.about.toast("Uploaded Edits to Journal Entry!");
    this.navCtrl.pop();
    
    }
}
