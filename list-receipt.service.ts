import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReceiptElement } from 'src/app/views/list-receipt/list-receipt.component';


@Injectable({
  providedIn: 'root'
})

export class ListReceiptService {
  private receiptDetails:ReceiptElement;
 

  private receiptDtl =new BehaviorSubject(this.receiptDetails); //To set the initial data
  listReceiptObservable = this.receiptDtl.asObservable();

  constructor() { }

  setReceiptList(receipt:ReceiptElement)
  {
    debugger;
    this.receiptDetails=receipt;
    this.receiptDtl.next(this.receiptDetails)
  }

  getReceiptList()
  {
    return this.listReceiptObservable;
  }
}
