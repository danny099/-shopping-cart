import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Category } from './../../models/category.model';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories: Observable<Category[]>;
  public categoriesCollection: AngularFirestoreCollection<Category>;
  public categoryDoc: AngularFirestoreDocument<Category>;


  constructor(
    public afs: AngularFirestore,
    private http: HttpClient
    ) {
      this.categoriesCollection = afs.collection<Category>('categories');
      this.categories = this.categoriesCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Category;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );

  }

  getAllCategories() {
    return this.categories;
  }

  getCategory(id: string) {
    return this.afs.collection('categories').doc(id).valueChanges()
    //return this.afs.collection('categories',ref => ref.where('id', '==', `${id}`)).valueChanges();
  }

  createCategory(category: Category) {
    console.log('new category');
    this.categoriesCollection.add(category);
  }

  updateCategory(id, category: Category) {
    this.categoryDoc = this.afs.doc(`categories/${id}`);
    this.categoryDoc.update(category);
  }

  deleteCategory(category: Category) {
    this.categoryDoc = this.afs.doc(`categories/${category.id}`);
    this.categoryDoc.delete();
  }
}
