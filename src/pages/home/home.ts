import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JournalEntryProvider } from '../../providers/journal-entry/journal-entry';
import { CardViewPage } from '../../pages/card-view/card-view'
import { NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
  
})
export class HomePage {

  
  entries = []
  errorMessage: string;

  constructor(public sanitizer: DomSanitizer, public navparams: NavParams, public navCtrl: NavController, public dataService: JournalEntryProvider) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadEntries();
      
    });
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

  
}


