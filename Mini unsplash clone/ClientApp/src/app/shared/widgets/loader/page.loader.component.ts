import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';
import { WidgetPageLoaderService } from './page.loader.service';

@Component({
  selector: 'widget-page-loader',
  templateUrl: 'page.loader.component.html',
  styleUrls: ['page.loader.component.css']
})
export class WidgetPageLoaderComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() size: any;
  @Input() color: any;
  @Input() label: string;

  constructor(public widgetPageLoaderService: WidgetPageLoaderService) {
    this.widgetPageLoaderService.isLoading.subscribe(isLoading => this.isLoading = isLoading);
    this.widgetPageLoaderService.size.subscribe(size => this.size = size);
    this.widgetPageLoaderService.color.subscribe(color => this.color = color);
    this.widgetPageLoaderService.label.subscribe(label => this.label = label);
  }

  ngOnInit() {
    // 
  }

  show() {
    // this.isLoading = this.widgetPageLoaderService.isLoading;
    // this.size = this.widgetPageLoaderService.size;
    // this.color = this.widgetPageLoaderService.color;
    // this.label = this.widgetPageLoaderService.label;
  }

}
