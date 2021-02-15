import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { GlobalService } from './../services/global.service';

@Injectable({
    providedIn: 'root'
  })
export class DateTimeHelper {

    private days = [];

    public constructor(
        public globalService: GlobalService
    ) {
        for (let day = 1; day <= 31; day++) {
            this.days.push((day.toString().length <= 1) ? '0' + day : day);
        }
    }

    getDay(index: number): any {
        return this.days[index - 1];
    }

    getDayName(index: number): any {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[index];
    }

    getMonthName(index: number): any {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[index];
    }
}