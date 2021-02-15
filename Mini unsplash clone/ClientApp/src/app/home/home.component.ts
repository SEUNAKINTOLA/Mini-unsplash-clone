import { Component, OnInit, HostListener, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageDetails } from '../shared/models/image-detail.model';
import { PopupService } from '../popup/popup.service';
import { Observable } from 'rxjs';
import { ImageQueryParam, ImageForm,Image } from '../shared/models/image';
import { ImagesService } from '../shared/services/image.services';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app/app.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated = false;
  private isEditEnabled = false;
  photos: any = [];
  hidebutton = [];
  private buffer: any = [];
  private collection: any = [];
  private pageTitle: string;
  private searchQuery: '';
  private pageNo = 1;
  private picturesperpage = 3;
  private hasFav: number;
  private openedPopupId: string;
  private isSortActive = false;
  loadmore = false;
  private loading = false;
  sharePhoto: Observable<any>;
  userImages: Observable<any>;
  isPopupActive = false;
  imageDetail = false;
  pos: number;
  max: number;
  imageupload;
  imagename;
  image:ImageForm = new ImageForm();
  images: any ;
  userId;
  imageQueryParam: ImageQueryParam = new ImageQueryParam;
  collections: any;
  

  constructor(
    private route: ActivatedRoute,
    private popupService: PopupService,
    private imageservice: ImagesService) {
  }

  ngOnInit() {
    
    if( localStorage.getItem('auth_token') != null) this.isAuthenticated = true;
    this.images = [new Image]
    this.images.splice(0,1);

    this.userId = localStorage.getItem('userId');
    this.getImages();
    this.getImageCollections();
  }
  triggerEnter(event: any) {
    console.log(event.keyCode);
    if (event.keyCode === 13) {
      this.queryImages();
    }
  }


  openShareModal(id: string, imageDetail: boolean, image: any) {
    this.sharePhoto = image;
      this.imageDetail = imageDetail;
      this.isEditEnabled = false;
      this.openedPopupId = id;
      this.popupService.open(id);
  }



  getRandomImages(orderBy: string) {
    this.getImages();
    return;
  }


  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.pos = window.scrollY + window.innerHeight;
    this.max = document.body.offsetHeight;
      if (this.pos >= this.max) {
        
      console.log(this.loading);
       if(this.loading !== false){ 
        if((this.imageQueryParam.collectionId!=null && this.imageQueryParam.collectionId!="") || (this.imageQueryParam.imagename!=null &&  this.imageQueryParam.imagename!="") ){
          this.moreQueryImages();
          } 
        else this.getImages();
       } 
      }
   
  }


  fileInputHandler(fileInputEl: any) {
    this.image.image = <File>fileInputEl.files[0];

    this.image.imagename =this.image.image.name;
    console.log(this.image.image);
  }



  postImage(){
    this.image.imageid = String(Guid.create());
    this.image.uid = this.userId;
    
    let formData = new FormData();
    formData.append('tags', this.image.tags);
    formData.append('collectionId', this.image.collectionId);
    formData.append('image', this.image.image);
    formData.append('imagename', this.image.imagename);
    formData.append('uid', this.image.uid);
    formData.append('imageid', this.image.imageid);

    this.imageservice.postImage(formData)
    .toPromise()
    .then(res => {
      alert("Image Posted")
      console.log("New ImageForm successfully added");
    },
    err => {
      console.log(err);
    });
  }
  

  getImageCollections(){
    this.imageservice.getCollections()
    .toPromise()
    .then(res => {
      this.collections = res;
    },
    err => {
      console.log(err);
    });
  }
  
  getImages(){
    
    
    this.loading = true;
    var totalfetched = this.pageNo*this.picturesperpage;
    this.imageservice.getAllImages(this.picturesperpage, totalfetched)
    .toPromise()
    .then(res => {
      this.loading = false;
      this.images =  this.images.concat(res as [Image]);
      this.pageNo++;
      console.log(this.loading);
    },
    err => {
      this.loading = false;
      console.log(err);
    });
  }


  queryImages(){
    if(this.imageQueryParam.collectionId=="null")  this.imageQueryParam.collectionId=null;

    
    if((this.imageQueryParam.collectionId==null || this.imageQueryParam.collectionId=="") && (this.imageQueryParam.imagename==null ||  this.imageQueryParam.imagename=="") ){
      this.getImages();
      return;
      } 
    this.loading = true;
    this.pageNo = 0;
    var totalfetched = this.pageNo*this.picturesperpage;
    this.imageQueryParam.count = this.picturesperpage;
    this.imageQueryParam.start = totalfetched;
    this.imageservice.queryImages(this.imageQueryParam)
    .toPromise()
    .then(res => {
      this.loading = false;
      this.images =  res as [Image];
      this.pageNo++;
    },
    err => {
      this.loading = false;
      console.log(err);
    });
  }

  moreQueryImages(){
    if(this.imageQueryParam.collectionId=="null")  this.imageQueryParam.collectionId=null;
    console.log("more query");
    this.loading = true;
    var totalfetched = this.pageNo*this.picturesperpage;
    this.imageQueryParam.count = this.picturesperpage;
    this.imageQueryParam.start = totalfetched;
    this.imageservice.queryImages(this.imageQueryParam)
    .toPromise()
    .then(res => {
      this.loading = false;
      this.images =  this.images.concat(res as [Image]);
      this.pageNo++;
    },
    err => {
      this.loading = false;
      console.log(err);
    });
  }
  
}
