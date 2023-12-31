import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubCategoriesRoutingModule } from './sub-categories-routing.module';
import { CreateSubCategoryComponent } from './create-sub-category/create-sub-category.component';
import { EditSubCategoryComponent } from './edit-sub-category/edit-sub-category.component';
import { DeletesubCategoryConfirmationComponent } from './deletesub-category-confirmation/deletesub-category-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TooltipModule } from 'primeng/tooltip';
import { MatDialogModule } from "@angular/material/dialog";
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    CreateSubCategoryComponent,
    EditSubCategoryComponent,
    DeletesubCategoryConfirmationComponent
  ],
  imports: [
    CommonModule,
    SubCategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatListModule,
    TranslateModule,
    DialogModule,
    ConfirmDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    TooltipModule,
    PaginatorModule
  ]
})
export class SubCategoriesModule { }
