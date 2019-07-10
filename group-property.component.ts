import { Component, EventEmitter, Input, Output, OnInit, Injectable } from '@angular/core';
//import { Http, Headers } from '@angular/http';
//import { ARReceiptService } from '../../services/arreceipt.service';
import {MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { GetPropertyService } from '../../services/get-property.service';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { propertymodel } from 'src/app/Model/propertymodel';
import { ListReceiptService } from 'src/app/services/list-receipt.service';
import { CommonService } from 'src/app/services/Global/common.service';
import { ReceiptElement, ListReceiptComponent } from 'src/app/views/list-receipt/list-receipt.component';

import { first } from 'rxjs/operators';

@Component({
  selector: 'app-group-property',
  templateUrl: './group-property.component.html',
  styleUrls: ['./group-property.component.css']
})
export class GroupPropertyComponent implements OnInit {
  @Input() PropertyCode;
  @Output() initializeValue=new EventEmitter();
  @Output() Propertydetails = new EventEmitter();
  @Output() LoadCompanyDetails = new EventEmitter();
  selPropertyDetails: PropertyGroupDetails;
  GroupInfo: any;
  ReceiptData: any;
  _Group: any;
  _GroupCode: string;
  _GroupName: string;
  PropertyInfo: any;
  _Property: any;
  PmsCustCode: number;
  _Currency: any;
  _DefaultCurrency:string;
  _LocalCurrency:string;
  _HotelName: string;
  form : FormGroup;
  PropertyModel: propertymodel;
  pmsGroupDetails:PropertyGroupDetails;
//  groupcode: any;
//  propertycode: any;
//  obdate: any;
 // propertysel: boolean = false;
 // GroupModel: any;
//  fATransactionModel: any;


  constructor
    (
      private _commonServcie: CommonService,
      //private _http: Http, 
      //private _ApI: ARReceiptService,
      private pmscodeService: GetPropertyService, 
      private listReceiptService: ListReceiptService,
      private fb: FormBuilder
    ) {}

    ngOnInit() {
      debugger;
    this.GetGroupCodeList();
   //this.getPmsCustCode();

    this.form = this.fb.group
      ({
          GroupInfo: ['', [Validators.required]]
        , PropertyInfo: ['', [Validators.required]]
      });
      this.GetPropertyData();

    }

  GetPropertyData()
  {
   
  //  if(this.form.valid)
  //  {
    this.pmscodeService.PmsCodeObservable.subscribe(
      (com)=> this.pmsGroupDetails =com as PropertyGroupDetails,
      (err)=> console.log('error',err)
      );  
    //  console.info("pmsgroup :", this.pmsGroupDetails)
    if (this.pmsGroupDetails != undefined)
    {
    
      this.PmsCustCode=this.pmsGroupDetails.PmsCustCode;
    //  alert(this.PmsCustCode);
      
      this._GroupCode=this.pmsGroupDetails.GroupCode;
    //  alert(this._GroupCode);
      this.GetPropertyCodeList(this._GroupCode);
     // debugger;
   
      this._DefaultCurrency=this.pmsGroupDetails.LocalCurrency;
       this.form.controls['GroupInfo'].patchValue(this._GroupCode);
       this.form.controls['PropertyInfo'].patchValue(this.PmsCustCode);
       this.getPmsCustCode();
  // }
    }
}


  GetGroupCodeList() {
     this._commonServcie.GetGroupCodeListService()
      .map(res => res.json()).subscribe((res: any) => {
        console.log(res.response);
        this._Group = res.response;
      });
  }


  FetchPropertyDetails(val: any) {
    
    var _filter = this._Group.filter(x => x.groupcode == val)[0];
    this._GroupCode = _filter.groupcode;
    this._GroupName = _filter.groupname;
    this.GetPropertyCodeList(this._GroupCode);
    
  }

  FetchPropertyCode(val: any) {
   var _filter = this._Property.filter(x => x.pmscustcode == val)[0];
   this.PmsCustCode = _filter.pmscustcode;
   this._HotelName = _filter.hotelname
    console.info(this.PmsCustCode)
    //this.GetDefaultCurrency();
    this.pmscodeService.setPmsCustCode(val);
    let PropertyInfo:any[]=[];
    PropertyInfo.push({
      "GroupCode": this._GroupCode,
      "GroupName":this._GroupName,
      "PropertyCode":this.PmsCustCode,
      "PropertyName":this._HotelName,
      "LocalCurrency":this._LocalCurrency,
      "DefaultCurrency":this._DefaultCurrency
    });
    this.Propertydetails.emit(PropertyInfo);
    this.LoadCompanyDetails.emit(PropertyInfo);
  }


  GetPropertyCodeList(val:any) {
    this._commonServcie.GetPropertyListService(val)
    .map(res => res.json()).subscribe((res: any) => {
      console.log(res.response);
    this._Property = res.response;
    });
  }


  GetDefaultCurrency() 
  {
     this._commonServcie.DefaultCurrencyService(this.PmsCustCode)
    .map(res => res.json()).subscribe(
        Response =>
        {
          this.DefaultCurInformation(Response);
        }
    );
  }
  DefaultCurInformation(res)
  {
     this._Currency = res.response;
     this._DefaultCurrency = this._Currency[0].currencyCode; 
     this._LocalCurrency = this._Currency[1].currencyCode; 
     if(this._DefaultCurrency == "")
     {
      this._DefaultCurrency =this._LocalCurrency;
     }
    this.selPropertyDetails = {
      "PmsCustCode": this.PmsCustCode,
      "PropertyName": this._HotelName,
      "GroupCode": this._GroupCode,
      "GroupName": this._GroupName,
      "LocalCurrency":this._LocalCurrency,
      "DefaultCurrency":this._DefaultCurrency
    };
    this.pmscodeService.setPmsCustCode(this.selPropertyDetails);
    let PropertyInfo:any[]=[];
    PropertyInfo.push({
      "GroupCode": this._GroupCode,
      "GroupName":this._GroupName,
      "PropertyCode":this.PmsCustCode,
      "PropertyName": this._HotelName,
      "LocalCurrency":this._LocalCurrency,
      "DefaultCurrency":this._DefaultCurrency
    });
    this.Propertydetails.emit(PropertyInfo);
    this.initializeValue.emit(this.selPropertyDetails);
    this.LoadCompanyDetails.emit(PropertyInfo);

    
    
  }
SetPropertDetails(Response)
{
 // console.info("set", Response);
  
  this._Currency = Response.response;
       this._DefaultCurrency = this._Currency[0].currencyCode; 
       this._LocalCurrency = this._Currency[1].currencyCode; 
       
 //      console.log(this._DefaultCurrency); 
      
  this.selPropertyDetails = {
    "PmsCustCode": this.PmsCustCode,
    "PropertyName": this._HotelName,
    "GroupCode": this._GroupCode,
    "GroupName": this._GroupName,
    "LocalCurrency": this._LocalCurrency,
    "DefaultCurrency": this._DefaultCurrency
  };
  this.pmscodeService.setPmsCustCode(this.selPropertyDetails);
  this.initializeValue.emit(this.selPropertyDetails);       
}


getPmsCustCode()
{
  debugger;
  return this.PmsCustCode
}

}

export interface PropertyGroupDetails {
  PmsCustCode: number,
  PropertyName: string,
  GroupCode: string,
  GroupName: string,
  LocalCurrency: string,
  DefaultCurrency:string
}


