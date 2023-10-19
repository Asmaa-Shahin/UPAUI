import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountassetsRoutingModule } from './countassets-routing.module';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { CarouselModule } from 'primeng/carousel';
import { MultiSelectModule } from 'primeng/multiselect';

import { MatListModule } from '@angular/material/list';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteconfirmComponent } from './deleteconfirm/deleteconfirm.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    CreateComponent,
    ListComponent,
    EditComponent,
    DeleteconfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatSnackBarModule,
    MultiSelectModule,
    DialogModule,
    TooltipModule,
    CarouselModule,
    TableModule,
    TranslateModule,
    CountassetsRoutingModule
  ]
})
export class CountassetsModule { }
