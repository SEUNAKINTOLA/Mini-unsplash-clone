import { Component,OnInit } from '@angular/core';
import  'bootstrap';
import * as $ from "jquery";

import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginDialogService } from '../account/login.dialog/login.dialog.service';
import { ChangePasswordDialogService } from '../account/change.password.dialog/change.password.dialog.service';

import { GlobalService } from '../shared/services/global.service';
import { HttpClient,HttpResponse,HttpHeaders } from "@angular/common/http";
import { ForgotPasswordDialogService } from '../account/forgot.password.dialog/forgot.password.dialog.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})

export class NavMenuComponent implements  OnInit {
  isExpanded = false;
  isAuthenticated = false;
  
  // private
  private widgetOkayButtonClickEvent: any;

  // public variables
  public data: any = {};
  public inProgress = false;
  public isEmpty = false;
  public isLoginError = false;
  public loginErrorMessage: string;
  public passedParam: any;

  sub;
  var1;



  constructor(private route: ActivatedRoute, private router: Router, public globalService: GlobalService,private http: HttpClient,
    public loginDialogService: LoginDialogService,
    public forgotPasswordDialogService: ForgotPasswordDialogService, public changePasswordDialogService :ChangePasswordDialogService
  ) {

    this.sub = this.route.queryParams.subscribe((params: Params) => {
      if(params['token'] != null ){
       this.var1 = params['token'];
       this.gotoChangePass();
      }
    });

    if( localStorage.getItem('auth_token') != null) this.isAuthenticated = true;
    this.hideDialog();
   // this.loginDialogService.dialog.subscribe((param: any) => this.showDialog(param));
  }
  collapse() {
    this.isExpanded = false;
  }  
  logOut(){
    this.isAuthenticated = false;
    this.http.post(this.globalService.baseApiUrl + '/Authorize/Logout',{})
    .subscribe(
      result => {     
        console.log("logout");  
        console.log(result);  
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/']); 
      });
    localStorage.removeItem('auth_token');
  }


  hideDialog(): void {
    try {
      ($('#login-dialog-modal') as any).modal('hide');
    } catch (ex) {
      //
    }
  }

  gotoForgotPassword(): void {
    this.hideDialog();
    this.forgotPasswordDialogService.showDialog();
  }
  gotoSignup(): void {
    this.hideDialog();
    this.loginDialogService.showDialog();
  }
  
  gotoChangePass(): void {
    this.hideDialog();
    this.changePasswordDialogService.showDialog();
  }

  ngOnInit(): void {
    
    this.hideDialog();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
