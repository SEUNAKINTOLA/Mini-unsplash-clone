import { Injectable, EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
export class ImagesService {

    // private
    private url = this.globalService.baseApiUrl;

    list;
    public constructor(
        public globalService: GlobalService,
        public http: HttpClient,
    ) {

      }

      getImage(id) { 
        return this.http.get(this.url + "/Images/GetImages?id="+id);
     }
     getAllImages(count, start) { 
         return this.http.get(this.url + '/Images/GetImages?count='+count+'&start='+start);
      }
      postImage(param){
        return this.http.post(this.url + "/Images/PostImages",param);
      }
      queryImages(param){
        return this.http.post(this.url + "/Images/QueryImages",param);
      }
      getCollections(){
        return this.http.get(this.url + "/Images/GetImageCollections");
      }

}