import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';


@NgModule({
  declarations: [ProductFormComponent, NavComponent, ProductsListComponent, FormProductComponent, ProductEditComponent, CategoriesListComponent, FormCategoryComponent, CategoryEditComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
  ]
})
export class AdminModule { }
