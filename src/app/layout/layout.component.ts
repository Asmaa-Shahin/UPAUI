import { Component, OnInit } from '@angular/core';
import { LoggedUser } from '../shared/models/userVM';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  lang = localStorage.getItem('lang');
  textDir: string = 'rtl';
  currentUser: LoggedUser;
  isRefreshed = false;
  direction: string;
  selectedLang: string;

  constructor() {
      if (this.lang == 'ar') {
        this.textDir = 'rtl';
        this.direction = 'rtl';
      }
      else {
        this.textDir = 'ltr';
        this.direction = 'ltr';
      }
   
  }

  ngOnInit(): void {
    if (localStorage.getItem("lang") == null) {
      this.lang == 'ar'
      this.textDir = 'rtl';
    }
    if (localStorage.getItem('lang') == "en") {
      this.textDir = "ltr";
    }
    if (localStorage.getItem('lang') == "ar") {
      this.textDir = "rtl";
    }
  }


}
