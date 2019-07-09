import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleColumnsPipe} from 'src/app/pipes/toggle-columns.pipe'
import { ListOpeningbalanceRoutingModule } from './list-openingbalance-routing.module';

@NgModule({
  declarations: [ToggleColumnsPipe],
  imports: [
    CommonModule,
    ListOpeningbalanceRoutingModule
  ]
})
export class ListOpeningbalanceModule { }
