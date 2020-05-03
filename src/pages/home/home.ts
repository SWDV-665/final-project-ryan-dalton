
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';
import { CardViewPage } from '../../pages/card-view/card-view'
import { NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions';
//import { ItemSliding } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
  
})
export class HomePage {

  
  entries = []
  errorMessage: string;
//public slidingItem: ItemSliding
  constructor(private androidPermissions: AndroidPermissions, public sanitizer: DomSanitizer, public navparams: NavParams, public navCtrl: NavController, public dataService: JournalEntryProvider) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadEntries();
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
      
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    });
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
    );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
  }

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


  editEntry(entry, index){
    console.log("Editing Entry - ", entry, index)
    this.dataService.editEntry(index, entry);
  }

  //collapse(slidingItem: ItemSliding){
    //slidingItem.close();
 // }
}


