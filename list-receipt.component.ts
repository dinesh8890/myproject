import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SelectionModel} from '@angular/cdk/collections';
import { CommonService } from 'src/app/services/Global/common.service';
import { ListReceiptService } from 'src/app/services/list-receipt.service';
import { GetPropertyService } from '../../services/get-property.service';

@Component({
  selector: 'app-list-receipt',
  templateUrl: './list-receipt.component.html',
  styleUrls: ['./list-receipt.component.css']
})
export class ListReceiptComponent implements OnInit {
  Batch_Flag:boolean=false;
  Receipttype:string="";
  Status:string="";
  Date:string="";
  receiptDtl: any;
  PmsCustCode: any;
  Filter_Flag:boolean=false;
  Deselect_type:boolean=false;
  Deselect_status:boolean=false;
  Deselect_date:boolean=false;
  Deselect_all:boolean=false;
  Lenght_Date:any;
  Length_Status:any;
  Length_Type:any;
  rcptList: ReceiptElement;
  //displayedColumns = ['Select', 'Company', 'Payment', 'ReceiptNo', 'ReceiptDate','ReceiptType','TransactionDate','TransactionStatus', 'TransactionCurrency', 'Received', 'Actions' ];
  constructor(public _router:Router,
              public _commonServcie: CommonService,
              private pmscodeService: GetPropertyService,
              public listReceiptService: ListReceiptService) { }
  dataSource = new MatTableDataSource<ReceiptElement>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;  
  selection=new SelectionModel<ReceiptElement>(true,[]);
  ngOnInit() {
    debugger;
    this.GetListreceipt();
    //this.GetReceiptData();
    this.getReceiptList();
   // this.listReceiptService.listReceiptObservable.subscribe(receiptDtl => this.receiptDtl = receiptDtl);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  createNew(){
    this._router.navigateByUrl('/receipt-create');
  }
  
  _columns = [
    {name: "Select",show: true,disabled:true},
    {name: "Company",show: true,disabled:false},
    {name: "Payment",show: true,disabled:true},      
    {name: "ReceiptNo",show: true,disabled:false}, 
    {name:"ReceiptDate",show:true,disabled:false},
    //{name:"ReceiptType",show:true,disabled:false},
    {name: "TransactionDate",show: true,disabled:false}, 
    {name: "TransactionStatus",show: true,disabled:false},
    {name: "Currency",show: true,disabled:false},      
    {name: "Received",show: true,disabled:false},
    {name: "Actions",show: true,disabled:true},
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
  Batch:any[]=[
    {id:1,name:'Print Receipts'},
    {id:2,name:'Send Receipts'},
    {id:3,name:'Reprint Receipts'}
  ]
  selecteddata(data){
    this.Filter_Flag=true;    
    this.Deselect_type=true;
    this.Deselect_status=true;
    this.Deselect_date=true;
    this.Deselect_all=true;
    this.Receipttype=data.Receipttype;
    this.Status=data.Status;
    this.Date=data.Date;
    this.Length_Type=this.FixLength_Type(this.Receipttype);
    this.Lenght_Date=this.FixLenght_Date((this.Date).length);
    this.Length_Status=this.FixLenght_Status((this.Status));
  }  
  FixLength_Type(value)
  {
    if(value=="On Invoice")
    {
      return "6%";
    }
    else if(value=="On Statement")
    {
      return "7%";
    }
    else if(value=="On Advance")
    {
      return "8%";
    }
  }
  FixLenght_Status(value)
  {
    if(value=="All Statuses")
    {
      return "7%";
    }
    else if(value=="Voided")
    {
      return "5%";
    }
    else if(value=="Partially Matched")
    {
      return "9%";
    }
    else if(value=="Matched")
    {
      return "6%";
    }
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
  Deselect_Type()
  {
    this.Deselect_type=false;
  }
  Deselect_Status()
  {
    this.Deselect_status=false;
  }
  Deselect_Date()
  {
    this.Deselect_date=false;
  }
  Deselect_All()
  {
    this.Deselect_all=false;
    this.Deselect_type=false;
    this.Filter_Flag=false;
    this.Deselect_status=false;
    this.Deselect_date=false;
    this.Deselect_all=false;
  }
  activeList=['Select','View/Edit','Void Receipt','Match Receipt','Print Receipt','Reprint Receipt','Send Receipt','Share Receipt Link'];
  
  isSelected()
    {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      if(numSelected>1)
      {
        this.Batch_Flag=true;
      }
      else
      {
        this.Batch_Flag=false;
      }
      return numSelected === numRows;      
    }
    masterInvoiceToggle() 
    {
      this.isSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    }

    GetListreceipt() {
      let _Model = {
            "PmsCustCode": 5000,//this.PmsCustCode,
            "DocumentType": "R",
            "FromDate": "2019-01-01",
            "ToDate": "2019-12-31",
            "StatusType": "Open",
            "ApplyFilter": 1,
            "IsManual": 1,
            "Company": "COM0001",
            "PageNumber": 1,
            "TotalRows": 5
            };
      this._commonServcie.GetListReceiptService(_Model)
       //.map(res => res.json()).subscribe((res: any) => {
         //console.log("Response",  res.response);
         .subscribe(Response => {
        
          return this.getReceiptListResponse(Response);
        },
        error => {
            console.info("error")
        }); 
     
         //this.rcptList = res.response;
    // });
     //this.receiptDtl.setReceiptList(this.rcptList)
   }
 
   getReceiptListResponse(Response)
   {
    console.info("Receiptlist Res:",Response)
    if (Response.status==1)
    {
      this.rcptList=Response.response
      console.info("Receiptlist:",this.rcptList)
      this.dataSource=new MatTableDataSource();
      
    }
   }
   
  
getReceiptList(){
debugger;
  this.receiptDtl.listReceiptObservable.subscribe(
    (receipt)=> this.rcptList = receipt as ReceiptElement,
      (err)=> console.log('error',err)
  )
  console.log(this.rcptList);
  this.dataSource = new MatTableDataSource();
    this.selection=new SelectionModel<ReceiptElement>(true, []);
    console.info ("Debit Records: ", this.rcptList)
    // this.dataSource.paginator = this.debitpaginator;
    // this.dataSource.sort = this.debitsort;
    
  }




    changeaction(value)
    {
      if(value=="View/Edit")
      {
        this._router.navigateByUrl('/receipt-create');
      }
    }
}
export interface ReceiptElement
{
  Select:boolean;
  CompanyCode:string;
  DocumentDate:string;
  ReceiptNumber:string;
  ReceiptDate:string;
  BillNumber: string;
  //ReceiptType:string;
  TransactionNumber:string;
  TransactionStatus:string;
  TransactionCurrency:string;
  Amount:number;
  Balance: number;
  AutoManual: string;
  Actions:string;
}
const ReceiptData:ReceiptElement[]=[];
 