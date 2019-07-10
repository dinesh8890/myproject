import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SelectionModel} from '@angular/cdk/collections';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-openingbalance',
  templateUrl: './list-openingbalance.component.html',
  styleUrls: ['./list-openingbalance.component.css']
})
export class ListOpeningbalanceComponent implements OnInit {
  Filter_Flag:boolean=false;
  Lenght_Date:any;
  Deselect_date:boolean=false;
  Date:any;
  sub: any;
  selected = new FormControl("0")
  selection1=new SelectionModel<OpenBalanceElement>(true,[]);
  constructor(public router:Router,
            public _router: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this._router.data.subscribe(v =>this.selected = new FormControl(v.value));
  }
  dataSource = new MatTableDataSource<OpenBalanceElement>(OpenBalanceList);
  isSelected()
  {
    const numSelected = this.selection1.selected.length;
    const numRows = this.dataSource.data.length;    
    return numSelected === numRows;      
  }
  masterInvoiceToggle() 
  {
    this.isSelected() ?
    this.selection1.clear() :
    this.dataSource.data.forEach(row => this.selection1.select(row));
  }
  _columns = [
    {name: "Company",show: true,disabled:false},
    {name: "Invoice No",show: true,disabled:true},      
    {name: "Invoice Date",show: true,disabled:false}, 
    {name: "Invoice Value",show:true,disabled:false},
    {name: "Description",show:true,disabled:false},
    {name: "Actions",show:true,disabled:false}
  ];
  get columns() { return this._columns; }
  get displayedColumns(): string[] { return this._columns.map(c => c.name); }
  getMoreOptionColmns():any[]{
    return this._columns;
  }
//reorder column in more option//
drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}
  //reorder column in more option//
createNew(){
  this.router.navigateByUrl('/opening-balance');
}
selecteddata(data){
  this.Filter_Flag=true;
  this.Date=data.Date; 
  this.Deselect_date=true;
  this.Lenght_Date=this.FixLenght_Date((this.Date).length);
}  
Deselect_Date()
{
  this.Deselect_date=false;
}
FixLenght_Date(value)
  {
    if((value==6) || (value==5))
    {
      return "5%";
    }
    else if(value==9)
    {
      return "6%";
    }      
    else if((value==12) || (value==10))
    {
      return "7%"
    }
    else if(value==13)
    {
      return "8%";
    }
    else if(value==19)
    {
      return "9%";
    }
  }  
  activeList=['Select','View/Edit'];
  changeaction(value)
  {
    if(value=="View/Edit")
    {
      this.router.navigateByUrl('/opening-balance');
    }
  }
  
}
const OpenBalanceList:OpenBalanceElement[]=[];
export interface OpenBalanceElement
{
  Company:string;
  InvoiceNo:string;
  InvoiceDate:string;
  InvoiceValue:string;
  Description:string;
  Actions:string;
}