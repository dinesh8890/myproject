import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { PropertyGroupDetails } from '../components/group-property/group-property.component';

@Injectable({
  providedIn: 'root'
})

export class GetPropertyService {

  private PmsCustCode="";
  private propGroupDetails : PropertyGroupDetails;

  private pmsCodeService =new BehaviorSubject(this.propGroupDetails); //To set the initial data
  PmsCodeObservable = this.pmsCodeService.asObservable();

  constructor() { }

  setPmsCustCode(c:PropertyGroupDetails)
  {
    debugger;
    this.propGroupDetails=c;
    this.pmsCodeService.next(this.propGroupDetails)
  }
}



