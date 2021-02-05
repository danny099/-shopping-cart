import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from './../../models/product.model';

import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  products: Observable<Product[]>;
  public productsCollection: AngularFirestoreCollection<Product>;
  public productDoc: AngularFirestoreDocument<Product>;


  constructor(
    public afs: AngularFirestore,
    private http: HttpClient
    ) {
      this.productsCollection = afs.collection<Product>('products');
      this.products = this.productsCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Product;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );

  }

  getAllProducts() {
    return this.products;
  }

  getProduct(id: string) {
    return this.afs.collection('products').doc(id).valueChanges()
    //return this.afs.collection('categories',ref => ref.where('id', '==', `${id}`)).valueChanges();
  }

  createProduct(product: Product) {
    console.log('new product');
    this.productsCollection.add(product);
  }

  updateProduct(id, protuct: Product) {
    this.productDoc = this.afs.doc(`products/${id}`);
    this.productDoc.update(protuct);
  }

  deleteProduct(product: Product) {
    this.productDoc = this.afs.doc(`products/${product.id}`);
    this.productDoc.delete();
  }
}
