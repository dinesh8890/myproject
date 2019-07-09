
export interface LedgerSummary{
    // 'Type':'Value', 'AccountName': this.Debtors[0].AccountMasterCode,'SubLedger':this.CompanyCode,'Department':this.LedgerList.DepartmentCode,'CostCentre':this.LedgerList.SectionCode,'Debit':'--','Credit':this.LedgerList.TotalTransactionAmount
    Program : string;
    Type:string;
    AccountCode:string;
    AccountName:string;
    SubLedgerCode:string;
    SubLedgerName:string;
    DepartmentCode:string;
    DepartmentName:string;
    SectionCode:string;
    SectionName:string;
    DebitAmount:number;
    CreditAmount:number;
    TotalTransactionAmount:number;
  }
  
  export interface TransactionSummary{
    Program : string;
    TransactionAmount:number;
    CommissionAmount:number;
    TotalTaxAmount:number;
    Currency:string;
    TotalTransactionAmount:number;
    TaxSummary:TransactionTaxSummary[];
  }
  
  export interface TransactionTaxSummary{
    TaxCode:string;
    TaxPercentage:string;
    TaxAmount:number;
  }