//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';

/*
  Generated class for the JournalEntryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JournalEntryProvider {

  entries = [
    {
      ItemID: '1',
      Title: "Our Family Picnic",
      Date: "4/15/2020",
      Picture: "Weekend-Family-Picnic-Stock-Photo-04.jpg",
      Theme: "Basic",
      Blurb: "We had such a blast at the Veterans Memorial Park earlier this week! We ate some pizza, and played games. It was beautiful and sunny! Amazing time with the family.",
    },
    {
      ItemID: '2',
      Title: "Scary Earthquake",
      Date: "4/18/2020",
      Picture: "Weekend-Family-Picnic-Stock-Photo-04.jpg",
      Theme: "Basic",
      Blurb: "Tonight there was a scary earthquake! We're glad nobody got hurt."
    }

  ]


  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController) {
    console.log('JournalEntry provider started');
  }

    getItems(){
      return this.entries;
  }

    //Need to build these out
    viewItem(index){
      return 0
    }

    //Need to build these out
    editEntry(index){
      return 0
    }

    shareEntry(index){
      return 0
    }



}

