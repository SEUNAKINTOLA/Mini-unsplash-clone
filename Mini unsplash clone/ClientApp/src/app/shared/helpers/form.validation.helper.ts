import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { GlobalService } from '../services/global.service';

@Injectable({
    providedIn: 'root'
  })
export class FormValidationHelper {

    private days = [];

    public constructor(
        public globalService: GlobalService
    ) {

    }

    public performTest(formObject: any): any {
        const formElements = formObject.find('input[data-validation]');

        const response = {
            isSuccessful: true,
            numberFailed: 0,
            field: null
        };

        for (const element of formElements) {
            response.field = element;
            response.field.classList.remove('is-invalid');

            if (element.getAttribute('type') === 'text' && element.value.trim() === '') {
                response.isSuccessful = false;
                response.numberFailed += 1;
                break;
            }

            if (element.getAttribute('type') === 'password' && element.value.trim() === '') {
                response.isSuccessful = false;
                response.numberFailed += 1;
                break;
            }
        }
        if (response.numberFailed > 0) {
            response.field.classList.add('is-invalid');
            response.field.focus();
        } else {
            response.field.classList.remove('is-invalid');
        }
        return response;
    }

}
