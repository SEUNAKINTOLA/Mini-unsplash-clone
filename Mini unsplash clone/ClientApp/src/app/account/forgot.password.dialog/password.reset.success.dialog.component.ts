import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// import * as $ from 'jquery';
declare var $: any;

import { GlobalService } from '../../shared/services/global.service';
import { ForgotPasswordDialogService } from './forgot.password.dialog.service';
import { WidgetLoaderService } from '../../shared/widgets/loader/loader.service';
import { Router } from '@angular/router';
import { SignupDialogService } from '../signup.dialog/signup.dialog.service';
import { LoginDialogService } from '../login.dialog/login.dialog.service';
import { AuthService } from '../../shared/services/auth.service';
import { PasswordResetSuccessDialogService } from './password.reset.success.dialog.service';

@Component({
  selector: 'widget-password-reset-success-dialog',
  templateUrl: 'password.reset.success.dialog.component.html',
  styleUrls: ['password.reset.success.dialog.component.css']
})
export class PasswordResetSuccessDialogComponent implements OnInit {

  // public variables
  public inProgress = false;
  public data: any = {};
  public isEmailExist = false;
  public isEmailVerificationError = false;
  public emailVerificationErrorMessage: string;

  // private variables
  private widgetOkayButtonClickEvent: any;


  constructor(
    private globals: GlobalService,
    public authService: AuthService,
    public loginDialogService: LoginDialogService,
    public forgotPasswordDialogService: ForgotPasswordDialogService,
    public passwordResetSuccessDialogService: PasswordResetSuccessDialogService,
    public signupDialogService: SignupDialogService,
    public loaderService: WidgetLoaderService,
    public router: Router
  ) {
    this.passwordResetSuccessDialogService.dialog.subscribe(() => this.showDialog());
  }

  ngOnInit(): void {
    try {

    } catch (error) {

    }
  }

  showDialog(): void {
    try {
      $('#password-reset-success-dialog-modal').modal('show');
      this.inProgress = false;
    } catch (ex) {
      throw ex;
    }
  }

  hideDialog(): void {
    try {
      $('#password-reset-success-dialog-modal').modal('hide');
    } catch (e) {
      //
    }
  }

  okay(): void {
    try {
      $('#password-reset-success-dialog-modal').modal('hide');
    } catch (e) {
      //
    }
  }

}