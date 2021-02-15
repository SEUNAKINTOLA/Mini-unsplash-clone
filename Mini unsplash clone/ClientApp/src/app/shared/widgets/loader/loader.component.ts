import { Component, OnInit, Input } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'widget-loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['loader.component.css']
})
export class WidgetLoaderComponent implements OnInit {

  @Input() isLoading: boolean;
  @Input() size: any;
  @Input() color: any;

  public constructor() {
    // 
  }

  ngOnInit() {
    try {
      // console.log(this.isLoading);
    } catch (error) {

    }
  }

}
