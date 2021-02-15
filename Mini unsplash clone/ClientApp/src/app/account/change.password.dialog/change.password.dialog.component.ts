import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
// import * as $ from 'jquery';
import * as $ from 'jquery';


import { GlobalService } from '../../shared/services/global.service';
import { ChangePasswordDialogService } from './change.password.dialog.service';
import { WidgetLoaderService } from '../../shared/widgets/loader/loader.service';
import { Router,ActivatedRoute } from '@angular/router';
import { SignupDialogService } from '../signup.dialog/signup.dialog.service';
import { LoginDialogService } from '../login.dialog/login.dialog.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'widget-change-password-dialog',
  templateUrl: 'change.password.dialog.component.html',
  styleUrls: ['change.password.dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {

  // public variables
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { email: '', password: '' };
  public inProgress = false;
  public data: any = {};
  public isEmailExist = false;
  public isEmailVerificationError = false;
  public emailVerificationErrorMessage: string;

  private subscription: Subscription;
  list;
  resetpassparam: ResetPassParameters= {
    Token: "",
    Email: "",
    NewPassword: "",
    ConfirmPassword: ""
  };
  // private variables
  private widgetOkayButtonClickEvent: any;


  constructor(
    private globals: GlobalService,
    public authService: AuthService,
    public loginDialogService: LoginDialogService,
    public changePasswordDialogService: ChangePasswordDialogService,
    public signupDialogService: SignupDialogService,
    public loaderService: WidgetLoaderService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.changePasswordDialogService.dialog.subscribe(() => this.showDialog());
  }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
         this.resetpassparam.Email = param['email'];   
         this.resetpassparam.Token = param['token'];         
         this.credentials.email = param['email'];   
      });      
  }

  showDialog(): void {
    
    try {
      ($('#change-password-dialog-modal')  as any).modal('show');
      this.inProgress = false;
    } catch (ex) {
      throw ex;
    }
  }

  hideDialog(): void {
    
    try {
      ($('#change-password-dialog-modal')  as any).modal('hide');
    } catch (e) {
      //
    }
    
  }

  showLoginDialog(): void {
    try {
      ($('#login-dialog-modal') as any).modal('show');
      document.getElementById('login-email-address-field').focus();
      this.inProgress = false;
    } catch (ex) {
      throw ex;
    }
  }

  reset({ value, valid }: { value: ResetCredentials, valid: boolean }) {
    console.log("here");
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
    var re = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    if (value.password.length < 8) {
     this.errors  = "Your password must be at least 8 characters"; 
   }else if ((value.password.search(/[a-z]/i) < 0 ) && (value.password.search(/[A-Z]/i) < 0)) {
     this.errors  =  "Your password must contain at least one letter.";
   }else if (value.password.search(/[0-9]/) < 0) {
     this.errors  =  "Your password must contain at least one digit."; 
   }else if( !re.test(value.password)){
    this.errors  = "Your password must contain at least on special character"; 
  }else if(value.password != value.cpassword){
    this.errors  = "Please confirm your password correctly"; 
  }
   if (this.errors  != '') {
     this.isRequesting = false;
       valid =  false;
   }
    if(valid)
    {
      this.resetpassparam.ConfirmPassword  = value.password;
      this.resetpassparam.NewPassword  = value.password;
        this.authService.ResetPass(this.resetpassparam)
        .subscribe(
            result => {     
               this.isRequesting = false;
                this.list = result;
                console.log('result 1');
                console.log(this.list);
                this.hideDialog();
                this.showLoginDialog();
            },
             errors => {
              this.errors = "Reset password failed";
              console.log('error 1');
              console.log(this.errors);
             } );
    } 
      
  }

  public recoverPassword(): void {
    try {
      // enable loader
      this.inProgress = true;
      this.loaderService.show();

      // call login service
      this.authService
        .verifyEmail(this.data).subscribe(
          (response: any) => {
            console.log(response);

            this.loaderService.hide();
            this.inProgress = false;
            this.isEmailVerificationError = false;
            this.data = {
              Email: ''
            };
            this.hideDialog();
          },
          (error: any) => {
            this.loaderService.hide();
            this.inProgress = false;
            this.isEmailVerificationError = true;
            this.emailVerificationErrorMessage = error.ErrorMessage;
          }
        );
    }
    catch (ex) {
      throw ex;
    }
  }

}

export interface Credentials {
  email: string;  
  password: string;
}

interface ResetPassParameters{
  Token: string;
  Email:string;
  NewPassword: string;
  ConfirmPassword: string;
};


export interface ResetCredentials {
  email: string;  
  password: string;
  cpassword: string;
}