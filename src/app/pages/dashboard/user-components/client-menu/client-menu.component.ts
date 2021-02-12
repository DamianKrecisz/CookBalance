import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.scss']
})
export class ClientMenuComponent implements OnInit {
  listOfRecipes = [];
  listOfIdRecipes = [];
  listOfTotalIngredients = [];
  daysTable = [];
  yy = [];

  validateForm!: FormGroup;
  validateFormAddRecipe!: FormGroup;

  isVisible = false;
  isVisibleOpenRecipesSelect = false;
  isOkLoading = false;
  deletedRecipe = false;

  activeMenuList: any;

  meal;
  mealTitle;
  mealID;
  day;
  idDay
  idMealInDay;
  userID;
  newListToSend

  week = [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela"
  ]

  constructor(
    private fb: FormBuilder,
    private databaseService: DatabaseService,
    public authService: AuthService,
    public db: AngularFirestore,
    private nzMessageService: NzMessageService
  ) { }

  cancel(): void {
  }

 

  ngOnInit(): void {

    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      qtyDays: [null, [Validators.required]],
      qtyMeals: [null, [Validators.required]]
    });

    this.validateFormAddRecipe = this.fb.group({
      selectToUpdate: [null, [Validators.required]]
    });

    this.databaseService.getAllMenu().subscribe(data => {
      this.activeMenuList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
    })

    this.databaseService.getAllRecipes().subscribe(data => {
      this.listOfRecipes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
    })
  }
  showTable=false;

  showMenu(index) {
    this.showTable=true
    this.daysTable = this.activeMenuList[index].days;
    this.mealTitle = this.activeMenuList[index].menuTitle;
    this.activeMenuList[index].days.forEach(element => {
      element.allMeals.meals.forEach(element => {
        if (element.mealID != '') {
          this.listOfIdRecipes.push(element.mealID);
        }
      });
    });
    let xx;

    this.listOfIdRecipes.forEach(element => {
      this.databaseService.getSingleRecipe(element).subscribe(data => {
        xx = data;
        xx.ingredients.forEach(el1 => {
          this.listOfTotalIngredients.push({
            ingredientID: el1.ingredient,
            ingredientQty: el1.qty,
            checked: false
          });
        });
      })
    });
    console.log(this.daysTable)
  }




  confirm(): void {

    var result = [];

    this.listOfTotalIngredients.forEach(function (a) {
      if (!this[a.ingredientID]) {
        this[a.ingredientID] = { ingredientID: a.ingredientID, ingredientQty: 0, checked:false,ingredientDetails:a.ingredientDetails };
        result.push(this[a.ingredientID]);
      }
      this[a.ingredientID].ingredientQty += a.ingredientQty;
    }, Object.create(null));



    this.nzMessageService.info('click OK !');
    this.newListToSend = {
      listTitle: this.mealTitle,
      userID: this.authService.userData.uid,
      itemList: result
    }
    this.databaseService.addNewList(this.newListToSend);
  }

  xy() {
    for (let i = 0; this.listOfTotalIngredients.length > i; i++) {
      this.databaseService.getSingleIngredient(this.listOfTotalIngredients[i].ingredientID).subscribe(data => {
        this.listOfTotalIngredients[i].ingredientDetails = data
      })
    }
    
  }
  handleOk(): void {
    this.isOkLoading = true;
    this.createMenu(
      this.validateForm.value.title,
      this.validateForm.value.qtyDays,
      this.validateForm.value.qtyMeals
    )
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleOpenRecipesSelect = false;

  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  createMenu(title, qtyDays, qtyMeals) {
    let dayss = [];
    let meals = [];
    for (let i = 0; i < qtyMeals; i++) {
      meals.push({
        mealTitle: '',
        mealID: '',
      })
    }
    for (let i = 0; i < qtyDays; i++) {
      dayss.push({
        day: this.week[i],
        allMeals: {
          meals
        }
      })
    }
    let menu = {
      userID: this.authService.userData.uid,
      menuTitle: title,
      days: dayss
    }
    this.databaseService.addNewMenu(menu);
  }

  openRecipesSelect(item, daysIndex, mealInDayIndex, editing) {

    this.idDay = daysIndex;
    this.idMealInDay = mealInDayIndex;

    this.day = item.day;
    this.mealID = this.daysTable[this.idDay].allMeals.meals[this.idMealInDay].mealID;
    this.mealTitle = this.daysTable[this.idDay].allMeals.meals[this.idMealInDay].mealID;
    if (this.mealID == '' || editing == 'editing') {
      this.isVisibleOpenRecipesSelect = true;
    }

  }


  updateRecipes() {

    this.mealID = this.validateFormAddRecipe.value.selectToUpdate;
    let xx = [];
    xx.push(this.activeMenuList[0])
    let titleMenu;
    this.databaseService.getSingleRecipe(this.mealID).subscribe(data => {
      titleMenu = data;
      xx[0].days[this.idDay].allMeals.meals[this.idMealInDay].mealTitle = titleMenu.title;
      xx[0].days[this.idDay].allMeals.meals[this.idMealInDay].mealID = this.mealID;
      this.databaseService.updateMenu(xx[0]);
    })



    this.validateFormAddRecipe.reset();
    this.daysTable = xx[0].days;

  }

  deleteMenu(daysIndex, mealInDayIndex) {

    this.idDay = daysIndex;
    this.idMealInDay = mealInDayIndex;

    let xy = [];
    xy.push(this.activeMenuList[0])
    xy[0].days[this.idDay].allMeals.meals[this.idMealInDay].mealID = '';
    xy[0].days[this.idDay].allMeals.meals[this.idMealInDay].mealTitle = '';

    this.daysTable = xy[0].days;
    this.databaseService.updateMenu(xy[0]);
    this.deletedRecipe = true;
    setTimeout(function () {
      this.deletedRecipe = false;
    }, 1500);

  }


}
