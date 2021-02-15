import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';

interface WidgetAlertDialogInterface {
    toggleDialog: boolean;
    label: string;
}

@Injectable({
    providedIn: 'root'
  })
export class ForgotPasswordDialogService  {
    public dialog = new Subject<void>();

    // event handler
    public onOkay = new Subject<void>();

    showDialog(): void {
        this.dialog.next();
    }

    addEventHandler(event: any): void {
        // this.observableOkayEvent.next(event);
        this.onOkay.next(event);
    }

    authenticate(credentials: any): Promise<AxiosResponse<any>> {
        return axios.post('', credentials);
    }
}