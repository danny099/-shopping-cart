import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from './../../../core/models/category.model';

import { CategoriesService } from './../../../core/services/cateogories/categories.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  form: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.categoriesService.getCategory(this.id)
      .subscribe(category => {
        this.form.patchValue(category);
      });
    });
  }

  saveCategory(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const category = this.form.value;
      this.categoriesService.updateCategory(this.id, category)
      this.router.navigate(['./admin/categories']);
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

}
