
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';
import { CardViewPage } from '../../pages/card-view/card-view'
import { NavParams } from 'ionic-angular';
//import { DomSanitizer } from '@angular/platform-browser';
import { ToastController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { EditUploadPage } from '../../pages/edit-upload/edit-upload';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  
  entries = []
  errorMessage: string;
//public slidingItem: ItemSliding
  constructor(
    public toastCtrl: ToastController,
    //public sanitizer: DomSanitizer, 
    public navparams: NavParams, 
    public navCtrl: NavController, 
    public dataService: JournalEntryProvider) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadEntries();
    
  })}

  ionViewDidLoad(){
    this.loadEntries();
  }

  
  loadEntries(){
    console.log("Loading Entries...")
    this.dataService.getEntries().subscribe(
      entries => this.entries = entries,
      error => this.errorMessage = <any>error);

  }

  
  viewEntry(entry){
  console.log("Viewing Entry - ", entry)
  this.navCtrl.push(CardViewPage, entry);
  }


  editEntry(entry, id){
    console.log("Editing Entry - ", entry.title, id);
    this.toast("Editing entry - ", entry.title);
    this.navCtrl.push(EditUploadPage, entry, id);
    
    //this.dataService.editEntry(index, entry);
  }

  removeEntry(entry, id){
    console.log("Deleting Entry - ", entry);
    this.dataService.removeEntry(entry._id);
    this.toast("Deleted entry - ", entry.title);
  }
  collapse(slidingItem: ItemSliding){
    slidingItem.close();
  }

  //created a different toast function for the home page
  //That allows passing multiple parameters
  toast(updateString: string, params?: any){
    console.log("Notified User -", updateString, "-", params);
    const toast = this.toastCtrl.create({
      message: updateString + params,
      duration: 2000
    });
    toast.present();

  }
}


