import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ingredientsInterface } from 'src/app/interfaces/ingredients';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin-ingredients',
  templateUrl: './admin-ingredients.component.html',
  styleUrls: ['./admin-ingredients.component.scss']
})
export class AdminIngredientsComponent implements OnInit {

  validateForm!: FormGroup;
  editCache: { [key: string]: { edit: boolean; data: ingredientsInterface } } = {};
  listOfAllIngredients = [];

  constructor(
    public databaseService: DatabaseService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.validateForm = this.formBuilder.group({
      product: [null, [Validators.required]],
      unit: [null, [Validators.required]]
    });

    this.databaseService.getAllIngredients().subscribe(data => {
      this.listOfAllIngredients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
      this.updateEditCache();
    })
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfAllIngredients.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfAllIngredients[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfAllIngredients.findIndex(item => item.id === id);
    Object.assign(this.listOfAllIngredients[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.databaseService.updateIngredient(this.editCache[id].data);
  }

  updateEditCache(): void {
    this.listOfAllIngredients.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  sendNewIngredient(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.databaseService.createIngredients(this.validateForm.value);
    this.validateForm.reset();
  }

  searchExistingIngredient(e): void {
    if (e == '') {
      this.databaseService.getAllIngredients().subscribe(data => {
        this.listOfAllIngredients = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Object
          }
        })

      })
    } else {
      this.listOfAllIngredients = this.listOfAllIngredients.filter(item => item.product.indexOf(e) !== -1);
    }
  }
}
