import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin-edit-recipes',
  templateUrl: './admin-edit-recipes.component.html',
  styleUrls: ['./admin-edit-recipes.component.scss']
})
export class AdminEditRecipesComponent implements OnInit {

  listOfAllRecipes: any;
  title;
  itemToEdit = {
    id: '',
    title: '',
    difficultLevel: '',
    portions: '',
    imgUrl: '',
    preparationTime: '',
    url: '',
    ingredients: '',
    steps: '',
  }
  stringToUpdate: any;
  numberToUpdate: number;
  selectToUpdate: any;
  actualItemEditing;
  actualItemEditingID;
  index: number;
  indexIngredient: number;
  showNumber;
  isVisible:boolean = false;
  listOfIngredients = [];
  numberField:boolean = true;
  showNumberField;
  showStringField;
  showDifficultLevelField;
  showIngredientField;
  difficultLevelToUpdate;
  newStep: string;
  addingNewStep:boolean = false;
  addingNewIngredient:boolean = false
  isVisibleEditing:boolean = false;

  constructor(
    public databaseService: DatabaseService,
  ) { }

  ngOnInit() {

    this.databaseService.getAllRecipes().subscribe(data => {
      this.listOfAllRecipes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
    })

    this.databaseService.getAllIngredients().subscribe(data => {
      this.listOfIngredients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
    })
    
  }

  startEdit(item) {
    this.isVisibleEditing = true;
    this.itemToEdit = {
      id: item.id,
      title: item.title,
      difficultLevel: item.difficultLevel,
      portions: item.portions,
      imgUrl: item.imgUrl,
      preparationTime: item.preparationTime,
      url: item.url,
      ingredients: item.ingredients,
      steps: item.steps,
    }
    this.actualItemEditingID = item.id;
  }

  editItem(item, value) {
    this.actualItemEditing = item;
    this.isVisible = true;
    if (typeof value === "number") {
      this.showNumberField = true;
      this.showStringField = false;
      this.showDifficultLevelField = false;
      this.showIngredientField = false;
    } else if (typeof value === "string") {
      this.showNumberField = false;
      this.showStringField = true;
      this.showDifficultLevelField = false;
      this.showIngredientField = false;
    }
    if (item == 'difficultLevel') {
      this.showDifficultLevelField = true;
      this.showNumberField = false;
      this.showStringField = false;
      this.showIngredientField = false;
    }
  }

  editIngredient(item, index) {
    this.actualItemEditing = item;
    this.isVisible = true;
    this.indexIngredient = index;
    if (typeof item === "number") {
      this.showNumberField = true;
      this.showStringField = false;
      this.showDifficultLevelField = false;
      this.showIngredientField = false
    } else if (typeof item === "string") {
      this.showNumberField = false;
      this.showStringField = false;
      this.showDifficultLevelField = false;
      this.showIngredientField = true;
    }
  }

  editSteps(item, index, value) {
    this.actualItemEditing = item;
    this.isVisible = true;
    this.index = index;
    if (typeof value[index] === "string") {
      this.showNumberField = false;
      this.showStringField = true;
    }
  }

  deleteSteps(index) {
    let tempArray = [];
    tempArray.push(this.itemToEdit);
    tempArray[0].steps.splice(index, 1);
    this.databaseService.updateRecipe(tempArray[0]);
  }

  deleteIngredient(index) {
    let tempArray = [];
    tempArray.push(this.itemToEdit);
    tempArray[0].ingredients.splice(index, 1);
    this.databaseService.updateRecipe(tempArray[0]);
  }
  addStep() {
    this.isVisible = true;
    this.showStringField = true;
    this.addingNewStep = true;
  }
  addIngredient() {
    this.isVisible = true;
    this.showNumberField = true;
    this.showIngredientField = true;
    this.addingNewIngredient = true;
  }
  addNewIngredient(newItem) {
    let tempArray = [];
    tempArray.push(this.itemToEdit);
    tempArray[0].ingredients.push(newItem);
    this.databaseService.updateRecipe(tempArray[0]);
    this.addingNewStep = false;
    this.showIngredientField = false;
    this.showNumberField = false;
  }

  addNewStep(newItem) {
    let tempArray = [];
    tempArray.push(this.itemToEdit);
    tempArray[0].steps.push(newItem);
    this.databaseService.updateRecipe(tempArray[0]);
    this.addingNewStep = false;
  }

  handleOk(): void {

    if (this.addingNewStep == true) {
      this.newStep = this.stringToUpdate;
      this.addNewStep(this.newStep);
    }

    if (this.addingNewIngredient == true) {
      let tempObject = {
        ingredient: this.selectToUpdate,
        qty: this.numberToUpdate
      }
      this.addNewIngredient(tempObject);
      this.showIngredientField = true;
      this.showNumberField = true;
    }

    for (let [key, value] of Object.entries(this.itemToEdit)) {

      if (key.includes(this.actualItemEditing)) {

        if (typeof value === "number") {
          this.itemToEdit[key] = this.numberToUpdate;
        } else if (typeof value === "string") {
          if (key == 'difficultLevel') {
            this.itemToEdit[key] = this.difficultLevelToUpdate;
          } else {
            this.itemToEdit[key] = this.stringToUpdate;
          }
        }
        this.databaseService.updateRecipe(this.itemToEdit);
      }
    }

    // Steps
    if (this.addingNewIngredient == false) {
      for (let [key, value] of Object.entries(this.itemToEdit.steps)) {
        if (value.includes(this.actualItemEditing)) {
          this.itemToEdit.steps[key] = this.stringToUpdate;
          this.databaseService.updateRecipe(this.itemToEdit);
        }
      }
    }
    // Ingredients
    if (typeof this.indexIngredient !== 'undefined') {
      for (let [key, value] of Object.entries(this.itemToEdit.ingredients[this.indexIngredient])) {
        if (value == this.actualItemEditing) {
          let tempListOfNewIngredient = [];
          tempListOfNewIngredient.push(this.itemToEdit);
          if (key == 'qty') {
            tempListOfNewIngredient[0].ingredients[this.indexIngredient].qty = this.numberToUpdate;

          } else if (key == 'ingredient') {
            tempListOfNewIngredient[0].ingredients[this.indexIngredient].ingredient = this.selectToUpdate;
          }
          this.databaseService.updateRecipe(tempListOfNewIngredient[0]);
        }
      }
    }
    this.stringToUpdate = undefined;
    this.numberToUpdate = undefined;
    this.selectToUpdate = undefined;
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleCancelShow(): void {
    this.isVisibleEditing = false;
  }

}
