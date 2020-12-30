import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ingredients } from 'src/app/interfaces/ingredients';
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
        } ;
      })
      console.log(this.listOfData)
    })
  }
  i = 0;
  editId: string | null = null;
  listOfData = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.databaseService.createIngredients(this.validateForm.value);
    this.validateForm.reset();
  }
}
