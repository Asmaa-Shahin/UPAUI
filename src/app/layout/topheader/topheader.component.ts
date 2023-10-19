import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { AssetDetailService } from 'src/app/shared/services/assetDetail.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.scss'],

})
export class TopheaderComponent implements OnInit {
  Lang: any;
  textDir: string = "rtl";
  direction = localStorage.getItem('dir');
  lang = localStorage.getItem("lang");
Url=`${environment.Domain}UploadedAttachments/SettingsLogo/`;
header:string;
ImageUrl:string;
  href = "";
  items: MenuItem[] | undefined;
User:LoggedUser;
  constructor(public translate: TranslateService,private authenticationService:AuthenticationService, private route: Router,private assetDetailService:AssetDetailService) {
    translate.addLangs(['en', 'ar']);

    if (localStorage.getItem("lang") != null || localStorage.getItem("lang") != "") {
      this.lang = localStorage.getItem("lang");
      localStorage.setItem('lang', this.lang);
      localStorage.setItem('dir', this.direction);
      this.translate.use(this.lang);
    }
    else {
      this.lang = 'ar';
      this.textDir = 'rtl';
      this.translate.setDefaultLang('ar');
      localStorage.setItem('lang', 'ar');
      localStorage.setItem('dir', this.direction);
    }
    assetDetailService.setting().subscribe(result=>{

      this.User= result;
      this.ImageUrl=this.Url+result.strLogo;
      if(this.lang=="en"){
        this.header=result.strInsitute;
       
      }
      else{
        this.header=result.strInsituteAr;
      }
      console.log(result);
    }
      

     
      );
  }



  selectLanguage(lang: string) {

    let currentUrl = this.route.url;
      this.textDir = '';
      if (lang == 'en') {
        this.textDir = 'ltr';
      } if (lang == 'ar') {
        this.textDir = 'rtl';
      }
      localStorage.setItem('lang', lang);
      localStorage.setItem('dir', this.direction);
      this.translate.use(lang);
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate([currentUrl]);

  }



  logout() {


    localStorage.removeItem('userToken');
    this.authenticationService.userData.next(null);
    
    this.route.navigate(['/']);
    
  }
  ngOnInit(): void {
  }
  forgetPassword() {
    //   this.route.navigate(['/forget']);
  }
}
