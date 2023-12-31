import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateBrandVM } from 'src/app/shared/models/brandVM';
import { CreateECRIVM } from 'src/app/shared/models/ecriVM';
import { LoggedUser } from 'src/app/shared/models/userVM';
import { BrandService } from 'src/app/shared/services/brand.service';
import { ECRIService } from 'src/app/shared/services/ecri.service';
import { AuthenticationService } from 'src/app/shared/services/guards/authentication.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  lang = localStorage.getItem("lang");
  currentUser: LoggedUser
  ECRIObj: CreateECRIVM
  errorMessage: string;
  errorDisplay: boolean = false;
  display: boolean = false;
  constructor(private authenticationService: AuthenticationService, private ecriservice: ECRIService,
    private route: Router,
  ) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit(): void {
    this.ECRIObj = { code: '', name: '', nameAr: '' }
  }
  onSubmit() {

    this.ecriservice.CreateECRI(this.ECRIObj).subscribe(addedObj => {
      this.display = true;
      this.route.navigate(['/ecris/'])
    },
      (error) => {
        this.errorDisplay = true;
        if (this.lang == 'en') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.message;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.message;
          } if (error.error.status == 'nameAr') {
            this.errorMessage = error.error.message;
          }
        }
        if (this.lang == 'ar') {
          if (error.error.status == 'code') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'name') {
            this.errorMessage = error.error.messageAr;
          }
          if (error.error.status == 'nameAr') {
            this.errorMessage = error.error.messageAr;
          }
        }
        return false;
      });
  }
  back() { this.route.navigate(['/dash/ecris']); }

}
