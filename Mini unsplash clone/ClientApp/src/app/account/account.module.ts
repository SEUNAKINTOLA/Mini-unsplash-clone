import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLoaderComponent } from '../shared/widgets/loader/loader.component';
import { WidgetPageLoaderComponent } from '../shared/widgets/loader/page.loader.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { LoginDialogComponent } from './login.dialog/login.dialog.component';
import { LoginDialogService } from './login.dialog/login.dialog.service';
import { SignupDialogComponent } from './signup.dialog/signup.dialog.component';
import { SignupDialogService } from './signup.dialog/signup.dialog.service';
import { ForgotPasswordDialogComponent } from './forgot.password.dialog/forgot.password.dialog.component';
import { ForgotPasswordDialogService } from './forgot.password.dialog/forgot.password.dialog.service';
import { PasswordResetSuccessDialogComponent } from './forgot.password.dialog/password.reset.success.dialog.component';
import { PasswordResetSuccessDialogService } from './forgot.password.dialog/password.reset.success.dialog.service';
import { ChangePasswordDialogComponent } from './change.password.dialog/change.password.dialog.component';
import { ResetUsernameDialogComponent } from './retrieve.username.dialog/retrieve.username.dialog.component';
import { ChangePasswordDialogService } from './change.password.dialog/change.password.dialog.service';
import { NavMenuComponent }  from '../nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    LoginDialogComponent,NavMenuComponent,
    SignupDialogComponent,
    ForgotPasswordDialogComponent,
    PasswordResetSuccessDialogComponent,
    WidgetLoaderComponent,
    WidgetPageLoaderComponent,
    ChangePasswordDialogComponent,
    ResetUsernameDialogComponent],
  imports: [
    CommonModule,FormsModule
  ],
  exports: [NavMenuComponent,LoginDialogComponent, SignupDialogComponent, 
    ForgotPasswordDialogComponent, PasswordResetSuccessDialogComponent,ResetUsernameDialogComponent,ChangePasswordDialogComponent]
})
export class AccountModule { }
