import { Component, OnInit, Inject } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'Mini unsplash clone';
  hasFav: number;
  loading = true;
  isDarkMode = true;
  public theme = 'dark';
  public savedTheme = '';
  cssPath = './assets/themes/css/';

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) { this.loading = true; }
    if (event instanceof NavigationEnd) { this.loading = false; }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) { this.loading = false; }
    if (event instanceof NavigationError) { this.loading = false; }
  }

  ngOnInit() {
    this.isDarkMode = false;
   // this.galleryServices.setThemeToLocalStrorage(this.isDarkMode + '');
    this.applyTheme(this.isDarkMode);
  }


  applyTheme(themeName: boolean) {
    this.theme = (themeName) ? 'dark' : 'light';
    this.document.getElementById('cssTheme').setAttribute('href', this.cssPath + this.theme + '.css');
  }

}
