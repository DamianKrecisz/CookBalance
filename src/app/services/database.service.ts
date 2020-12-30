import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ingredients} from '../interfaces/ingredients'
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public db: AngularFirestore) { }

  createIngredients(ingredients: ingredients){
    return this.db.collection('ingredients').add(ingredients);
  }

  getAllIngredients(){
    return this.db.collection('ingredients').snapshotChanges();
  }
}
