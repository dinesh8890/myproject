import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleColumnsPipe} from 'src/app/pipes/toggle-columns.pipe';
import { ListReceiptService } from 'src/app/services/list-receipt.service';

import { ListReceiptRoutingModule } from './list-receipt-routing.module';

@NgModule({
  providers: [ListReceiptService],
  declarations: [ToggleColumnsPipe],
  imports: [
    CommonModule,
    ListReceiptRoutingModule
  ]
 
})
export class ListReceiptModule { }
