import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';  
import {FxsConfig} from '../../FXFinanceConfig';
import { SessionStorageService } from 'angular-web-storage';
//import { HttpClient, HttpHeaders, HttpClientModule,HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { ApiEndpointConfiguration } from '../../endpoint/endpointConfig';

import { shareReplay } from 'rxjs/operators';
import { GroupPropertyComponent } from 'src/app/components/group-property/group-property.component';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  DataForController: any;
  public BaseUrl:string;
  public _url:string;

  debugger;
  constructor(private _http:Http,private Session: SessionStorageService) 
      {  
        this.debugger;
               let _Config = new FxsConfig();
            
                 this.BaseUrl = _Config._APIPath("FOAPI");
                 //debuggerin;
               //  this.BaseUrl = _Config._APIPath("http://localhost:51543");
      }

      
      GetGroupCodeListService() {  
          debugger;
          this._url = this.BaseUrl + 'api/GroupProperty/FindAllGroupCode';
          console.log("groupcode url : ", this._url);
          return this._http.get(this._url);
      } 
        

      GetPropertyListService(_GroupCode : string) {  
          debugger;
        let _Model = {
          "GROUPCODE": _GroupCode,
        };
          this._url = this.BaseUrl + 'api/GroupProperty/FindAllProperty';
          return this._http.post(this._url, _Model)
          .pipe(map(data => { return data; }));
        } 
        
      CurrencyListService(_PmsCustCode : number) {  
        //   debugger;
          let _Model = {
          "PMSCUSTCODE": _PmsCustCode,
          "IsDefault":false
          };
          this._url = this.BaseUrl + 'api/Currency/FindPropertyCurrency';
          return this._http.post(this._url, _Model)
          .pipe(map(data => { return data; }));
        } 

        DefaultCurrencyService(_PmsCustCode : number) {  
          //   debugger;
            let _Model = {
            "PMSCUSTCODE": _PmsCustCode,
            "IsDefault":true
            };
            this._url = this.BaseUrl + 'api/Currency/FindPropertyCurrency';
            return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          } 
  
        GetExchangeRateService(_PmsCustCode : number, _AppDate : string, _Currency: string) 
        {  
          //  debugger;
          let _Model = {
            "PmsCustCode": _PmsCustCode,
            "CurrencyCode":_Currency,
            "ApplicableDate": _AppDate
            };

          this._url = this.BaseUrl + 'api/ExchangeRate/FindExchangeRate';
          return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          } 
        
        
      getCompanyDetails(_Model : any) {  
        // let _Model = {
        //   "PmsCustCode": _PmsCustCode,
        //   "Classification":_Classification
        //   };

        this._url = this.BaseUrl + 'api/Company/PostCompany';
        return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
      }   

      getAccountBalance(_Model:any) {  

        this._url = this.BaseUrl + 'api/AccountBalance/GetAccountBalanceAsOnDate';
          return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
      } 
      
        getOutStandingDebitDetails(_Model:any)
          {
          this._url = this.BaseUrl + 'api/OutStanding/FindOutStandingDebits';
          return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          
      }

      getOutStandingCreditDetails(_Model:any)
      {
      
      this._url = this.BaseUrl + 'api/OutStanding/FindOutStandingCredits';
      return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          
      } 

      getFOMTaxStructureListService(_Model:any)
      {
      
      this._url = this.BaseUrl + 'api/Tax/FindFOMTaxStructure';
      return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          
      }

      getPOSTaxStructureListService(_Model:any)
      {
      
      this._url = this.BaseUrl + 'api/Tax/FindPOSTaxStructure';
      return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          
      }

      getStateListService(_Model:any)
{
  this._url = this.BaseUrl + 'api/State/FindStates';
  return this._http.post(this._url, _Model)
        .pipe(map(data => { return data; }));

}
      getPredefinedListService(_Model:any)
      {
          this._url = this.BaseUrl + 'api/GroupProperty/FindPredefinedInfo';
        return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          
      }

      CalculateTaxAndCommissionService(_Model:any)
      {

        this._url = this.BaseUrl + 'api/TaxCalculation/CalculateTaxAndCommission';
        return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          
      }

      // CalculateTaxAndCommissionService()
      // {
      //   return this.BaseUrl + 'api/TaxCalculation/CalculateTaxAndCommission';
          
      // }
            
      GetACRTransactionDetails(_Model:any)
      {
//        this._url = this.BaseUrl + 'api/TransactionDetails/GetACRTransactionDetails';
        this._url = this.BaseUrl + 'api/CreateInvoice/GetSalesInvoiceDetails';
    
        return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
      }          
         
      getPropertyInfoService(_Model:any)
      {
        this._url = this.BaseUrl + 'api/GroupProperty/FindProperty';
        return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
      }

      GetListReceiptService(_Model: any) 
        {  
          //  debugger;
          // let _Model = {
          //   "PmsCustCode": _PmsCustCode,
          //   "CurrencyCode":_Currency,
          //   "ApplicableDate": _AppDate,
          //   "DocumentType": "R",
          //   "FromDate": "2019-01-01",
          //   "ToDate": "2019-12-31",
          //   "StatusType": "Open",
          //   "ApplyFilter": 1,
          //   "IsManual": 1,
          //   "Company": "COM0001",
          //   "PageNumber": 1,
          //   "TotalRows": 5
          //   };

          this._url = this.BaseUrl + 'api/ReceiptList/FindReceiptList';
          return this._http.post(this._url, _Model)
            .pipe(map(data => { return data; }));
          } 



    }