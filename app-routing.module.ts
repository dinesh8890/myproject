import { NgModule, Component } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { ListInvoiceComponent } from './views/list-invoice/list-invoice.component';
import { CreateInvoiceComponent } from './views/create-invoice/create-invoice.component';
import { CreateCreditnoteComponent } from './views/create-creditnote/create-creditnote.component';
import { ListStatementComponent } from './views/list-statement/list-statement.component';
import { GenerateStatementComponent } from './views/generate-statement/generate-statement.component';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { OpeningBalanceComponent } from './views/opening-balance/opening-balance.component';
import { ListTransactionComponent } from './views/list-transaction/list-transaction.component';
import { ListReceiptComponent } from './views/list-receipt/list-receipt.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CreateReceiptComponent } from './views/create-receipt/create-receipt.component';
import { ListOpeningbalanceComponent } from './views/list-openingbalance/list-openingbalance.component';
import { ReportTransactionComponent } from './views/report-transaction/report-transaction.component';
import { CustomizeDialogComponent } from './components/customize-dialog/customize-dialog.component';
import { FilterTransactionComponent } from './components/filter-transaction/filter-transaction.component';
import { AgeingDefinitionComponent } from './views/ageing-definition/ageing-definition.component';

const routes: Route[] = [
  {path: '', loadChildren: "./views/auth/login/login.component.module#LoginComponentModule", pathMatch: 'full'},
  {path: 'list-invoice', component: ListInvoiceComponent},
  {path:'create-invoice',component:CreateInvoiceComponent},  
  {path:'create-creditnote',component:CreateCreditnoteComponent},
  {path:'list-statement',component:ListStatementComponent},
  {path:'generate-statement',component:GenerateStatementComponent},
  {path:'email',component:EmailDialogComponent},
  {path:'editinvoice',component:EditInvoiceComponent},
  {path:'Desc',component:DescriptionDialogComponent},
  {path:'opening-balance',component:OpeningBalanceComponent},
  {path:'list-transaction',component:ListTransactionComponent,data:{"value":"0"}},
  {path:'invoice',component:ListTransactionComponent,data:{"value":"1"}},
  {path:'receipt',component:ListTransactionComponent,data:{"value":"2"}},
  {path:'openingbalance',component:ListTransactionComponent,data:{"value":"3"}},
  {path:'credit',component:ListTransactionComponent,data:{"value":"4"}},
  // {path:'list-receipt',component:ListReceiptComponent},
   {path:'com',component:CompanyDetailsComponent},
  {path:'receipt-create',component:CreateReceiptComponent},
  // {path:'list-openingbalance',component:ListOpeningbalanceComponent}
  {path:'report-tra',component:ReportTransactionComponent},
  {path:'Customize',component:CustomizeDialogComponent},
  {path:'filter',component:FilterTransactionComponent},
  {path:'ageing-definition',component:AgeingDefinitionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
