import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { CatgovernorateComponent } from './catgovernorate/catgovernorate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OrggovernorateComponent } from './orggovernorate/orggovernorate.component';
import { TotalassetsComponent } from './totalassets/totalassets.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GenericComponent } from './generic/generic.component';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { GovassetsComponent } from './govassets/govassets.component';
import { GovpopulationComponent } from './govpopulation/govpopulation.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { OrgcatassetsComponent } from './orgcatassets/orgcatassets.component';
import { GeosearchComponent } from './geosearch/geosearch.component';
import { CarouselModule } from 'primeng/carousel';
import { MatMenuModule } from '@angular/material/menu';
import { GovorgassetComponent } from './govorgasset/govorgasset.component';

import { GovPopulationNumberComponent } from './gov-population-number/gov-population-number.component';
import { AssetAgeGroupsComponent } from './asset-age-groups/asset-age-groups.component';
import { AssetLifeTimeComponent } from './asset-life-time/asset-life-time.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BadgeModule } from 'primeng/badge';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TooltipModule } from 'primeng/tooltip';
import { HospitalAssetsRoutingModule } from '../hospital-assets/hospital-assets-routing.module';


@NgModule({
  declarations: [
    CatgovernorateComponent,
    OrggovernorateComponent,
    TotalassetsComponent,
    GenericComponent,
    GovassetsComponent,
    GovpopulationComponent,
    OrgcatassetsComponent,
    GeosearchComponent,
    GovorgassetComponent,
 
    GovPopulationNumberComponent,
      AssetAgeGroupsComponent,
      AssetLifeTimeComponent
  ],
  imports: [
    ScrollingModule,
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    ReportsRoutingModule,
    TableModule,
    MultiSelectModule,
    MatSelectModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
    AutoCompleteModule,
    DialogModule,
    NgApexchartsModule,
    CarouselModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    DialogModule,
    MatTabsModule,
    MatInputModule,
    TranslateModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MultiSelectModule,
    MatListModule,
    MatSidenavModule,
    MatDatepickerModule,
  
    MatNativeDateModule,
    MatSelectModule,
    MatExpansionModule,
    ConfirmDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatSnackBarModule,
    TooltipModule,
    MatNativeDateModule,
    CheckboxModule,
    HospitalAssetsRoutingModule,
    PaginatorModule,
   
    MatButtonModule,

    BadgeModule,
    MatBadgeModule,
    MatListModule,
    MatButtonModule,
    CalendarModule,
    RadioButtonModule,
    MatProgressSpinnerModule,
   
    PaginatorModule,
  ]
})
export class ReportsModule { }
