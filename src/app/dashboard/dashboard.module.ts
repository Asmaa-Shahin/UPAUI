import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ChartdashboardComponent } from './chartdashboard/chartdashboard.component';
import { DashpageComponent } from './dashpage/dashpage.component';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    ChartdashboardComponent,
    DashpageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    LayoutModule,
    TranslateModule,
    NgApexchartsModule,
    NgMultiSelectDropDownModule
  ],
  exports: [DashpageComponent, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule { }
