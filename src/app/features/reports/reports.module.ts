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
      AssetAgeGroupsComponent
  ],
  imports: [
    ScrollingModule,
    CommonModule,
    FormsModule,

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
    MatMenuModule
  ]
})
export class ReportsModule { }
