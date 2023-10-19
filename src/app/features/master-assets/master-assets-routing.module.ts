import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [

  { path: '', component: ListComponent, data: { breadcrumb: 'UPA.MasterAssets' } },
  { path: 'addmasterasset', component: CreateComponent, data: { breadcrumb: 'UPA.AddMasterAsset' } },
  { path: 'editmasterasset/:id', component: EditComponent, data: { breadcrumb: 'UPA.EditMasterAsset' } },
  { path: 'viewmasterasset/:id', component: ViewComponent, data: { breadcrumb: 'UPA.EditMasterAsset' } },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterAssetsRoutingModule { }
