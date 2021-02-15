import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin-add-recipe',
  templateUrl: './admin-add-recipe.component.html',
  styleUrls: ['./admin-add-recipe.component.scss']
})
export class AdminAddRecipeComponent implements OnInit {


  validateForm!: FormGroup;
  listOfControlIngredient: Array<{ id: number; ingredient: string }> = [];
  listOfControlStep: Array<{ id: number; step: string }> = [];
  listOfControlQty: Array<{ id: number; qty: string }> = [];

  listOfIngredientsID: Array<any> = [];
  listOfStep: Array<any> = [];
  listOfQtyIngredient: Array<any> = [];
  listOfIngredientsToSend: Array<any> = [];
  listOfIngredients = [];
  showSuccessAlert = false;

  constructor(
    public databaseService: DatabaseService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      difficultLevel: [null, [Validators.required]],
      portions: [null, [Validators.required]],
      imgUrl: [null, [Validators.required]],
      url: [null, [Validators.required]],
      preparationTime: [null, [Validators.required]],
    });

    this.databaseService.getAllIngredients().subscribe(data => {
      this.listOfIngredients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
    })

    this.addFieldIngredient();
    this.addFieldStep();
  }

  addNewRecipe(): void {

    for (let [key, value] of Object.entries(this.validateForm.value)) {
      if (key.includes("ingredient")) {
        this.listOfIngredientsID.push(value);
      }
    }

    for (let [key, value] of Object.entries(this.validateForm.value)) {
      if (key.includes("step")) {
        this.listOfStep.push(value);
      }
    }
    for (let [key, value] of Object.entries(this.validateForm.value)) {
      if (key.includes("qty")) {
        this.listOfQtyIngredient.push(value);
      }
    }

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    for (let i = 0; i < this.listOfIngredientsID.length; i++) {
      let modelOfIngredient = {
        ingredient: this.listOfIngredientsID[i],
        qty: this.listOfQtyIngredient[i],
      }
      this.listOfIngredientsToSend.push(modelOfIngredient)
    }
    let modelToSend = {
      title: this.validateForm.value.title,
      difficultLevel: this.validateForm.value.difficultLevel,
      portions: this.validateForm.value.portions,
      imgUrl: this.validateForm.value.imgUrl,
      preparationTime: this.validateForm.value.preparationTime,
      url: this.validateForm.value.url,
      ingredients: this.listOfIngredientsToSend,
      steps: this.listOfStep
    }

    this.databaseService.createRecipe(modelToSend);
    this.showSuccessAlert = true;
    this.validateForm.reset();

    this.createNotification('success', 'Succes!', 'New recipe has been sent to the database')
  }

  addFieldIngredient(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControlIngredient.length > 0 ? this.listOfControlIngredient[this.listOfControlIngredient.length - 1].id + 1 : 0;
    const control = {
      id,
      ingredient: `ingredient-${id}`
    };
    const controlQty = {
      id,
      qty: `qty-${id}`
    };
    const index = this.listOfControlIngredient.push(control);
    this.listOfControlQty.push(controlQty);

    this.validateForm.addControl(this.listOfControlIngredient[index - 1].ingredient, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControlQty[index - 1].qty, new FormControl(null, Validators.required));

  }

  removeField(i: { id: number; ingredient: string }, e: MouseEvent): void {
    if (this.listOfControlIngredient.length > 1) {
      const index = this.listOfControlIngredient.indexOf(i);
      let qtyIndex = index;
      this.listOfControlIngredient.splice(index, 1);
      this.validateForm.removeControl(i.ingredient);
      this.validateForm.removeControl(this.listOfControlQty[qtyIndex].qty);
      this.listOfControlQty.splice(qtyIndex, 1);
    }
    this.createNotification('success', 'Succes!', 'Field has been removed successfully')
  }

  addFieldStep(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControlStep.length > 0 ? this.listOfControlStep[this.listOfControlStep.length - 1].id + 1 : 0;

    const controlX = {
      id,
      step: `step${id}`
    };
    const index = this.listOfControlStep.push(controlX);
    this.validateForm.addControl(this.listOfControlStep[index - 1].step, new FormControl(null, Validators.required));
  }

  removeFieldStep(i: { id: number; step: string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControlStep.length > 1) {
      const index = this.listOfControlStep.indexOf(i);
      this.listOfControlStep.splice(index, 1);
      this.validateForm.removeControl(i.step);
    }
    this.createNotification('success', 'Succes!', 'Field has been removed successfully')
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
  
}