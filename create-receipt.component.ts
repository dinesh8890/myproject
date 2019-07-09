import { Component, OnInit,ViewChild,ViewChildren,QueryList} from '@angular/core';
import {MatChipInputEvent, MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router} from '@angular/router';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-create-receipt',
  templateUrl: './create-receipt.component.html',
  styleUrls: ['./create-receipt.component.css']
})
export class CreateReceiptComponent implements OnInit {
  Cash:boolean=false;
  Cheque:boolean=false;
  Card:boolean=false;
  Bank:Boolean=false;
  Outstand_Debits_Visible:boolean=true;
  Outstanding_Debits_flag:boolean=false;
  Outstand_Credits_Visible:boolean=true;
  Outstanding_Credits_flag:boolean=false;
  

  displayedRecentColumns=['Company','PaymentDate','ReceiptNo','Transaction'];
  RecentReceipt_DS=new MatTableDataSource<RecntInvEle>(RecntInvList);
  @ViewChild('paginator1') debitpaginator:MatPaginator;
  @ViewChild(MatSort) debitsort:MatSort;
  @ViewChild('paginator2') creditpaginator:MatPaginator;
  @ViewChild(MatSort) creditsort:MatSort;
  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;
  constructor(private _router:Router) { }
  ngOnInit() {
  }
  Outstanding_Debit()
  {
    this.Outstanding_Debits_flag=true;
  }
  Outstanding_Debit_less()
  {
    this.Outstanding_Debits_flag=false;
  }
  Outstanding_Credit()
  {
    this.Outstanding_Credits_flag=true;
  }
  Outstanding_Credit_less()
  {
    this.Outstanding_Credits_flag=false;
  }
  Back()
  {
    this._router.navigateByUrl('/list-receipt');
  }
  changePaymentMode(value)
  {
    if(value==1)
    {
      this.Cash=true;
      this.Cheque=false;
      this.Card=false;
      this.Bank=false;
    }
    else if(value==2)
    {
      this.Cheque=true;
      this.Cash=false;
      this.Card=false;
      this.Bank=false;
    }
    else if(value==3)
    {
      this.Card=true;
      this.Cash=false;
      this.Cheque=false;
      this.Bank=false;
    }
    else if(value==4)
    {
      this.Cash=false;
      this.Cheque=false;
      this.Card=false;
      this.Bank=true;
    }
  }
  dataSource = new MatTableDataSource<ReceiptElement>(ReceiptList);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;  
  _columns = [
    {name: "Receipt Date",show: true,disabled:true},
    {name: "Description",show: true,disabled:false},
    {name: "Currency Amount",show: true,disabled:false},      
    {name: "Local Amount",show: true,disabled:false}, 
    {name: "Commission %",show:true,disabled:false},
    {name: "Tax",show:true,disabled:false}
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
  TaxInclude:TAXInclude[] = [
    {value: '1', viewValue: 'Exclusive of Tax'},
    {value: '2', viewValue: 'Inclusive of Tax'},
    {value: '3', viewValue: 'Out of Scope'}
  ];
  Close(id: number)
  {
    this.closePopover(id);
  }
  closePopover(id: number) {
    this.trigger.toArray()[id].togglePopover();
  }
}
export interface RecntInvEle{
  Company:string;
  PaymentDate:string;
  ReceiptNo:string;
  Transaction:string;
 }
 const RecntInvList:RecntInvEle[]=[
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'},
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'},
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'},
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'},
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'},
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'},
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'},
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'},
   {Company:'IDS Next',PaymentDate:'23 Jan 2019',ReceiptNo:'123',Transaction:'Yes'}
 ];
 export interface ReceiptElement
 {
  ReceiptDate:string;
  Description:string;
  CurrencyAmount:string;
  LocalAmount:string;
  Commission:string;
  Tax:string;  
 }
 const ReceiptList:ReceiptElement[]=[];
 export interface TAXInclude{
  value: string;
  viewValue: string;
}
