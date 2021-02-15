import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { GlobalService } from '../../shared/services/global.service';

import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
export class SignupDialogService  {

    public dialog = new Subject<void>();
    public authState: any;

    // event handler
    public onOkay = new Subject<void>();

    private url = this.globalService.baseApiUrl ;

    public constructor(
        public globalService: GlobalService,
        public http: HttpClient
    ) {

    }

    showDialog(): void {
        this.dialog.next();
    }

    addEventHandler(event: any): void {
        this.onOkay.next(event);
    }

    public register(credentials: any){
        return this.http.post(this.url+ "/Authorize/Register", credentials);
    }


    public register2(credentials: any): Promise<AxiosResponse<any>> {
        return new Promise((resolve, reject) => {
            axios.post(this.url+ "/Authorize/Register", credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                response => {
                    console.log(response);
                    const data = response.data;
                    if (data == "Success") {
                        console.log(data);
                        this.authState =  true ;
                        resolve(data);
                    } else {
                        reject(data);
                    }
                },
                error => {
                    console.log(error.ErrorMessage);
                    reject(error);
                }
            );
        });
    }
}