import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as $ from 'jquery';
// declare var $: any;
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { GlobalService } from '../../shared/services/global.service';
import { LoginDialogService } from './login.dialog.service';
import { WidgetLoaderService } from '../../shared/widgets/loader/loader.service';
import { Router } from '@angular/router';
import { SignupDialogService } from '../signup.dialog/signup.dialog.service';
import { ForgotPasswordDialogService } from '../forgot.password.dialog/forgot.password.dialog.service';
import { AuthService,Credentials } from '../../shared/services/auth.service';
import { FormValidationHelper } from '../../shared/helpers/form.validation.helper';
import { ResetUsernameDialogService } from '../retrieve.username.dialog/retrieve.username.dialog.service';

import {  UserRegistration } from '../../shared/services/auth.service';
@Component({
  selector: 'widget-login-dialog',
  templateUrl: 'login.dialog.component.html',
  styleUrls: ['login.dialog.component.css']
})

@Injectable({
    providedIn: 'root'
  })
export class LoginDialogComponent implements OnInit {

  // private
  private widgetOkayButtonClickEvent: any;

  // public variables
  public inProgress = false;
  public isEmpty = false;
  public isLoginError = false;
  public loginErrorMessage: string;
  public passedParam: any;

  private url = this.globals.baseApiUrl2 ;
  public data: Credentials = new Credentials;
  public data2: UserRegistration = new UserRegistration;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  timer;
  constructor(
    private globals: GlobalService,
    public loginDialogService: LoginDialogService,
    public forgotPasswordDialogService: ForgotPasswordDialogService,
    public signupDialogService: SignupDialogService,
    public ResetUsernameService:ResetUsernameDialogService,
    public loaderService: WidgetLoaderService,
    public router: Router,
    public authService: AuthService,
    public formValidationHelper: FormValidationHelper
  ) {
    this.loginDialogService.dialog.subscribe((param: any) => this.showDialog(param));
  }

  ngOnInit(): void {
    //
  }

  showDialog(param: any): void {
    try {
      this.passedParam = param;
      ($('#login-dialog-modal') as any).modal('show');
      document.getElementById('login-email-address-field').focus();
      this.inProgress = false;
    } catch (ex) {
      throw ex;
    }
  }

  hideDialog(): void {
    try {
      ($('#login-dialog-modal') as any).modal('hide');
    } catch (ex) {
      //
    }
  }

  public login(): void {
    try {
      var valid = true;
      this.isRequesting = true;
      this.errors='';
      if(this.data.UserName =="") {
        this.errors = "Please input your email address"
        valid = false;
        this.isRequesting = false;
      }
     else if(this.data.Password =="") {
        this.errors = "Please input your password"
        valid = false;
        this.isRequesting = false;
      }

      if(!valid){
        return;
      }
      const test = this.formValidationHelper.performTest($('#login-form'));

      // tslint:disable-next-line: max-line-length
      if (!test.isSuccessful) {
        // console.log('Empty fields');
        // this.isEmpty = true;
        return;
      } else {
        // enable loader
        this.inProgress = true;
        this.loaderService.show();

        // call login service
        this.authService
          .login(this.data).then(
            (response: any) => {
              this.loaderService.hide();
              this.loaderService.hide();
              this.inProgress = false;
              this.isLoginError = false;

              this.hideDialog();
              if (this.passedParam && ('callback' in this.passedParam)) {
                this.passedParam.callback();
              }
              
              window.location.reload();
            },
            (error: any) => {
              console.log(error);
              this.loaderService.hide();
              this.inProgress = false;
              this.isLoginError = true;
              this.loginErrorMessage = error.ErrorMessage;
            }
          );
      }
    }
    catch (ex) {
      throw ex;
    }
  }


  gotoForgotPassword(): void {
    this.hideDialog();
    this.forgotPasswordDialogService.showDialog();
  }
  gotoForgotUsername(){
    this.hideDialog();
    this.ResetUsernameService.showDialog();
  }
  gotoSignup(): void {
    this.hideDialog();
    this.signupDialogService.showDialog();
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