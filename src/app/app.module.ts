import {  NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutRoutingModule } from './layout/layout-routing.module';
import { LayoutModule } from './layout/layout.module';
import { LoginComponent } from './authenticate/login/login.component';
import { ForgetpasswordComponent } from './authenticate/forgetpassword/forgetpassword.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { AuthenticateRoutingModule } from './authenticate/authenticate-routing.module';
import { CountassetsModule } from './features/countassets/countassets.module';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { CarouselModule } from 'primeng/carousel';
import { MultiSelectModule } from 'primeng/multiselect';
import { CountassetsRoutingModule } from './features/countassets/countassets-routing.module';
import { ReportsModule } from './features/reports/reports.module';
import { ReportsRoutingModule } from './features/reports/reports-routing.module';

import { BrandsModule } from './features/brands/brands.module';
import { BrandsRoutingModule } from './features/brands/brands-routing.module';
import { CategoriesRoutingModule } from './features/categories/categories-routing.module';
import { ECRISModule } from './features/ecris/ecris.module';
import { ECRISRoutingModule } from './features/ecris/ecris-routing.module';
import { SubCategoriesModule } from './features/sub-categories/sub-categories.module';
import { SubCategoriesRoutingModule } from './features/sub-categories/sub-categories-routing.module';
import { CategoriesModule } from './features/categories/categories.module';
import { SuppliersModule } from './features/suppliers/suppliers.module';
import { SuppliersRoutingModule } from './features/suppliers/suppliers-routing.module';
import { OriginsModule } from './features/origins/origins.module';
import { OriginsRoutingModule } from './features/origins/origins-routing.module';
import { OrganizationsModule } from './features/organizations/organizations.module';
import { OrganizationsRoutingModule } from './features/organizations/organizations-routing.module';
import { SubOrganizationsModule } from './features/sub-organizations/sub-organizations.module';
import { SubOrganizationsRoutingModule } from './features/sub-organizations/sub-organizations-routing.module';
import { GovernoratesModule } from './features/governorates/governorates.module';
import { GovernoratesRoutingModule } from './features/governorates/governorates-routing.module';
import { CitiesModule } from './features/cities/cities.module';
import { CitiesRoutingModule } from './features/cities/cities-routing.module';
import { HospitalsModule } from './features/hospitals/hospitals.module';
import { HospitalsRoutingModule } from './features/hospitals/hospitals-routing.module';
import { MasterAssetsRoutingModule } from './features/master-assets/master-assets-routing.module';
import { MasterAssetsModule } from './features/master-assets/master-assets.module';
import { HospitalAssetsModule } from './features/hospital-assets/hospital-assets.module';
import { HospitalAssetsRoutingModule } from './features/hospital-assets/hospital-assets-routing.module';
import {  MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DeleteModule } from './shared/delete/delete.module';
import { ViewErrorComponent } from './shared/error/view-error/view-error.component';
import { ErrorService } from './shared/services/error.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ViewErrorComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    NgbModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    DynamicDialogModule,
    TooltipModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgApexchartsModule,
    MultiSelectModule,
    TableModule,
    CarouselModule,
    MenubarModule,
    TableModule,
    DialogModule,
    TooltipModule,
    NgApexchartsModule,
 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }, isolate: false
    }),


    AuthenticateModule,
    AuthenticateRoutingModule,

    LayoutModule,
    LayoutRoutingModule,

    DashboardModule,
    DashboardRoutingModule,

    CountassetsModule,
    CountassetsRoutingModule,

    ReportsModule,
    ReportsRoutingModule,


    OrganizationsModule,
    OrganizationsRoutingModule,

    SubOrganizationsModule,
    SubOrganizationsRoutingModule,

    GovernoratesModule,
    GovernoratesRoutingModule,

    CitiesModule,
    CitiesRoutingModule,

    HospitalsModule,
    HospitalsRoutingModule,

    MasterAssetsModule,
    MasterAssetsRoutingModule,

    HospitalAssetsModule,
    HospitalAssetsRoutingModule,


    BrandsModule,
    BrandsRoutingModule,

    OriginsRoutingModule,
    OriginsModule,

    SuppliersModule,
    SuppliersRoutingModule,


    ECRISModule,
    ECRISRoutingModule,

    SubCategoriesModule,
    SubCategoriesRoutingModule,

    CategoriesModule,
    CategoriesRoutingModule,
DeleteModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    DialogService, ConfirmationService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private errorService: ErrorService, private route: Router) {
    this.errorService.validateMacAddress().subscribe(validMac => {
      //this.route.navigate(['']);
    },
      error => {
        this.route.navigate(['/errors']);
      });
  }


}


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}