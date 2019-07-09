import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToggleColumnsPipe} from 'src/app/pipes/toggle-columns.pipe';

@NgModule({
  declarations: [ToggleColumnsPipe],
  imports: [
    CommonModule
  ]
})
export class ListCreditnoteModule { }
