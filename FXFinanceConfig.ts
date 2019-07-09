import { extend } from "webdriver-js-extender";

export class FxsConfig
{
    public APIPath: string;
    public FxsUrl: string;
    public Version: string;
    private DevelopmentMode1: string;
    private DevelopmentMode2: string;
    
    private AppSetting: any;
    constructor() {
        this.DevelopmentMode1 = "FXFINANCE";
        this.DevelopmentMode2 = "FOAPI";

   this.AppSetting={
    "FXFINANCE":{
        //"APIPATH": "https://fxacrinvoiceapi.azurewebsites.net/api/",
        //"APIPATH": "https://fxacrinvoiceapi.azurewebsites.net/",
        //"APIPath": "http://localhost:51543/",   
       // "APIPath": "https://fxacrcreditnoteapi.azurewebsites.net/",  
       //"APIPath":" https://fxacrageingapi.azurewebsites.net/",   
     },
     "FOAPI":{
//        "APIPath": "http://localhost:51543/",
        //"APIPATH": "https://fxacrinvoiceapi.azurewebsites.net/",
        //"APIPath": "https://fxacrcreditnoteapi.azurewebsites.net/",
        //"APIPath":" https://fxacrageingapi.azurewebsites.net/",
 
}
   }
    }
    public _APIPath(param): string {
        debugger;
         let _Output = "";
          if (this.DevelopmentMode1 === param) {
            _Output = this.AppSetting.FXFINANCE.APIPath;
        }
        else if (this.DevelopmentMode2 === param) {
            _Output = this.AppSetting.FOAPI.APIPath;
        }
        else {
            _Output = this.AppSetting.FOAPI.APIPath;
        }
       //_Output='https://fxacrinvoiceapi.azurewebsites.net/';
         _Output='http://localhost:51543/';
        return _Output;
    }
}