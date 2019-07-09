import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';  
import{FxsConfig} from '../FXFinanceConfig';
import { SessionStorageService } from 'angular-web-storage';
import { HttpClient, HttpHeaders, HttpClientModule,HttpResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class TransactionlistService {
  DataForController: any;
  public BaseUrl:string;
  public _returntext:string;
 
  constructor(public _http: HttpClient,private Session: SessionStorageService) { 
    let _Config = new FxsConfig();
          
    this.BaseUrl = _Config._APIPath("FOAPI");
    //debugger;
    //this.BaseUrl = _Config._APIPath("http://localhost:59606");

  }
  
  getTransactionList()
  {
      debugger;
      this._returntext = this.BaseUrl + 'FXFAS/GetTransactionList';
      return this._returntext;
  }
}
