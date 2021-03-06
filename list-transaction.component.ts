import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {Router, ActivatedRoute} from '@angular/router';
import { FormControl } from '@angular/forms';
import { PropertyGroupDetails } from 'src/app/components/group-property/group-property.component';
import { GetPropertyService } from 'src/app/services/get-property.service';
import { TransactionListService } from 'src/app/services/transaction-list.service';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {
  id: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection1=new SelectionModel<transactionelement>(true,[]);
  Batch_Flag:boolean=false;
  Type:string="";
  Status:string="";
  Date:string="";
  Company: any;
  Filter_Flag:boolean=false;
  Deselect_invoice:boolean=false;
  Deselect_status:boolean=false;
  Deselect_date:boolean=false;
  Deselect_all:boolean=false;
  ShowHide: boolean = false;
  Lenght_Date:any;
  Length_Status:any;
  Length_Type:any;
  valtab:number;
  transactionlist:transactionelement[];
  pmsGroupDetails:PropertyGroupDetails
  trnListDetails: transactionlist;
  PmsCustCode:number;
  isInvoiceRecord:boolean=false;
  isActionNotSelected:boolean=true;
  isReceiptRecord:boolean=false;
  isCreditNoteRecord:boolean=false;
  isDebitNoteRecord:boolean=false;
  //Invoice End
  _GroupCode: string;
  _PmsCustCode: number=0;
  _LocalCurrency: string;
  loading_circle:boolean=true ;
  selected = new FormControl("0");
  sub: any;
  NoOfRecords:number;
  PageNumber: number;
  constructor(private pmscodeService:GetPropertyService,
    private transactionlistService:TransactionListService ,
    private _router:ActivatedRoute,
    private router:Router) { }
  ngOnInit() {
    debugger;
    //this.transactionlistService.transactionDetailObservable.subscribe(transactionDetailObservable => this.getTransactionList())
  this.sub = this._router.data.subscribe(v =>this.selected = new FormControl(v.value));
  
  
  }
  selectedTab(data)
  {
    debugger;
    this.valtab=data;
  }
  dataSource=new MatTableDataSource<transactionelement>(this.transactionlist);  
  isSelected()
  {
    const numSelected = this.selection1.selected.length;
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
  masterToggle()
  {
    this.isSelected() ?
    this.selection1.clear() :
    this.dataSource.data.forEach(row => this.selection1.select(row));
  }
  _columns = [
    {name: "Company",show: true,disabled:false},
    {name: "Type",show: true,disabled:true},
    {name: "Date",show: true,disabled:false},
    {name: "Number",show:true,disabled:false},
    {name: "Org Inv Date",show:true,disabled:false},
    {name: "Org Inv#",show:true,disabled:false},
    {name: "Due Date",show: true,disabled:false},
    {name: "Amount",show: true,disabled:false},
    {name: "BalanceAmount",show: true,disabled:false},
    {name: "Transaction Status",show: true,disabled:false},
    {name: "Actions",show: true,disabled:true}
  ];
  get columns() { return this._columns; }
  get displayedColumns(): string[] { return this._columns.map(c => c.name); }
  getMoreOptionColmns():any[]{
    return this._columns;
  }
  Batch=['Print Transaction','Send Transaction'];
  activeList=['Select','View/Edit','Make CreditNote','Print Invoice','Reprint Invoice','Send Invoice','Share Invoice Link','Generate Statement','Print Statement','Reprint Statement',
    'Cancel Statement','Send Reminder','Share Statement Link','Recurring Invoice'];
    invoiceactiveList=['Select','View/Edit','Make CreditNote','Print Invoice','Reprint Invoice','Send Invoice','Share Invoice Link','Generate Statement','Print Statement','Reprint Statement',
    'Cancel Statement','Send Reminder','Share Statement Link','Recurring Invoice'];
  CreditNoteactiveList=['Select','View/Edit','Void'];


  GetPropertyData(PropertInfo)
  {
    debugger;
    if (PropertInfo != undefined && PropertInfo != null ){
      this.loading_circle = true;
      if ((PropertInfo[0].PropertyCode == '' || PropertInfo[0].PropertyCode == 0 || PropertInfo[0].PropertyCode == undefined)){
        this._PmsCustCode = 0;
        this.loading_circle =false;
        return false;
      } 
      else if((PropertInfo[0].GroupCode == '' || PropertInfo[0].GroupCode == 0 || PropertInfo[0].GroupCode == undefined)){
        this._GroupCode='';
        this.loading_circle =false;
        return false;
      }
      else
      {
        this._PmsCustCode=PropertInfo[0].PropertyCode;
        this._GroupCode=PropertInfo[0].GroupCode;
        //this._LocalCurrency=PropertInfo[0].PropertyCurrency;
        setTimeout(() => {
          this.loading_circle =false;
        }, 1000);
        
        this.getTransactionList();
       // return false;
       
      }
      
    }
    else
    {
      this._GroupCode = '';
      this._PmsCustCode = 0;
      this._LocalCurrency = '';
      this.loading_circle =false;
    }
    // this.getTransactionList();
  }
  
    getTransactionList()
    {
    
        debugger;
        let Model={
          "PmsCustCode":this._PmsCustCode,
          "NoOfRecords":50,//this.NoOfRecords,
          "PageNumber":1//this.PageNumber
        }
        let _Url=this.transactionlistService.getTransactionList(Model)
        //.map(res => res.json())
        .subscribe(Response => {
          
          return this.getTransactionListResponse(Response);
        },
        error => {
            console.info("error")
        }); 
        
    }
    getTransactionListResponse(Response)
    {
    debugger;
    console.info("Res:",Response)
    if (Response.status==1)
    {
      this.transactionlist=Response.response
      console.info("Res:",this.transactionlist)
      this.dataSource=new MatTableDataSource(this.transactionlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.ShowHide = true;
      
    }

  }
  
  selecteddata(data){
    debugger;
    this.Filter_Flag=true;
    this.Deselect_invoice=true;
    this.Deselect_status=true;
    this.Deselect_date=true;
    this.Deselect_all=true;
    this.Type=data.Type;
    this.Status=data.Status;
    this.Date=data.Date;
    this.Company = data.Company;
    this.Length_Type=this.FixLength_Type(this.Type);
    this.Lenght_Date=this.FixLenght_Date((this.Date).length);
    this.Length_Status=this.FixLenght_Status((this.Status).length);
    this.refreshDataSource(data);
    // this.dataSource.filterPredicate =
    //  (data: Element, filter: string) =>  (data.Company.indexOf(filter) != -1); 
  }

  refreshDataSource(data)
  {
    // this.transactionlist.push();
    // this.dataSource = new MatTableDataSource( this.transactionlist);
     debugger;
    // this.dataSource.filter = JSON.stringify(data); 
    // this.dataSource.filterPredicate = (data, filter) => { const filterArray = JSON.parse(filter); 
    //   return (filterArray['CompanyCode'] || data.Company.indexOf(filterArray['CompanyCode']) > -1);
    //         //this.dataSource = filterArray;
    //       };

    // this.dataSource.filterPredicate =
    //   (data:  , filters: string) => {
    //     const matchFilter = [];
    //     const filterArray = filters.split(',');
    //     const columns = [data.company];
    
    //     // const columns = (<any>Object).values(data);
        
    
    //     filterArray.forEach(filter => {
    //       const customFilter = [];
    //       columns.forEach(column => customFilter.push(column.toLowerCase().includes(filter)));
    //       matchFilter.push(customFilter.some(Boolean)); // OR
    //     });
    //     return matchFilter.every(Boolean); // AND
    //   }

   
  }

  FixLength_Type(value)
  {
    if(value=="All Transaction")
    {
      return "9%";
    }
    else if(value=="Invoice")
    {
      return "5%";
    }
    else if(value=="Receipts")
    {
      return "6%";
    }
    else if(value=="Credit Note")
    {
      return "7%";
    }
  }
  FixLenght_Status(value)
  {
    if(value==4)
    {
      return "4%";
    }
    else if((value==10) || (value==12) || (value==14))
    {
      return "7%";
    }
    else if(value==33)
    {
      return "17%";
    }
    else if(value==37)
    {
      return "18%";
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
  Deselect_Invoice()
  {
    this.Deselect_invoice=false;
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
    this.Filter_Flag=false;
    this.Deselect_invoice=false;
    this.Deselect_status=false;
    this.Deselect_date=false;
    this.Deselect_all=false;
  }
  getActionList(element)
  {
    element.isActionSelected=true;
    console.info("element",element)
    if (element.documentType=="Invoice")
    {
      this.isInvoiceRecord=true;
      this.isReceiptRecord=false;
      this.isCreditNoteRecord=false;
      this.isDebitNoteRecord=false;
    }
    else if (element.documentType=="CreditNote")
    {
      this.isInvoiceRecord=false;
      this.isReceiptRecord=false;
      this.isCreditNoteRecord=true;
      this.isDebitNoteRecord=false;
    }
    else if (element.documentType=="Receipt")
    {
      this.isInvoiceRecord=false;
      this.isReceiptRecord=true;
      this.isCreditNoteRecord=false;
      this.isDebitNoteRecord=false;
    }
    else if (element.documentType=="DebitNote")
    {
      this.isInvoiceRecord=false;
      this.isReceiptRecord=false;
      this.isCreditNoteRecord=false;
      this.isDebitNoteRecord=true;
    }
  }
  NavigateToPage(element,i)
  {
    debugger;
    console.info("element", element)
    if(element.actions=="Make CreditNote")
    {
      console.info("Credit Note", element)
      this.transactionlistService.setTransactionDetails(element);
      this.router.navigateByUrl('/create-creditnote');
      //this.setData.emit(element);
    }
    else if((element.actions=="View/Edit") && (element.documentType=="CreditNote"))
    {
      //alert (element.Actions)
      console.info("Credit Note", element)
      this.transactionlistService.setTransactionDetails(element);
      this.router.navigateByUrl('/create-creditnote');
      //this.setData.emit(element);
    }
    else if((element.actions=="Void") && (element.documentType=="CreditNote"))
    {
      //alert (element.Actions)
      console.info("Credit Note", element)
      this.transactionlistService.setTransactionDetails(element);
      this.router.navigateByUrl('/create-creditnote');
      //this.setData.emit(element);
    }
  }

  applyFilter(filterValue: string)
  {
     
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); 
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
export interface transactionelement
{
  [x: string]: any;
  CompanyCode:string;
  DocumentType:string;
  ReceiptDate:string;
  ReceiptNumber:string;
  DueDate:string;
  TransactionAmount:string;
  BalanceAmount:string;
  TransactionStatus:string;
  Actions:string;
  isActionSelected:boolean;
  PmsCustCode:number;
}

export interface transactionlist{
  PmsCustCode: number,
  BookType: string, 
  DocumentStartDate: string,
  TransactionNumber: string, 
  DocumentType: string, 
  DocumentEndDate: string,
  isRecentTransaction: boolean, 
  NoOfRecords: number, 
  PageNumber: number 
}