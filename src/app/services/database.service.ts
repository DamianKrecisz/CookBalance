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
  getSingleIngredient(ingredientId) {
    return this.db.collection('ingredients').doc(ingredientId).valueChanges();
  }
  updateIngredient(ingredient: ingredientsInterface) {
    this.db.doc('ingredients/' + ingredient.id).update(ingredient);
  }
  deleteIngredient(ingredientId){
    return this.db.collection('ingredients').doc(ingredientId).delete();
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
  updateRecipe(recipe) {
    this.db.doc('recipes/' + recipe.id).update(recipe);
  }
  deleteRecipe(recipeId) {
    return this.db.collection('recipes').doc(recipeId).delete()
  }

  /* Favorite recipes */
  addFavoriteRecipe(recipe) {
    return this.db.collection('favoriteRecipes').add(recipe);
  }
  getAllFavoriteRecipes() {
    return this.db.collection('favoriteRecipes').snapshotChanges();
  }
  updateFavoriteRecipe(recipe) {
    this.db.doc('favoriteRecipes/' + recipe.id).update(recipe);
  }

  /* Add new menu */
  addNewMenu(menu) {
    return this.db.collection('allMenu').add(menu);
  }
  getAllMenu() {
    return this.db.collection('allMenu').snapshotChanges();
  }
  updateMenu(menu) {
    this.db.doc('allMenu/' + menu.id).update(menu);
  }
  deleteMenu(menuId) {
    return this.db.collection('allMenu').doc(menuId).delete()
  }
  
  /* Shop lists */
  addNewList(list) {
    return this.db.collection('shopList').add(list);
  }
  getAllShopList() {
    return this.db.collection('shopList').snapshotChanges();
  }
  deleteShopList(list) {
    return this.db.collection("shopList").doc(list).delete();
  }
  updateList(list) {
    this.db.doc('shopList/' + list.id).update(list);
  }

  /*Activity*/
  addNewActivities(listActivities) {
    return this.db.collection('activityDetails').add(listActivities);
  }
  getAllActivities() {
    return this.db.collection('activityDetails').snapshotChanges();
  }
}