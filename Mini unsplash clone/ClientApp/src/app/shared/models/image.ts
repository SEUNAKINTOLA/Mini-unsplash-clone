
export class ImageForm {
    imageid?: string ="";
    imagename : string= null;
    uid?:  string = null;
    image   :   any ;
    tags   :   string= null;
    collectionId   :   string= null;
}
export class ImageQueryParam {
    imageid?: string ="";
    imagename : string= null;
    uid?:  string = null;
    image   :   any ;
    tags   :   string= null;
    collectionId   :   string= null;
    start   :   number = 0;
    count   :   number= 0;
}
export class Image {
    imageid?: string ="";
    imagename : string= null;
    uid?:  string = null;
    imageurl   :   string ;
    tags   :   string= null;
    collectionId   :   string= null;
}