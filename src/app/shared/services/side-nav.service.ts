import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  token = localStorage.getItem("userToken");
  httpHeader = {
    headers:  new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    })
  };
  public sideNavToggleSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  // private sidenav: MatSidenav;
  // mode: any = "side";
  // public appDrawer: any;
  // constructor() { }
  // public toggle() {
  //   return this.sideNavToggleSubject.next(null);
  // }
  // public setSidenav(sidenav: MatSidenav) {
  //   this.sidenav = sidenav;
  // }
  // public open() {
  //   return this.sidenav.open();
  // }
  // public close() {
  //   return this.sidenav.close();
  // }
  // public toggle2(): void {
  //   this.sidenav.toggle();
  // }
}
