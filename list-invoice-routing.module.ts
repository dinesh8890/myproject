import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListInvoiceComponent } from './list-invoice.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: '',
    component: ListInvoiceComponent,
  }
];

@NgModule({
  imports: [HttpClientModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListInvoiceRoutingModule { }
