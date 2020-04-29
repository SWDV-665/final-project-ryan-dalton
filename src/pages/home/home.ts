import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public dataService: JournalEntryProvider) {

  }


  loadEntries(){
    return this.dataService.getItems();
  }


  viewEntry(entry, index){
    console.log("Viewing Entry - ", entry, index)
    this.dataService.viewItem(index)

  }

  editEntry(entry, index){
    console.log("Editing Entry - ", entry, index)
    this.dataService.editEntry(index)
  }

  shareEntry(entry, index){
    console.log("Sharing Entry - ", entry, index)
    this.dataService.shareEntry(index)
  }

}