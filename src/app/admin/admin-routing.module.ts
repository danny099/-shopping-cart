import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductFormComponent } from './components/product-form/product-form.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { FormProductComponent } from './components/form-product/form-product.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';

import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';




const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children : [
      {
        path: 'create',
        component: ProductFormComponent
      },
      {
        path: 'products',
        component: ProductsListComponent
      },
      {
        path: 'categories',
        component: CategoriesListComponent
      },
      {
        path: 'products/create',
        component: FormProductComponent
      },
      {
        path: 'categories/create',
        component: FormCategoryComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductEditComponent
      },
      {
        path: 'categories/edit/:id',
        component: CategoryEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
