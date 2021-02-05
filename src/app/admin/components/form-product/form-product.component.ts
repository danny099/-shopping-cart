import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';


import { ProductsService } from './../../../core/services/products/products.service';

import { CategoriesService } from './../../../core/services/cateogories/categories.service';
import { Category } from './../../../core/models/category.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.fetchCategories();

  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product);
      this.router.navigate(['./admin/products']);
    }
  }

  fetchCategories() {
    this.categoriesService.getAllCategories()
    .subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    });
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = file.name;
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.form.get('image').setValue(url);
        });
      })
    )
    .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoria_id: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

}
