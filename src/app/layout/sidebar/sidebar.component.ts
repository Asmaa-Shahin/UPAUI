import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { SideNavService } from 'src/app/shared/services/side-nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  lang = localStorage.getItem("lang");
  textDir: string = 'rtl';
  currentUser: LoggedUser;
  user: LoggedUser;
  private currentUserSubject: BehaviorSubject<LoggedUser>;
  //@ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;


  isAdmin: boolean = false;
  selectedLang: string;
  direction: any;
  lstRoleNames: string[] = [];
  contractSubject: string = "";
  title: string = "";
  hospitalName: string = "";
  showSR: boolean = false;
  showIncomeSR: boolean = false;
  showManufacturePM: boolean = false;
  showATSchedule: boolean = false;
  showAssetST: boolean = false;
  constructor(private sideNavService: SideNavService, private route: Router, private authenticationService: AuthenticationService,
    private translate: TranslateService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit() {
    // this.sideNavService.sideNavToggleSubject.subscribe(() => {
    //   this.sidenav.toggle();
    // });
    // if (this.currentUser) {
    //   this.currentUser["roleNames"].forEach(element => {
    //     this.lstRoleNames.push(element["name"]);
    //   });
    //   this.isAdmin = (['Admin'].some(r => this.lstRoleNames.includes(r)));
    // }
  }
}
