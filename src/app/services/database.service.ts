import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public db: AngularFirestore) { }

  getAllIngredients(){
    return this.db.collection('ingredients').snapshotChanges();
  }
}
