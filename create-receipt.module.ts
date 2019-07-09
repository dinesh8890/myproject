import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleColumnsPipe} from 'src/app/pipes/toggle-columns.pipe'
import { CreateReceiptRoutingModule } from './create-receipt-routing.module';

@NgModule({
  declarations: [ToggleColumnsPipe],
  imports: [
    CommonModule,
    CreateReceiptRoutingModule
  ]
})
export class CreateReceiptModule { }
