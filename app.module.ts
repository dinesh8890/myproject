import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule } from './material/material.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import {CommonModule} from '@angular/common';
import { MdePopoverModule } from '@material-extended/mde';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {HttpClientModule } from '@angular/common/http';
import {HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { GetPropertyService } from './services/get-property.service';
import { GetCompanyService } from './services/get-company.service';
import { MatInputModule } from '@angular/material';
import { OutstandingDetailsServiceService } from './services/outstanding-details-service.service';
import { TransactionSummaryService } from './services/transaction-summary.service';
import { TransactionlistService } from './services/transactionlist.service';
import { LayoutComponent } from './Core/layout/layout.component';
import { ListInvoiceComponent } from './views/list-invoice/list-invoice.component';
import { GroupPropertyComponent } from './components/group-property/group-property.component';
import { MoreOptionComponent } from './components/more-option/more-option.component';
import { FilterDialogComponent } from './components/filter-dialog/filter-dialog.component';
import { CreateInvoiceComponent } from './views/create-invoice/create-invoice.component';
import { DescriptionDialogComponent } from './components/description-dialog/description-dialog.component';
import { AttachDialogComponent } from './components/attach-dialog/attach-dialog.component';
import { CreateCreditnoteComponent } from './views/create-creditnote/create-creditnote.component';
import { ListStatementComponent } from './views/list-statement/list-statement.component';
import { GenerateStatementComponent } from './views/generate-statement/generate-statement.component';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { RouteHandlerComponent } from './Core/route-handler/route-handler.component';
import { ToolbarAlphaComponent } from './Core/toolbar/toolbar-alpha/toolbar-alpha.component';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { FilterStatementComponent } from './components/filter-statement/filter-statement.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HttpClient} from '@angular/common/http';
import { OpeningBalanceComponent } from './views/opening-balance/opening-balance.component';
import { ListTransactionComponent } from './views/list-transaction/list-transaction.component';
import { ListReceiptComponent } from './views/list-receipt/list-receipt.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { CreateReceiptComponent } from './views/create-receipt/create-receipt.component';
import {ToggleColumnsPipe} from "./pipes/toggle-columns.pipe";
import { OutstandingCreditComponent } from './components/outstanding-credit/outstanding-credit.component';
import { OutstandingDebitComponent } from './components/outstanding-debit/outstanding-debit.component';
import { DatewiseFilterComponent } from './components/datewise-filter/datewise-filter.component';
import { FilterReceiptComponent } from './components/filter-receipt/filter-receipt.component';
import { ListOpeningbalanceComponent } from './views/list-openingbalance/list-openingbalance.component';
import { FilterOpeningbalanceComponent } from './components/filter-openingbalance/filter-openingbalance.component';
import { FilterTransactionComponent } from './components/filter-transaction/filter-transaction.component';
import { ReportTransactionComponent } from './views/report-transaction/report-transaction.component';
import { CustomizeDialogComponent } from './components/customize-dialog/customize-dialog.component';
import { TransactiontotalComponent } from './components/transactiontotal/transactiontotal.component';
import { ListCreditnoteComponent } from './views/list-creditnote/list-creditnote.component';
import { AgeingDefinitionComponent } from './views/ageing-definition/ageing-definition.component';
import { ErrorService } from './services/error.service';
import { ToastrModule } from 'ngx-toastr';
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListInvoiceComponent,
    GroupPropertyComponent,
    MoreOptionComponent,
    FilterDialogComponent,
    CreateInvoiceComponent,
    DescriptionDialogComponent,
    AttachDialogComponent,
    CreateCreditnoteComponent,
    ListStatementComponent,
    GenerateStatementComponent,
    EmailDialogComponent,
    RouteHandlerComponent,
    ToolbarAlphaComponent,
    EditInvoiceComponent,
    FilterStatementComponent,
    OpeningBalanceComponent,
    ListTransactionComponent,
    ListReceiptComponent,
    CompanyDetailsComponent,
    CreateReceiptComponent ,
    ToggleColumnsPipe,
    TransactiontotalComponent,
    OutstandingCreditComponent,
    OutstandingDebitComponent,
    DatewiseFilterComponent,
    FilterReceiptComponent,
    ListOpeningbalanceComponent,
    FilterOpeningbalanceComponent,
    FilterTransactionComponent,
    ReportTransactionComponent,
    CustomizeDialogComponent,
    ListCreditnoteComponent,
    AgeingDefinitionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    MdePopoverModule,
    AngularSvgIconModule,
    HttpClientModule,
    HttpModule,
    MatInputModule,
    CKEditorModule,
    MatIconModule,
    ToastrModule.forRoot({
      timeOut :3000,
      positionClass: 'toast-top-right',
      closeButton:true
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],

  entryComponents:[],
  providers: [GetPropertyService,GetCompanyService,OutstandingDetailsServiceService,TransactionSummaryService,TransactionlistService,ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
