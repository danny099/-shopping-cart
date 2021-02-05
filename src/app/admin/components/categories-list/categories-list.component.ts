import { Component, OnInit } from '@angular/core';

import { CategoriesService } from './../../../core/services/cateogories/categories.service';
import { Category } from './../../../core/models/category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  categories = [];
  displayedColumns: string[] = ['categoria', 'actions'];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoriesService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(event, category: Category) {
    this.categoriesService.deleteCategory(category)
    this.fetchCategories();
  }
}
