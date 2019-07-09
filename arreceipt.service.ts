import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';  
import {FxsConfig} from '../FXFinanceConfig';
import { SessionStorageService } from 'angular-web-storage';
import { HttpClient, HttpHeaders, HttpClientModule,HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { shareReplay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ARReceiptService {
  DataForController: any;
  public BaseUrl:string;
  public _returntext:string;
  _groupcode:string;

  
    debugger;
  constructor(public _http: HttpClient,private Session: SessionStorageService) 
      {  
            let _Config = new FxsConfig();
            
                 this.BaseUrl = _Config._APIPath("FOAPI");
                 //debuggerin;
                 this.BaseUrl = _Config._APIPath("http://localhost:59606");
     } 
 
/* 
  SaveReceipt(model)
  {
      debugger;
      return this.BaseUrl + 'FXFAS/ReceiptEntryAdd';
      return this._http.post(this.BaseUrl + '', model);
  } */
  getCompanyDetails(CompanyModel) {  
            
            this._returntext = this.BaseUrl + 'FXFAS/GetCompany';
            return this._returntext;
  }   

  getDebtorsDetailsService() {  
              
    this._returntext = this.BaseUrl + 'FXFAS/GetDebtorsDetailList';
    return this._returntext;
}

getAccountBalance(BalanceInfo) {  
  //   debugger;
    this._returntext = this.BaseUrl + 'FXFAS/GetAccountBalanceAsOnDate';
    return this._returntext;
  } 
  
  getCurrencyDetails(CurrencyModel) {  
      
      this._returntext = this.BaseUrl + 'FXFAS/CurrencyDefault';
      return this._returntext;
  }   
  GetBankDetailsService(PmsCustCode){
    debugger;
      
      this._returntext = this.BaseUrl + 'FXFAS/GetBankDetails/'+ PmsCustCode;
      return this._returntext;
  }
  GetCreditCardTypeService(){
    debugger;
      
      this._returntext = this.BaseUrl + 'FXFAS/GetCreditCardTypes';
      return this._returntext;
  }
  ApplyReceipDateFilter()
  {
    
  }
  getCurrencySymbol(Currency) {  
      
      this._returntext = this.BaseUrl + 'FXFAS/GetCurrencySymbol/'+ Currency;
      return this._returntext;
  }   

  getOutStandingDebitDetails() {  
      
      this._returntext = this.BaseUrl + 'FXFAS/OutStandingDetails';
      return this._returntext;
}
getOutStandingPaymentDetails() {  
  
  this._returntext = this.BaseUrl + 'FXFAS/OutStandingDetails';
  return this._returntext;
} 


CurrencyListService() {  
//   debugger;
  this._returntext = this.BaseUrl + 'FXFAS/Currency';
  return this._returntext;
} 

GetGroupCodeListService() {  
//  debugger;
  this._returntext = this.BaseUrl + 'FXFAS/GetAllGroupCode';
  return this._returntext;
} 

GetPropertyListService() {  
//  debugger;
  this._returntext = this.BaseUrl + 'FXFAS/GetAllProperty';
  return this._returntext;
} 

GetAllGroupCodeList() {  
  debugger;
  this._returntext = this.BaseUrl + 'FXFAS/GetAllGroupCode';
  return this._returntext;
}   

GetAllPropertyList(groupcode) {  
  debugger;
  this._groupcode = groupcode;
  this._returntext = this.BaseUrl + 'FXFAS/GetAllProperty?groupcode='+groupcode+'';
  return this._returntext;
}   



GetPaymentMethodTypeService(){
  this._returntext = this.BaseUrl + 'FXFAS/GetPredefinedInfo';
  return this._returntext;
}

GetReceiptTypeService(){
  this._returntext = this.BaseUrl + 'FXFAS/GetPredefinedInfo';
  return this._returntext;
}


GetExchangeRateService(PropertyCode:number,AppDate:any,CurrencyCode:string) {  
  //  debugger;
    this._returntext = this.BaseUrl + 'FXFAS/GetExchangeRateDetails/'+ PropertyCode+'/'+AppDate+'/'+CurrencyCode;
    return this._returntext;
} 

CalculateTaxAndCommissionService()
{
  this._returntext = this.BaseUrl + 'FXFAS/CalculateTaxAndCommission';
  return this._returntext;
}
GetDataToComponent(): any {
      let _getSelectedData = this.Session.get("sessionNameModule");
      return this.DataForController = _getSelectedData;
    }  

getTaxStructureListService()
{
  
  this._returntext = this.BaseUrl + 'FXFAS/ListTaxStructures';
  return this._returntext;
}

SaveReceiptEntryService()
{
  
  this._returntext = this.BaseUrl + 'FXFAS/ReceiptEntryAdd';
  return this._returntext;
}


getTransactionCodeService(CustCode:any) {  
  
this._returntext = this.BaseUrl + 'FXFAS/GetTransactionCode/'+ CustCode + '/A/null';
return this._returntext;
}
 
}
