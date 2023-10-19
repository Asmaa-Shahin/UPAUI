import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavService } from '../shared/services/side-nav.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { LayoutComponent } from './layout.component';
import { TopheaderComponent } from './topheader/topheader.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MenubarModule } from 'primeng/menubar';
import { ToolbarModule } from 'primeng/toolbar';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    SidebarComponent,
    TopheaderComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MenubarModule,
    ToolbarModule,
    FlexLayoutModule,
    TranslateModule,
    NgbModule
  ],
  exports: [
    SidebarComponent,
    LayoutComponent,
    TopheaderComponent,
    TranslateModule
  ],
  providers: [
    SideNavService
  ],
})
export class LayoutModule { }
