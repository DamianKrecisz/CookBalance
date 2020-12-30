import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../../services/database.service'

@Component({
  selector: 'app-client-favorite-recipes',
  templateUrl: './client-favorite-recipes.component.html',
  styleUrls: ['./client-favorite-recipes.component.scss']
})
export class ClientFavoriteRecipesComponent implements OnInit {

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
  

  constructor(     
    public databaseService: DatabaseService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      difficultLevel: [null, [Validators.required]],
      portions: [null, [Validators.required]],
      //ingredients: [null, [Validators.required]],
      //steps: [null, [Validators.required]],
      url: [null, [Validators.required]], 
    });

    
    this.databaseService.getAllIngredients().subscribe(data => {
      this.listOfIngredients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
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
        qty:this.c[i]
      }
      this.d.push(ABC)
    }
    let model = {
      title: this.validateForm.value.title,
      difficultLevel: this.validateForm.value.difficultLevel,
      portions: this.validateForm.value.portions,
      url: this.validateForm.value.url,
      ingredients: this.d,
      steps: this.b,
      //qty: this.c
    }

    console.log(model);
   
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 500);
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

  removeField(i: { id: number; ingredient: string}, e: MouseEvent): void {
    e.preventDefault();
    if (this.listOfControl.length > 1) {
      const index = this.listOfControl.indexOf(i);
      this.listOfControl.splice(index, 1);
      this.validateForm.removeControl(i.ingredient);
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

  /////////////////////////////////////////////////////////////////////

 

}
