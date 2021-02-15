import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ScrollerHelper {

  scrollTop(): void {
    window.scrollTo(0, 0);
    // const scrollToTop: any = window.setInterval(() => {
    //   const pos: any = window.pageYOffset;
    //   if (pos > 0) {
    //     // window.scrollTo(0, pos - 30); // how far to scroll on each step
    //     window.scrollTo(0, 0); // how far to scroll on each step
    //   } else {
    //     window.clearInterval(scrollToTop);
    //   }
    // }, 1);
  }
}
