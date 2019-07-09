import { Component, OnInit,Output,ViewChildren, EventEmitter,QueryList } from '@angular/core';
import { MdePopoverTrigger } from '@material-extended/mde';
import { DateAdapter } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter-transaction',
  templateUrl: './filter-transaction.component.html',
  styleUrls: ['./filter-transaction.component.css']
})
export class FilterTransactionComponent implements OnInit {
  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;
  @Output() transactionfilter =new EventEmitter<filterelements>();
  constructor(private _adapter: DateAdapter<any>) {
    this._adapter.setLocale('en-GB');
   }
  selectedType="1";
  selectedstatus="1";
  selectedDate="1";
  selectedCustomer="1";
  today:any = new Date();
  year:any = this.today.getFullYear()
  month:any = this.today.getMonth();
  // fromDateDay: any = new Date();
  fromDateDay= new FormControl(new Date(this.year, this.month, 1));
  toDateDay= new FormControl(new Date(this.year, this.month + 1, 0));
  Date_Flag:boolean=true;
  ngOnInit() {
  }
  Elementdata = new filterelements();
  Applyfilt(id: number){
    debugger;
    this.Elementdata.Type=this.FetchType(this.selectedType);
    this.Elementdata.Status=this.FetchStatus(this.selectedstatus);
    this.Elementdata.Date=this.FetchDate(this.selectedDate);
    this.transactionfilter.emit(this.Elementdata);
    this.closePopover(id);
  }
  FetchType(value)
  {
    if (value==1)
    {
      return "All Transaction";
    }
    else if(value==2)
    {
      return "Invoice";
    }
    else if(value==3)
    {
      return "Receipts";
    }
    else if(value==4)
    {
      return "Credit Note";
    }
  }
  FetchStatus(value)
  {
    if(value==1)
    {
      return "All Statuses";
    }
    else if(value==2)
    {
      return "Voided";
    }
    else if(value==3)
    {
      return "Partially Matched";
    }
    else if(value==4)
    {
      return "Matched";
    }
  }
  FetchDate(value)
  {
    if(value=="1")
    {
      return "Last 365 days";
    }
    else if(value=="2")
    {
      return "Custom";
    }
    else if(value=="3")
    {
      return "Today";
    }
    else if(value=="4")
    {
      return "Yesterday";
    }
    else if(value=="5")
    {
      return "This week";
    }
    else if(value=="6")
    {
      return "This month";
    }
    else if(value=="7")
    {
      return "This quarter";
    }
    else if(value=="8")
    {
      return "This fiscal quarter";
    }
    else if(value=="9")
    {
      return "This year";
    }
    else if(value=="10")
    {
      return "This financial year";
    }
    else if(value=="11")
    {
      return "Last week";
    }
    else if(value=="12")
    {
      return "Last month";
    }
    else if(value=="13")
    {
      return "Last quarter";
    }
    else if(value=="14")
    {
      return "Last fiscal quarter";
    }
    else if(value=="15")
    {
      return "Last year";
    }
    else if(value=="16")
    {
      return "Last financial year";
    }
    else if(value=="17")
    {
      return "All dates"
    }
  }  
  closePopover(id: number) {
    this.trigger.toArray()[id].togglePopover();
  }
  Reset()
  {
    this.selectedstatus="1";
    this.selectedDate="1";
    this.selectedType="1";
    this.selectedCustomer="1";
  }
  DateSelected(event)
  {
    debugger;
    var today = new Date();
    if(event.value==6)
    {
      this.Date_Flag=true;
      var year = today.getFullYear(), month = today.getMonth()-1;
      this.fromDateDay.patchValue(new Date((today.getMonth()+1)+'/'+(today.getDate())+'/'+(today.getFullYear()-1)));
      this.toDateDay.patchValue(new Date());
    }
    if(event.value==2)
    {
      this.Date_Flag=false;
      this.fromDateDay.patchValue("");
      this.toDateDay.patchValue("");
    }
    if(event.value==3)
    {
      this.Date_Flag=true;
      this.fromDateDay.patchValue(new Date());
      this.toDateDay.patchValue(new Date());      
    }
    else if(event.value==4)
    {
      this.Date_Flag=true;
      var year = today.getFullYear(), month = today.getMonth();
      this.fromDateDay.patchValue(new Date(month+'/'+(today.getDate()-1)+'/'+year));   
    }
    else if(event.value==5)
    {
      this.Date_Flag=true;
      this.startAndEndOfWeek(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());      
    } 
    else if(event.value==1)
    {
      this.Date_Flag=true;
      var year = today.getFullYear(), month = today.getMonth();
      this.fromDateDay.patchValue(new Date(year, month, 1));
      this.toDateDay.patchValue(new Date(year, month + 1, 0));
    }  
    else if((event.value==7) || (event.value==8))
    {
      this.Date_Flag=true;
      var year = today.getFullYear();
      this.fromDateDay.patchValue(new Date('04/01/'+year));
      this.toDateDay.patchValue(new Date('06/30/'+year));
    }
    else if(event.value==9)
    {
      this.Date_Flag=true;
      var year = today.getFullYear();
      this.fromDateDay.patchValue(new Date('01/01/'+year));
      this.toDateDay.patchValue(new Date('12/31/'+year));
    }  
    else if(event.value==10)
    {
      this.Date_Flag=true;
      var year = today.getFullYear();
      this.fromDateDay.patchValue(new Date('04/01/'+year));
      this.toDateDay.patchValue(new Date('03/31/'+year));     
    }
    else if(event.value==11)
    {
      this.Date_Flag=true;
      this.lastWeek(today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
    }    
    else if(event.value==12)
    {
      this.Date_Flag=true;
      var year = today.getFullYear(), month = today.getMonth()-1;
      var firstDay = new Date(year, month, 1);
      var lastDay = new Date(year, month + 1, 0);
      this.fromDateDay.patchValue(firstDay);
      this.toDateDay.patchValue(lastDay);
    }   
    else if((event.value==13) || (event.value==14))
    {
      this.Date_Flag=true;
      var year = today.getFullYear();
      this.fromDateDay.patchValue(new Date('01/01/'+year));
      this.toDateDay.patchValue(new Date('03/31/'+year)); 
    }
    else if(event.value==15)
    {
      this.Date_Flag=true;
      var year = today.getFullYear()-1;
      this.fromDateDay.patchValue(new Date('01/01/'+year));
      this.toDateDay.patchValue(new Date('12/31/'+year)); 
    }  
    else if(event.value==16)
    {
      this.Date_Flag=true;
      var year = today.getFullYear()-1;
      this.fromDateDay.patchValue(new Date('04/01/'+year));
      this.toDateDay.patchValue(new Date('03/31/'+year)); 
    }
    else if(event.value==17)
    {
      this.Date_Flag=true;
      this.fromDateDay.patchValue("");
      this.toDateDay.patchValue("");
    }
  }
  startAndEndOfWeek(date) {
    var weekMap = [6, 0, 1, 2, 3, 4, 5];
    var now = new Date(date);
    now.setHours(0, 0, 0, 0);
    var monday = new Date(now);
    monday.setDate(monday.getDate() - weekMap[monday.getDay()]);
    var sunday = new Date(now); 
    sunday.setDate(sunday.getDate() - weekMap[sunday.getDay()] + 6);
    sunday.setHours(23, 59, 59, 999);  
    this.fromDateDay.patchValue(monday);
    this.toDateDay.patchValue(sunday);
  }
  lastWeek(date)
  {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    this.startAndEndOfWeek(lastWeek);
  }
}
export class filterelements{
  Type:string;
  Status:string;
  Date:string;
 }