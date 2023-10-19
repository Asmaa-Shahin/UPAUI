import { Component } from '@angular/core';
import { LoggedUser } from './shared/models/userVM';
import { AuthenticationService } from './shared/services/guards/authentication.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Assets Management System';
  currentUser: LoggedUser;
  isRefreshed = false;
  lang = localStorage.getItem("lang")
  direction: string = "";
  userCookieObj: LoggedUser;
  userObj: LoggedUser;

  selectedLang: string;

  constructor(private authenticationService: AuthenticationService, private router: Router,
    private translate: TranslateService) {


    if (localStorage.getItem("lang") == null) {
      this.lang == 'en'
      this.direction = 'ltr';
    }
    else if (this.lang == 'en') {
      this.direction = 'ltr';
    } else if (this.lang == 'ar') {
      this.direction = 'rtl';
    }

  }
  ngOnInit(): void {
    // this.userObj = {
    //   email: '', userNameAr: '', id: '', userName: '', roleName: '', roleNames: [], displayName: '', token: '', isRemembered: false,
    //   governorateId: 0, organizationId: 0, govName: '', orgName: '', govNameAr: '', orgNameAr: ''
    // }
  }

}
