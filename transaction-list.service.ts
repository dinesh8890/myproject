import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FxsConfig } from '../FXFinanceConfig';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionListService {
  public BaseUrl:string;
  public _Url:string;
  
  constructor(public http: HttpClient) {
    let _Config = new FxsConfig();
            
                 this.BaseUrl = _Config._APIPath("FOAPI");
   }

   trnDetails:any;

  private transactionDetailService =new BehaviorSubject(this.trnDetails); //To set the initial data
  transactionDetailObservable = this.transactionDetailService.asObservable();

  getTransactionList(_Model:any) {  
    
    this._Url = this.BaseUrl + 'api/TransactionList/FindTransactionList';
    return this.http.post(this._Url, _Model)
    .pipe(map(trnlist => {
        console.info("trnlist:",trnlist);
        return trnlist;
    }));  
  }

  getInvoiceList(_Model:any) {  
    
    this._Url = this.BaseUrl + 'api/InvoiceList/FindInvoiceList';
    return this.http.post(this._Url, _Model)
    .pipe(map(trnlist => {
        console.info("INVList:",trnlist);
        return trnlist;
    }));  
  }

  getReceiptList(_Model:any) {  
    
    this._Url = this.BaseUrl + 'api/ReceiptList/FindReceiptList';
    return this.http.post(this._Url, _Model)
    .pipe(map(trnlist => {
        console.info("RecList:",trnlist);
        return trnlist;
    }));  
  }
  
  setTransactionDetails(det:any)
  {
    debugger;
    //this.CompanyCode=com;
    this.trnDetails='';
    this.trnDetails=det;
    console.info("TrnDetails in Service : ",det)
    this.transactionDetailService.next(this.trnDetails)
  }
}
