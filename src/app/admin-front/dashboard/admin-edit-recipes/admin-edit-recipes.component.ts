import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin-edit-recipes',
  templateUrl: './admin-edit-recipes.component.html',
  styleUrls: ['./admin-edit-recipes.component.scss']
})
export class AdminEditRecipesComponent implements OnInit {

  listOfData: any;

  constructor(
    public databaseService: DatabaseService,
  ) { }

  ngOnInit() {
    this.databaseService.getAllRecipes().subscribe(data => {
      this.listOfData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    })
  }

  startEdit(item){
    console.log(item);
  }

}
