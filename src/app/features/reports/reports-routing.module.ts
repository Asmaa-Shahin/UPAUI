import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatgovernorateComponent } from './catgovernorate/catgovernorate.component';
import { OrggovernorateComponent } from './orggovernorate/orggovernorate.component';
import { TotalassetsComponent } from './totalassets/totalassets.component';
import { GenericComponent } from './generic/generic.component';
import { GovassetsComponent } from './govassets/govassets.component';
import { GovpopulationComponent } from './govpopulation/govpopulation.component';
import { OrgcatassetsComponent } from './orgcatassets/orgcatassets.component';
import { GeosearchComponent } from './geosearch/geosearch.component';
import { GovorgassetComponent } from './govorgasset/govorgasset.component';
import { GovPopulationNumberComponent } from './gov-population-number/gov-population-number.component';
import { AssetAgeGroupsComponent } from './asset-age-groups/asset-age-groups.component';
const routes: Routes = [
  { path: 'categorygovernorate', component: CatgovernorateComponent },
  { path: 'orggovernorate', component: OrggovernorateComponent },
  { path: 'totalsssets', component: TotalassetsComponent },
  { path: 'governorateassets', component: GovassetsComponent },
  { path: 'governoratepopulation', component: GovpopulationComponent },
  { path: 'orgcatassets', component: OrgcatassetsComponent },
  { path: 'generic', component: GenericComponent },
  { path: 'geo', component: GeosearchComponent },

  { path: 'govorgasset', component: GovorgassetComponent },
  { path:'govpopulationnumber', component: GovPopulationNumberComponent },
  { path:'assetagegroups', component: AssetAgeGroupsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
