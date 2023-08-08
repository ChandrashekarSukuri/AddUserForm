import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view.component';
import { MaterialModule } from '../material/material.module';
import { ProductsComponent } from './products/products.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterUsersDialogComponent } from './filter-users-dialog/filter-users-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    ViewComponent,
    ProductsComponent,
    ProductViewComponent,
    FilterUsersDialogComponent,
  ],
  imports: [
    CommonModule,
    ViewRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [ViewComponent],
})
export class ViewModule {}
