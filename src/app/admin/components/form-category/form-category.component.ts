import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';


import { CategoriesService } from './../../../core/services/cateogories/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss']
})
export class FormCategoryComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  saveCategory(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const category = this.form.value;
      category.id
      this.categoriesService.createCategory(category);
      this.router.navigate(['./admin/categories']);
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      category: ['', [Validators.required]],
    });
  }

}
