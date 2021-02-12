import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin-add-recipe',
  templateUrl: './admin-add-recipe.component.html',
  styleUrls: ['./admin-add-recipe.component.scss']
})
export class AdminAddRecipeComponent implements OnInit {

 
  validateForm!: FormGroup;
  listOfControl: Array<{ id: number; ingredient: string}> = [];
  listOfControlStep: Array<{ id: number; step: string }> = [];
  listOfControlQty: Array<{ id: number; qty: string }> = [];

  a: Array<any> = [];
  b: Array<any> = [];
  c: Array<any> = [];
  d: Array<any> = [];
  listOfData: [] = [];
  listOfIngredients = [];
  selectedValue = null;
  showSuccessAlert=false;

  constructor(     
    public databaseService: DatabaseService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
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

    this.addField();
    this.addFieldStep();
  }

  isVisible = false;
  isOkLoading = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm(): void {
    
    for (let [key, value] of Object.entries(this.validateForm.value)) {
      if (key.includes("ingredient")) {
        this.a.push(value);
      }
    }
    
    for (let [key, value] of Object.entries(this.validateForm.value)) {
      if (key.includes("step")) {
        this.b.push(value);
      }
    }
    for (let [key, value] of Object.entries(this.validateForm.value)) {
      if (key.includes("qty")) {
        this.c.push(value);
      }
    }

    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    for( let i=0;i<this.a.length;i++){
      let ABC = {
        ingredient:this.a[i],
        qty:this.c[i],
      }
      this.d.push(ABC)
    }
    let model = {
      title: this.validateForm.value.title,
      difficultLevel: this.validateForm.value.difficultLevel,
      portions: this.validateForm.value.portions,
      imgUrl: this.validateForm.value.imgUrl,
      preparationTime: this.validateForm.value.preparationTime,
      url: this.validateForm.value.url,
      ingredients: this.d,
      steps: this.b
    }

    this.databaseService.createRecipe(model);
    this.showSuccessAlert=true;
    this.validateForm.reset();
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
      this.showSuccessAlert=false;
    }, 1500);
  }

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;
    const control = {
      id,
      ingredient: `ingredient-${id}`
    };
    const controlQty = {
      id,
      qty: `qty-${id}`
    };
    const index = this.listOfControl.push(control);
    this.listOfControlQty.push(controlQty);

    this.validateForm.addControl(this.listOfControl[index - 1].ingredient, new FormControl(null, Validators.required));
    this.validateForm.addControl(this.listOfControlQty[index - 1].qty, new FormControl(null, Validators.required));



  }

  removeField(i: { id: number; ingredient: string},e: MouseEvent): void {
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      let qtyIndex = index;
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.ingredient);
      this.validateForm.removeControl(this.listOfControlQty[qtyIndex].qty);
      this.listOfControlQty.splice(qtyIndex, 1);

    }

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
  }
}
