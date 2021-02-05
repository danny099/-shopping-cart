import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';


import { ProductsService } from './../../../core/services/products/products.service';

import { CategoriesService } from './../../../core/services/cateogories/categories.service';
import { Category } from './../../../core/models/category.model';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  image$: Observable<any>;
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
        console.log(product)
      });
    });
    this.fetchCategories()
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

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
      this.router.navigate(['./admin/products']);
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoria_id: ['', [Validators.required]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }

}
