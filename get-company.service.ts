import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
//import { Company, CompanyInfo } from '../containers/company-details/company-details.component';

@Injectable({
  providedIn: 'root'
})
export class GetCompanyService {
  //private CompanyCode="";
  //comp:CompanyInfo;

  // private companyService =new BehaviorSubject(this.comp); //To set the initial data
  // CompanyCodeObservable = this.companyService.asObservable();

  constructor() { }

  // setCompanyCode(com:CompanyInfo)
  // {
  //   debugger;
  //   //this.CompanyCode=com;
  //   this.comp=com
  //   this.companyService.next(this.comp)
  // }
}
