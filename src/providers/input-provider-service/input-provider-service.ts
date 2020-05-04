import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the InputProviderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputProviderServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello InputProviderServiceProvider Provider');
  }

}

/**
 * Decided against using this due to time constraints (assignment is due in several hours
 * In the future would migrate all functionality from about and edit-upload pages and consolidate
 * into one page that pulls references from both)
 */
