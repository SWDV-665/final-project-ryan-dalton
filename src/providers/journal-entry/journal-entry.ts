import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, AlertController } from 'ionic-angular';
import { Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the JournalEntryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JournalEntryProvider {

  JournalEntry = {
    title: String,
    itemDate: Date,
    picture: String,
    blurb: String
  }

  entries: any = [];

  dataChanged$: Observable<boolean>;

  public dataChangeSubject: Subject<boolean>;

  baseURL = "https://journal-server-h.herokuapp.com"


  constructor(public http: HttpClient, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    console.log('JournalEntry data upload provider service started');

    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

    //I am borrowing from the groceries app assignment from week 7 on this code
    //as I would also like to use a REST service to pas data back and forth
    //with MongoDB

    getEntries(): Observable<object[]> {
    //DEBUG//console.log(this.baseURL + '/api/entries')
    return this.http.get(this.baseURL + '/api/entries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

    private extractData(res: Response) {
      let body = res;
      return body || {};
    }

    private handleError(error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
        const err = error || '';
        errMsg = `${error.status} - ${error.statusText} || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }

    removeEntry(id){
      console.log("#### Removed Item - id = ", id);
      this.http.delete(this.baseURL + "/api/entries/" + id).subscribe( res => {
        this.entries = res;
        this.dataChangeSubject.next(true);
      })
    }

    addEntry(data) {
      this.http.post(this.baseURL + "/api/entries", data).subscribe(res => {
        this.entries = res;
        this.dataChangeSubject.next(true);
      });
    }

    logItem(JournalEntry){
      console.log("Journal Entry Details:", JournalEntry)
      return JournalEntry
    }

    editEntry(entry, id) {
      console.log("Edited the item = ", id, entry);
      this.http.put(this.baseURL + "/api/entries/" + id, entry).subscribe( res => {
        this.entries = res;
        this.dataChangeSubject.next(true);
      });
      }


}

