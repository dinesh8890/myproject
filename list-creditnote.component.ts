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
  selector: 'app-list-creditnote',
  templateUrl: './list-creditnote.component.html',
  styleUrls: ['./list-creditnote.component.css']
})
export class ListCreditnoteComponent implements OnInit {
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
      {name: "Company",show: true,disabled:false},
      {name: "Date",show: true,disabled:true},      
      {name: "Number",show: true,disabled:false}, 
      {name: "Org Inv#",show:true,disabled:false},
      {name: "Org Inv Date",show:true,disabled:false},
      {name: "Amount",show: true,disabled:false}, 
      {name: "BalanceAmount",show: true,disabled:false},
      {name: "Transaction Status",show: true,disabled:false},
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
      this.router.navigateByUrl('/create-creditnote');
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
        "PmsCustCode":20007,
        "TotalRows":5,
        "PageNumber":1,
        "ServerDate":new Date,
        "ApplyFilter":0,
        "FromDate":"2019-01-01",
        "ToDate":new Date,
        "DocumentType":"I"
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
    CompanyCode:string;
    ReceiptDate:string;
    ReceiptNumber:string;
    TransactionAmount:string;
    BalanceAmount:string;
    TransactionStatus:string;
    Actions:string;
    isActionSelected:boolean;
    PmsCustCode:number;
  }
  // const Invoice_DATA: InvoiceElement[] = [
  //  {selectCheckBox:false,InvoiceNo: '1009',Customer:'IDS Ltd ', Date: '23 Jan 2019',StatementNo:'1009',StatementDate:'23 Jan 2019',DueDate:'22 Jan 2019',Balance:'INR 1,298.00',Total:'INR 1,298.00',color:'green',statusicon:'check_circle_outline',Status:'Deposited',Actions:'Select'},
  //  {selectCheckBox:false,InvoiceNo: '1008',Customer:'IDS Ltd ', Date: '23 Jan 2019',StatementNo:'1009',StatementDate:'23 Jan 2019',DueDate:'22 Jan 2019',Balance:'INR 1,298.00',Total:'INR 1,298.00',color:'green',statusicon:'check_circle_outline',Status:'Partially paid',Actions:'Select'},
  //  {selectCheckBox:false,InvoiceNo: '1008',Customer:'IDS Ltd ', Date: '23 Jan 2019',StatementNo:'1009',StatementDate:'23 Jan 2019',DueDate:'22 Jan 2019',Balance:'INR 1,298.00',Total:'INR 1,298.00',color:'red',statusicon:'highlight_off',Status:'Voided',Actions:'Select'}
  // ];
  
  export interface EmailEnter  
  {
    name: string;
  }
