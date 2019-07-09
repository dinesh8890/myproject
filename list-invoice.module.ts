import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SelectionModel} from '@angular/cdk/collections';
import { ListInvoiceRoutingModule } from './list-invoice-routing.module';
import { MatTableModule, MatSelectModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {ToggleColumnsPipe} from 'src/app/pipes/toggle-columns.pipe'
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [ToggleColumnsPipe],
  imports: [
    CommonModule,
    ListInvoiceRoutingModule,
    MatTableModule,MatSelectModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }
  })
  ]
})
export class ListInvoiceModule { }
