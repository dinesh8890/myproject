import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleColumnsPipe} from 'src/app/pipes/toggle-columns.pipe'
import { ListTransactionRoutingModule } from './list-transaction-routing.module';

@NgModule({
  declarations: [ToggleColumnsPipe],
  imports: [
    CommonModule,
    ListTransactionRoutingModule
  ]
})
export class ListTransactionModule { }
