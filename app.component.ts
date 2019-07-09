import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { USER_TYPE } from './Model/propertymodel'
import { MenuTreeService } from './services/menu-tree.service';
import { LocalStorageService } from './services/local-storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[LocalStorageService,MenuTreeService]
})
export class AppComponent {
  SelectedLanguageData: any;
  LanguageData: any;
  Languagearray: any;
  Lang: any;
  showCloseButton = true;
  // dir: LayoutDirection = "rtl";

  programs = [];

  // Accounting and Pending Date
  accountingDate: any = '';
  accountingStatus: string = "Pending";
  pendingDate: any = '';

  isMenuVisible: boolean = false;

  //Dashboard App value parameter
  isAppVisible: boolean = false;
  appMenuVisible: string;

  propertyList: any;
  selectedProperty: any;
  property: any;
  //////

  isSidenavOpened: boolean = false;
  isSidenavMenuOpened: boolean = true;
  menutree: any[] = [];
  menuexpand: string;
  // footerNav: any = { prev: null, next: null };
  currentBaseUrl: string = "";
  menuVisible: boolean = false;
  strictOpen: boolean = false;
  isProgressing: boolean = true;
  USER_TYPE = USER_TYPE;
  userEmail: string = '';

  subscribedProductList: any = [];
  unSubscribedProductList: any = [];
  selectedHotel: string;
  constructor(private router: Router,
    public _localStorageService: LocalStorageService,
    public menuTreeService: MenuTreeService,
    public translate: TranslateService) { }
  // roleList() {
  //   if (this._localStorageService.getUserDetails().UserType == USER_TYPE.IsUsers) {
  //     this._localStorageService.setUserRoles(null);
  //   }
  //   if (!this._localStorageService.getDefaultGroupCode()) {
  //     this._localStorageService.setDefaultGroupCode('40525');
  //   }
  //   if (!this._localStorageService.getDefaultPmsCustCode()) {
  //     this._localStorageService.setDefaultPmsCustCode('40526');
  //   }
  //   this.menuTree();
  // }
  menuTree() {
    this.menuTreeService.getMenuTreeLists()
      .subscribe(
        data => {
          this.menutree = data;
          console.log(this.menutree)
          this.persistPrograms(data);
          this.isProgressing = false;
        },
        error => {
          this.isProgressing = false;
        },
        () => {

        }
      );
  }
  roleWiseMenuTree(data: any) {
    let privilegeList: any[] = this.getPrivilegeList();
    if (privilegeList.length) {
      let accessJson: any[] = [];
      for (let k = 0; k < data.length; k++) {
        let childrens = data[k].CHILDREN;
        let subchild: any[] = [];
        let child: any[] = [];
        for (let i = 0; i < childrens.length; i++) {
          child = [];
          for (let j = 0; j < childrens[i].CHILDREN.length; j++) {
            if (privilegeList.indexOf(childrens[i].CHILDREN[j].CODE) !== -1 && childrens[i].CHILDREN[j].URL !== '/dashboard') {
              child.push({
                "NAME": childrens[i].CHILDREN[j].NAME,
                "URL": childrens[i].CHILDREN[j].URL,
                "LIVE": childrens[i].CHILDREN[j].LIVE
              });
            }
          }
          if (child.length) {
            subchild.push({
              "NAME": childrens[i].NAME,
              "CHILDREN": child
            });
          }
        }
        if (subchild.length) {
          accessJson.push({
            "NAME": data[k].NAME,
            "ICON": data[k].ICON,
            "EXPAND": data[k].EXPAND,
            "CHILDREN": subchild
          });
        }
      }
      this.menutree = accessJson;
      this.persistPrograms(accessJson);
    }
  }
  getPrivilegeList() {
    let roles: any = this._localStorageService.getUserRoles();
    let defaultPMSCode = this._localStorageService.getDefaultPmsCustCode();
    let accessparamList: string[] = [];
    if (roles && roles.length) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].PmsCustCode == defaultPMSCode) {
          for (let x in roles[i].Roles) {
            accessparamList.push(roles[i].Roles[x].FunctionCode);
          }
        }
      }
      if (accessparamList.length) {
        let s = new Set(accessparamList);
        let it = s.values();
        accessparamList = Array.from(it);
      }
    }
    return accessparamList;
  }

  ngOnInit() {
    this.menuTree();
    if (this._localStorageService.getUserDetails())
      this.userEmail = this._localStorageService.getUserDetails().LoginID + " - " + this._localStorageService.getUserDetails().UserType;
    else
      this.userEmail = '';
      this.Language();
    // this.Lang = this._API.SetDataToLanguage();
    if(this.Lang == null) {
      this.translate.setDefaultLang("en");
    }
  }
  Language() {
    this.Languagearray = this.jsonformat();
    this.SelectedLanguageData = this.Languagearray.LanguageData
    console.info(this.SelectedLanguageData);
  }
  jsonformat() {
    var _obj = {
      "LanguageData": [
        {
          "LanguageCode": "en",
          "LanguageName": "English"
        },
        {
          "LanguageCode": "fr",
          "LanguageName": "French"
        }
      ]
    }
    return _obj;
  }

  persistPrograms(data: any): void {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].CHILDREN.length; j++) {
        for (let k = 0; k < data[i].CHILDREN[j].CHILDREN.length; k++) {
          this.programs.push({
            "NAME": data[i].CHILDREN[j].CHILDREN[k].NAME,
            "URL": data[i].CHILDREN[j].CHILDREN[k].URL + "::" + data[i].NAME
          });
        }
      }
    }
  }

  onSearch(elem: any) {
    if (elem == null)
      return;
    let part = elem.split('::');
    if (part[1] != 'Configuration') {
      this.redirectURL(part[0], part[1]);
    } else {
      this.router.navigate([part[0]]);
    }
  }

  redirectURL(url: string, urlType: string) {
    let ConfigURL: any = {
      "Front Office": "/system-configuration/front-office/#",
      "FX Finance Management": "/system-configuration/#",
      "POS": "/system-configuration/pos/#"
    }
    window.location.href = ConfigURL[urlType] + url;
  }

  // persistPropertyResponseData(data) {
  //   this.propertyList = data.Data;
  //   if (this.propertyList && this.propertyList.length > 0) {
  //     this.selectedProperty = this.propertyList[0];
  //   } else {
  //     this.selectedProperty = [];
  //   }
  // }

  sidenavToggle() {
    if (!this.strictOpen) {
      document.getElementById("rimage").classList.add("rotate180");
    }
    else {
      this.isSidenavOpened = false;
      this.isSidenavMenuOpened = true;
      document.getElementById("rimage").classList.remove("rotate180");
    }
    this.strictOpen = !(this.strictOpen);
  }
  toggleMenuTreeIcon(elem: any) {
    if (elem.children[0].classList.contains('multilevel')) {
      elem = elem.children[0].children[1];
      if (elem.classList.contains('icon-angle-arrow-pointing-to-right')) {
        elem.classList.remove('icon-angle-arrow-pointing-to-right');
        elem.classList.add('icon-angle-arrow-down');
      }
      else {
        elem.classList.remove('icon-angle-arrow-down');
        elem.classList.add('icon-angle-arrow-pointing-to-right');
      }
    }
  }
  changeParentIcon(elem: any) {
    elem = elem.nextElementSibling;
    if (elem.classList.contains('icon-angle-arrow-pointing-to-right')) {
      elem.classList.remove('icon-angle-arrow-pointing-to-right');
      elem.classList.add('icon-angle-arrow-down');
    }
    else {
      elem.classList.remove('icon-angle-arrow-down');
      elem.classList.add('icon-angle-arrow-pointing-to-right');
    }

  }

  mouseOverMenuList() {
    if (this.strictOpen) {
      return;
    }
    this.strictOpen = false;
    this.isSidenavOpened = true;
    this.isSidenavMenuOpened = false;
    document.getElementById("mySidenav").style.width = "280px";
  }
  mouseOutMenuList() {
    if (this.strictOpen) {
      return;
    }
    this.isSidenavOpened = false;
    this.isSidenavMenuOpened = true;
    document.getElementById("mySidenav").style.width = "64px";
  }


  menuChildClick(child: boolean, event?: any, url?: any, urlType?: string) {
    console.log(urlType)
    if ((urlType != undefined && urlType == 'FX Finance Management') || (urlType != undefined && urlType == 'POS')) {
      this.redirectURL(url, urlType);
      // this.router.navigate(['/transaction-type'])
      return;
    }

    if (event !== undefined) {
      if (event.target.classList.contains('sub-child')) {
        this.makeActive(event.target.parentNode);
      }
      else if (event.target.classList.contains('child')) {
        this.makeActive(event.target.parentNode.parentNode);
      }
    }
    // this.md2Toast.clearAll();
    if (child) {
      this.isSidenavOpened = false;
      this.isSidenavMenuOpened = true;
    }
    else {
      this.isSidenavOpened = true;
      this.isSidenavMenuOpened = false;
    }
    this.strictOpen = false;
    document.getElementById("rimage").classList.remove("rotate180");
  }
  makeActive(elem: any) {
    let el = document.querySelectorAll('a.active');
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove('active');
    }
    elem.classList.add('active');
  }

  persistProductList(products: any) {
    let subscribedProducts: Array<any> = this._localStorageService.getSubscribedProductDetails();

    this.subscribedProductList = [];
    this.unSubscribedProductList = [];
    let subscribeList = [];

    for (let i = 0; i < subscribedProducts.length; i++) {
      if (subscribedProducts[i].ProductCode)
        subscribeList.push(subscribedProducts[i].ProductCode);
      else
        subscribeList.push(subscribedProducts[i].ProductID);

    }
    let isUnsubscribed = this._localStorageService.getUserDetails().UnsubscribedProducts;
    for (let i = 0; i < products.length; i++) {
      if (subscribeList.indexOf(products[i].ProductCode) !== -1) {
        this.subscribedProductList.push(products[i]);
      } else {
        if (isUnsubscribed) {
          this.unSubscribedProductList.push(products[i]);
        }
      }
    }
  }


  routeToPage(url: string) {
    if (url == "https://ngskyres.azurewebsites.net/") {
      window.open("https://ngskyres.azurewebsites.net/", "_blank");
    } else if (url == "https://fxposqa.azurewebsites.net/") {
      window.open("https://fxposqa.azurewebsites.net/", "_blank");
    } else if (url == "/fx-service/") {
      window.open("/fx-service/", "_blank");
    }
    else {
      window.location.href = url;
      // window.open(url, "_blank");
    }
  }

  navigateToHome(url) {
    window.location.href = url
  }
}
