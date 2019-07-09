import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(public ToastService:ToastrService) { }
  // config: any = {
  //   "success": { "duration": 3000, "color": "#81CA9D", "icon": "icon-tick-inside-circle" },
  //   "error": { "duration": 3000, "color": "#E0736F", "icon": "icon-cancel" },
  //   "warning": { "duration": 3000, "color": "#78B2E0", "icon": "icon-info" }
  // };

  success(message: string,title?:string) {
    this.ToastService.success(message,title);
  }

  warning(message: string,title?:string) {
    this.ToastService.warning(message,title);
  }

  info(message: string,title?:string) {
    this.ToastService.info(message,title)
  }

  error(message: string,title?:string) {
    this.ToastService.error(message,title);
  }
}
