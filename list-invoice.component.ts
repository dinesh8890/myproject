import { Component, OnInit, ViewChild, AfterViewInit,Output,ViewChildren, EventEmitter,QueryList } from '@angular/core'
import { Location } from '@angular/common';
import {Router,ActivatedRoute} from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { PropertyGroupDetails } from 'src/app/components/group-property/group-property.component';
import { GetPropertyService } from 'src/app/services/get-property.service';
import { TransactionListService } from 'src/app/services/transaction-list.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.css']
})
export class ListInvoiceComponent implements OnInit {
  Invoicelist:InvoiceElement[];
  Batch_Flag:boolean=false;
  public result: any; 
  selectedFinYr:any="option1";
  invoicetype:string="";
  Status:string="";
  Date:string="";
  Filter_Flag:boolean=false;
  Deselect_invoice:boolean=false;
  Deselect_status:boolean=false;
  Deselect_date:boolean=false;
  Deselect_all:boolean=false;
  Lenght_Date:any;
  Length_Status:any;
  Length_Type:any;
  Actions:string='Select';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;  
  selectedDate="1";
  pmsGroupDetails:PropertyGroupDetails
  PmsCustCode:number;  
  selection1=new SelectionModel<InvoiceElement>(true,[]);
  dataSource = new MatTableDataSource<InvoiceElement>(this.Invoicelist);
  @Output() transactionfilter =new EventEmitter<number>();
  
  constructor(private transactionlistService:TransactionListService ,
    private pmscodeService:GetPropertyService,public router:Router) { }
  
    ngOnInit() {
      this.getInvoiceList();
    }
    
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase(); 
      this.dataSource.filter = filterValue;
    }
    _columns = [
      {name: "Customer",show: true,disabled:false},
      {name: "InvoiceNo",show: true,disabled:true},      
      {name: "Date",show: true,disabled:false}, 
      {name:"StatementNo",show:true,disabled:false},
      {name:"StatementDate",show:true,disabled:false},
      {name: "DueDate",show: true,disabled:false}, 
      {name: "Total",show: true,disabled:false},
      {name: "Balance",show: true,disabled:false},      
      {name: "Status",show: true,disabled:false},
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
    selecteddata(data){
      this.Filter_Flag=true;
      this.Deselect_invoice=true;
      this.Deselect_status=true;
      this.Deselect_date=true;
      this.Deselect_all=true;
      this.invoicetype=data.invoicetype;
      this.Status=data.Status;
      this.Date=data.Date;
      this.Length_Type=this.FixLength_Type(this.invoicetype);
      this.Lenght_Date=this.FixLenght_Date((this.Date).length);
      this.Length_Status=this.FixLenght_Status((this.Status).length);
    }
    FixLength_Type(value)
    {
      debugger;
      if((value=="Auto") || (value=="Both"))
      {
        return "4%";
      }
      else if(value=="Manual")
      {
        return "5%";
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
    createNew(){
      this.router.navigateByUrl('/create-invoice');
    }
    activeList=['Select','View/Edit','Make CreditNote','Print Invoice','Reprint Invoice','Send Invoice','Share Invoice Link','Generate Statement','Print Statement','Reprint Statement',
    'Cancel Statement','Send Reminder','Share Statement Link','Recurring Invoice'];
    
    Batch=['Print Invoices','Send Invoices','Print Statements','Reprint Statements','Send Statements','Cancel Statements','Send Reminders'];
    

    isInvoiceSelected()
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
    masterInvoiceToggle() 
    {
      this.isInvoiceSelected() ?
      this.selection1.clear() :
      this.dataSource.data.forEach(row => this.selection1.select(row));
    }
    
  getInvoiceList()
  {
    debugger;
    console.info("getInvoiceList")
    // if (this.PmsCustCode!=undefined)
    // {
      debugger;
      let Model={
        "PmsCustCode":5000,
        "TransactionCode": "030",
        "TotalRows":5,
        "PageNumber":1,
        "ServerDate":"2019-06-06",
        "SqlDefaultDate": "2019-01-01",
        "ApplyFilter":1,
        "FromDate":"2019-01-01",
        "ToDate":"2019-12-31",
        //"DocumentType":"I",
        "StatusType": "Open",
        "IsManual": 1,
        "Company": "COM0001"
      }
      let _Url=this.transactionlistService.getInvoiceList(Model)
      //.map(res => res.json())
      .subscribe(Response => {
        
        return this.getInvoiceListResponse(Response);
      },
      error => {
          console.info("error")
      }); 
   
    // }
      
  }

  getInvoiceListResponse(Response)
  {
    debugger;
    console.info("Invoicelist Res:",Response)
    if (Response.status==1)
    {
      this.Invoicelist=Response.response
      console.info("Invoicelist:",this.Invoicelist)
      this.dataSource=new MatTableDataSource(this.Invoicelist);
      
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

    changeaction(value)
    {
      if(value=="View/Edit")
      {
        this.router.navigateByUrl('/create-invoice');
      }
    }
  }
  export interface InvoiceElement {
    billNumber: string;
    companyCode: string;
    Date: string;
    statementNumber:string;
    statementDate:string;
    dueDate : string;
    invoiceValue: string;
    balance: string;
    transactionStatus: string;
    Actions:string;
  }
  export interface EmailEnter  
  {
    name: string;
  }
