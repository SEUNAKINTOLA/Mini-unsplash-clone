import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {

    // private
    public url = this.globalService.baseApiUrl;
    public url2 = this.globalService.baseApiUrl2;

    resetpassparam: ResetPassParameters= {
        Token: "",
        Email: "",
        NewPassword: "",
        ConfirmPassword: ""
      };
    list;
    // public
    public authState: any;
    public identity: any;
    public identityClaims: any;

    public constructor(
        public globalService: GlobalService,
        public http: HttpClient
    ) {
        this.authState = this.identity ? true : false;
    }


    login(data: any): Promise<AxiosResponse<any>> {
        data.RememberMe = true;
        return new Promise((resolve, reject) => {
            this.http.post(this.url+ '/Authorize/Login', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).subscribe(
                (response: any) => {

                    this.UserInfo().subscribe(
                        (result: any) => {     
                            console.log(result);
                            this.list = result;
                            if(this.list.isAuthenticated){
                                localStorage.setItem('auth_token', result.userName);
                                localStorage.setItem('userName', result.userName);
                                localStorage.setItem('userId', result.userId);
                                this.identity = result.UserName;
                                this.authState =  true;
                                resolve(result);
                            }        
                          
                        },
                         errors => {
                            reject(errors);
                         } );

                },
                (error: any) => reject(error)
            );
        });
    }


    UserInfo() { 
        return this.http.get(this.url + '/Authorize/UserInfo');
     }
    authenticate(credentials: any): Promise<AxiosResponse<any>> {
        return axios.post(this.url, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    logout(): Promise<AxiosResponse<any>> {
        const promise: any = new Promise((resolve: any, reject: any) => {
            axios.post(this.url + '/logout', this.authState, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                (response): any => {
                    resolve(response);
                    this.identity = null;
                },
                (error): any => {
                    reject(error);
                    this.identity = null;
                }
            );
        });
        return promise;
    }

    verifyEmail2(credentials: any): Promise<AxiosResponse<any>> {
        return new Promise((resolve, reject) => {
            axios.post(this.url + '/verify-email', credentials, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                response => {
                    const data = response.data;
                    if (data.ResponseCode === 200) {
                        // this.stateManager.save({ name: 'account-details', value: data });
                        // this.identity = data.Details;
                        // this.authState = this.identity ? true : false;
                        resolve(data);
                    } else {
                        reject(data);
                    }
                },
                error => reject(error)
            );
        });
    }

    retrieveusername(email) { 
        return this.http.get(this.url + '/Authorize/SendUsernameToEmail?email='+email);
     }
     verifyEmail(email) { 
        return this.http.get(this.url + '/Authorize/GetResetPasswordToken?email='+email);
     }

     ResetPass(resetpassparam) { 
          return this.http.post(this.url + '/Authorize/ResetPasswordAsync3', resetpassparam);
       }

}
export class UserRegistration {
    Email: string = "";  
    Password: string = "";
    PasswordConfirm:  string = "";
    FirstName: string = "";
    UserName: string = "";
    LastName:  string = "";
    PhoneNumber : string = "";
}
   

export class Credentials {
    UserName: string = ""; 
    Password: string = ""; 
}

interface ResetPassParameters{
    Token: string;
    Email:string;
    NewPassword: string;
    ConfirmPassword: string;
  };