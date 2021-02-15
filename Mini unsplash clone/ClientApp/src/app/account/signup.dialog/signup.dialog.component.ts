import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
// declare var $: any;

import { GlobalService } from '../../shared/services/global.service';
import { SignupDialogService } from './signup.dialog.service';
import { WidgetLoaderService } from '../../shared/widgets/loader/loader.service';
import { Router } from '@angular/router';
import { LoginDialogService } from '../login.dialog/login.dialog.service';
import { FormValidationHelper } from '../../shared/helpers/form.validation.helper';
import { AuthService, UserRegistration,Credentials } from '../../shared/services/auth.service';

@Component({
  selector: 'widget-signup-dialog',
  templateUrl: 'signup.dialog.component.html',
  styleUrls: ['signup.dialog.component.css']
})
export class SignupDialogComponent implements OnInit {


  private widgetOkayButtonClickEvent: any;

  // public variables
  public data2: Credentials = new Credentials;
  public data: UserRegistration = new UserRegistration;
  public inProgress = false;
  public isEmpty = false;
  public isSignUpError = false;
  public signUpErrorMessage: string;
  public passedParam: any;
  timer;

  errors: string;  
  successmessage: string;
  isRequesting: boolean;
  valid;

  private url = this.globals.baseApiUrl2 ;
  constructor(
    private globals: GlobalService,
    public loginDialogService: LoginDialogService,
    public signupDialogService: SignupDialogService,
    public loaderService: WidgetLoaderService,
    public router: Router,
    public authService: AuthService,
    public formValidationHelper: FormValidationHelper
  ) {
    this.signupDialogService.dialog.subscribe((param: any) => this.showDialog(param));
  }

  ngOnInit(): void {
    try {

    } catch (error) {

    }
  }

  showDialog(param: any): void {
    try {
      this.passedParam = param;
      ($('#signup-dialog-modal') as any).modal('show');
      document.getElementById('signup-first-name-field').focus();
      this.inProgress = false;
    } catch (ex) {
      throw ex;
    }
  }
  showLoginDialog(): void {
    try {
      ($('#login-dialog-modal') as any).modal('show');
      this.inProgress = false;
    } catch (ex) {
      throw ex;
    }
  }
  
  hideDialog(): void {
    try {
      ($('#signup-dialog-modal') as any).modal('hide');
    } catch (ex) {
      // throw ex;
    }
  }

  public emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  public phoneIsValid (phone) {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
  }

  

  public signup(): void {
    try {
      var valid = true;

      $('#signup-retype-password-field').removeClass('is-invalid');
      this.isRequesting = true;
      this.errors='';
      this.successmessage = "";
      var re = /^(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      if (this.data.FirstName.length < 1) {
       this.errors += "Please input your first name"; 
      }
      if (this.data.LastName.length < 1) {
       this.errors  = "Please input your last name"; 
      }
      if (this.data.UserName.length < 1) {
       this.errors  = "Please input your User Name"; 
      }
      else if (!this.emailIsValid(this.data.Email)) {
       this.errors  = "Please input a valid email"; 
      }
     else if (this.data.Password.length < 8) {
       this.errors  = " Your password must be at least 8 characters"; 
     }else if ((this.data.Password.search(/[a-z]/i) < 0 ) && (this.data.Password.search(/[A-Z]/i) < 0)) {
       this.errors = " Your password must contain at least one letter.";
     }else if (this.data.Password.search(/[0-9]/) < 0) {
       this.errors = " Your password must contain at least one digit."; 
     }else if( !re.test(this.data.Password)){
       this.errors = " Your password must contain at least on special character"; 
     }else if ($('#signup-password-field').val() !== $('#signup-retype-password-field').val()) {
      $('#signup-retype-password-field').focus();
      $('#signup-retype-password-field').addClass('is-invalid');
      
      this.errors = " Confirm password does not match password."; 
    }
     if (this.errors  != '') {
       this.isRequesting = false;
       return;
         valid =  false;
     }

      const test = this.formValidationHelper.performTest($('#signup-form'));

      // tslint:disable-next-line: max-line-length
      if (!test.isSuccessful) {
        return;
      } else {
  

        // enable loader
        this.inProgress = true;
        this.loaderService.show();

        this.signupDialogService
          .register(this.data)
          .subscribe(
            (response: any) => {
              console.log("success");
              console.log(response);
              // this.inProgress = false;
              // this.isSignUpError = false;
               this.loaderService.hide();

               alert("Registration Successful !");
              this.hideDialog();
              this.showLoginDialog();
            },
            (error: any) => {
              console.log("failed");
              console.log(error.error);
              this.loaderService.hide();
              this.inProgress = false;
              this.isSignUpError = true;
              this.signUpErrorMessage = "Retry";
              if(error.error.length < 200)this.errors = error.error;
              else this.errors = "Registration successful but failed to send email, if you registered with a valid email please login";
            }
          );

      }
    }
    catch (ex) {
      throw ex;
    }
  }

  gotoLogin(): void {
    this.hideDialog();
    this.loginDialogService.showDialog();
  }

  gotoTermsAndConditions(): void {
    this.hideDialog();
    this.router.navigate(['./terms-conditions']);
  }

  gotoPrivacyPolicy(): void {
    this.hideDialog();
    this.router.navigate(['./privacy-policy']);
  }

}