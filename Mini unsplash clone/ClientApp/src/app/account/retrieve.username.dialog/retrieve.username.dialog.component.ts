import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import * as $ from 'jquery';
import * as $ from 'jquery';

import { GlobalService } from '../../shared/services/global.service';
import { ResetUsernameDialogService } from './retrieve.username.dialog.service';
import { WidgetLoaderService } from '../../shared/widgets/loader/loader.service';
import { Router } from '@angular/router';
import { SignupDialogService } from '../signup.dialog/signup.dialog.service';
import { LoginDialogService } from '../login.dialog/login.dialog.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'widget-reset-username-dialog',
  templateUrl: 'retrieve.username.dialog.component.html',
  styleUrls: ['retrieve.username.dialog.component.css']
})
export class ResetUsernameDialogComponent implements OnInit {

  // public variables
  public inProgress = false;
  public data: any = {};
  public isEmailExist = false;
  public response;
  public isEmailVerificationError = false;
  public emailVerificationErrorMessage: string;

  // private variables
  private widgetOkayButtonClickEvent: any;


  constructor(
    private globals: GlobalService,
    public authService: AuthService,
    public loginDialogService: LoginDialogService,
    public forgotPasswordDialogService: ResetUsernameDialogService,
    public signupDialogService: SignupDialogService,
    public loaderService: WidgetLoaderService,
    public router: Router
  ) {
    this.forgotPasswordDialogService.dialog.subscribe(() => this.showDialog());
  }

  ngOnInit(): void {
    try {

    } catch (error) {

    }
  }

  showDialog(): void {
    try {
      ($('#retrive-username-dialog-modal') as any).modal('show');
      this.inProgress = false;
    } catch (ex) {
      throw ex;
    }
  }

  hideDialog(): void {
    try {
      ($('#retrive-username-dialog-modal') as any).modal('hide');
    } catch (e) {
      //
    }
  }

  public recoverPassword(): void {
    try {
      // enable loader
      this.inProgress = true;
      this.loaderService.show();

      // call login service
      this.authService
        .retrieveusername(this.data.Email).subscribe(
          (response: any) => {
            this.response = "Username sent to your mail, if provided email is valid";
            this.loaderService.hide();
            this.inProgress = false;
            this.isEmailVerificationError = false;
            this.data = {
              Email: ''
            };
            this.hideDialog();
            //this.passwordResetSuccessDialogService.showDialog();
          },
          (error: any) => {
            this.loaderService.hide();
            this.inProgress = false;
            this.isEmailVerificationError = true;
            this.emailVerificationErrorMessage = "Username retrieval failed";
          }
        );
    }
    catch (ex) {
      throw ex;
    }
  }

  gotoLogin(): void {
    this.hideDialog();
    this.loginDialogService.showDialog();
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