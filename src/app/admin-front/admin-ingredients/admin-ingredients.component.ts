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

  constructor(
    public databaseService: DatabaseService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      product: [null, [Validators.required]],
      unit: [null, [Validators.required]]

    });
    this.databaseService.getAllIngredients().subscribe(data => {
      this.listOfData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ingredientsInterface;
      })
      this.updateEditCache();
    })
  }

  /*------------------------------------------*/

  editCache: { [key: string]: { edit: boolean; data: ingredientsInterface } } = {};
  listOfData: ingredientsInterface[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    this.databaseService.updateIngredient(this.editCache[id].data);
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  


  /*-------------------------------------------*/
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.databaseService.createIngredients(this.validateForm.value);
    this.validateForm.reset();
  }
  search(e): void {
    if (e == '') {
      this.databaseService.getAllIngredients().subscribe(data => {
        this.listOfData = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } ;
        })
  
      })
    } else {
      this.listOfData = this.listOfData.filter(
        item => item.product.indexOf(e) !== -1
      );

    }
  }
}
