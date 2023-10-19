import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUser, User } from 'src/app/shared/models/userVM';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggingUserObj: User;
  userObj: LoggedUser;
  display: boolean = false;
  displayerror: string = "";
  lang = localStorage.getItem("lang");
  textDir: string = 'ltr';
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.loggingUserObj = { userName: '', password: '', isRemembered: false }
    // this.userObj = {
    //   email: '', userNameAr: '', id: '', userName: '', roleName: '', roleNames: [], displayName: '', token: '', isRemembered: false,
    //   governorateId: 0, organizationId: 0, govName: '', orgName: '', govNameAr: '', orgNameAr: ''
    // }

    this.lang = "en";
    this.textDir = "ltr";
    localStorage.removeItem("lang");
    localStorage.removeItem("dir");
  }
  login() {


    this.lang = "ar";
    this.textDir = "rtl";
    localStorage.setItem("lang", this.lang);
    localStorage.setItem("dir", this.textDir);
    

    this.authenticationService.login(this.loggingUserObj).subscribe(
      data => {

      if(data.message=='success'){
        localStorage.setItem('userToken',data.token);
        this.authenticationService.saveUserData();
        // this.userObj.isRemembered = this.loggingUserObj.isRemembered;
        this.lang = "ar";
        this.textDir = "rtl";
        this.router.navigate(['/dashboard']);
      }
      else{
       
        this.displayerror="username or password Incorrect"
      }
      
      },
      error => {
        this.display = true;
        this.displayerror = error.error.message;
      });

  }

  forgetPassword() {
    this.router.navigate(['/forget']);
  }

}
