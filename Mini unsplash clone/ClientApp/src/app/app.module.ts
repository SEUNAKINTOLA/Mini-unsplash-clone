import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-rounting.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImageDetails } from './shared/models/image-detail.model';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './popup/popup.service';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AccountModule }  from './account/account.module';

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AccountModule,
    AppRoutingModule,
    SlickCarouselModule,
    FormsModule,
    RouterModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ImageDetails, PopupService],
  bootstrap: [AppComponent],
  exports:[HomeComponent]
})

export class AppModule { }
