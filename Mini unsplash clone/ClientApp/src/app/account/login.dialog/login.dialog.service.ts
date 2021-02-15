import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { GlobalService } from '../../shared/services/global.service';

interface WidgetAlertDialogInterface {
    toggleDialog: boolean;
    label: string;
}

@Injectable({
    providedIn: 'root'
  })
export class LoginDialogService {
    public dialog = new Subject<any>();

    // event handler
    public onOkay = new Subject<void>();

    private url = this.globalService.baseApiUrl + '/auth';

    public constructor(
        public globalService: GlobalService
    ) {
    }

    showDialog(param?: any): void {
        this.dialog.next(param);
    }

    addEventHandler(event: any): void {
        this.onOkay.next(event);
    }

}