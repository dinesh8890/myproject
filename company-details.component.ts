import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';
import { DescriptionDialogComponent } from '../description-dialog/description-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  Remarks:string;
  Billaddress:string="Description";
  CMPCNTRL=new FormControl();
  FILTCMPLIST: Observable<any[]>;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.FILTCMPLIST=this.CMPCNTRL.valueChanges.pipe(startWith(''),map(val=>val?this.filtercmpy(val):this.Lisofcompanies.slice()));
  }
  filtercmpy(val: any) {
    return this.Lisofcompanies.filter(result =>
      result.comnam.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }
  Lisofcompanies:companylist[] = [
    {comcod: '1', comnam: 'IDS Next'},
    {comcod: '2', comnam: 'Global'},
    {comcod: '3', comnam: 'TVS'},
    {comcod: '4', comnam: 'TCS'},
    {comcod: '5', comnam: 'Infosys'},
  ];
  /* start email option*/
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  Email: EMAIL[] = [ ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our email
    if ((value || '').trim()) {
      this.Email.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(mailid: EMAIL): void {
    const index = this.Email.indexOf(mailid);
  
    if (index >= 0) 
    {
      this.Email.splice(index, 1);
    }
    }

/* end email option*/
opendescription(val:string,name:string){
  let res:string;
  debugger;
  const dialogRef = this.dialog.open(DescriptionDialogComponent,{
    height: '200px',width: '440px',
  disableClose:true,
    data:{description:val}
  }); 
  dialogRef.afterClosed().subscribe(result => {
    res = result;
        if (name=='Billaddress')
            {
              this.Billaddress=res;
            }
        else if(name=='Remarks')
            {
              this.Remarks=res;
            }
  });
}
}
export class companylist{

  constructor(public comcod:string,public comnam:string){}
}
export interface EMAIL 
{
  name: string;
}