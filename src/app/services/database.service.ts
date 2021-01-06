import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ingredientsInterface } from '../interfaces/ingredients'
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public db: AngularFirestore) { }

  /* Ingredients */
  createIngredients(ingredients: ingredientsInterface) {
    return this.db.collection('ingredients').add(ingredients);
  }
  getAllIngredients() {
    return this.db.collection('ingredients').snapshotChanges();
  }
  updateIngredient(ingredient: ingredientsInterface) {
    this.db.doc('ingredients/' + ingredient.id).update(ingredient);
  }

  /* Recipes */
  createRecipe(recipe) {
    return this.db.collection('recipes').add(recipe);
  }
  getAllRecipes() {
    return this.db.collection('recipes').snapshotChanges();
  }
  getSingleRecipe(recipeId) {
    return this.db.collection('recipes').doc(recipeId).valueChanges()
  }
  addFavoriteRecipe(recipeId) {
    return this.db.collection('favoriteRecipes').add(recipeId);
  }
}