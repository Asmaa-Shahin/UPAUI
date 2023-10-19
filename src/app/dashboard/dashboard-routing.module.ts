import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartdashboardComponent } from './chartdashboard/chartdashboard.component';
import { DashpageComponent } from './dashpage/dashpage.component';
import { AuthGuard } from '../shared/services/guards/authGuard.guard';

const routes: Routes = [
  {
    path: '', component: DashpageComponent, data: { breadcrumb: 'UPA.Home' }, children: [

      { path: 'dashboard', canActivate:[AuthGuard],component: ChartdashboardComponent, data: { breadcrumb: 'UPA.DashBoard' } },
      { path: 'countingassets', canActivate:[AuthGuard],loadChildren: () => import('src/app/features/countassets/countassets.module').then(m => m.CountassetsModule) },
      { path: 'report',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/reports/reports-routing.module').then(m => m.ReportsRoutingModule) },
      { path: 'organizations',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/organizations/organizations.module').then(m => m.OrganizationsModule) },
      { path: 'governorates',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/governorates/governorates.module').then(m => m.GovernoratesModule) },
      { path: 'hospitals',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/hospitals/hospitals.module').then(m => m.HospitalsModule) },
      { path: 'masterassets',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/master-assets/master-assets.module').then(m => m.MasterAssetsModule) },
      { path: 'hospitalassets',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/hospital-assets/hospital-assets.module').then(m => m.HospitalAssetsModule) },
      { path: 'brands', canActivate:[AuthGuard],loadChildren: () => import('src/app/features/brands/brands.module').then(m => m.BrandsModule) },
      { path: 'categories',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/categories/categories.module').then(m => m.CategoriesModule) },
      { path: 'Subcategories',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/sub-categories/sub-categories.module').then(m => m.SubCategoriesModule) },
      { path: 'ecris',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/ecris/ecris.module').then(m => m.ECRISModule) },
      { path: 'suppliers',canActivate:[AuthGuard], loadChildren: () => import('src/app/features/suppliers/suppliers.module').then(m => m.SuppliersModule) },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
