import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
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
  tempTitle:string;
  validateForm!: FormGroup;
  validateFormAddRecipe!: FormGroup;

  isVisible = false;
  isVisibleOpenRecipesSelect = false;
  isOkLoading = false;
  deletedRecipe = false;
  showTable = false;

  activeMenuList: any;
  menusAreNotAvaliable:boolean = true;
  activeMenuListToDisplay=[];
  meal;
  mealTitle;
  mealID;
  day;
  idDay
  idMealInDay;
  userID;
  newListToSend
  indexMenu;
  menuID;
  listOfDaysInWeek = [
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
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      qtyDays: [null, [Validators.required]],
      qtyMeals: [null, [Validators.required]],
      qtyWeeks: [null, [Validators.required]]
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
      this.activeMenuListToDisplay=[];
      this.activeMenuList.forEach(element => {
        if(element.userID == this.authService.userData.uid){
          this.activeMenuListToDisplay.push(element);
        }
      });
      if(this.activeMenuListToDisplay.length != 0){
        this.menusAreNotAvaliable=false;
      }else{
        this.menusAreNotAvaliable=true;
      }
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
  backToPreviousPage(){
   this.showTable=false;
  }
  showMenu(index) {
    this.indexMenu=index;
    this.showTable = true;
    this.menuID = this.activeMenuListToDisplay[index].id;
    this.daysTable = this.activeMenuListToDisplay[index].days;
    this.mealTitle = this.activeMenuListToDisplay[index].menuTitle;
    this.tempTitle=this.activeMenuListToDisplay[index].menuTitle;
    this.activeMenuListToDisplay[index].days.forEach(element => {
      element.allMeals.forEach(element => {
        if (element.mealID != '') {
          this.listOfIdRecipes.push(element.mealID);
        }
      });
    });
    let tempObject;

    this.listOfIdRecipes.forEach(element => {
      this.databaseService.getSingleRecipe(element).subscribe(data => {
        tempObject = data;
        tempObject.ingredients.forEach(el1 => {
          this.listOfTotalIngredients.push({
            ingredientID: el1.ingredient,
            ingredientQty: el1.qty,
            checked: false
          });
        });
      })
    });
    console.log(this.activeMenuListToDisplay[index])

  }

  confirm(): void {

    var result = [];

    this.listOfTotalIngredients.forEach(function (a) {
      if (!this[a.ingredientID]) {
        this[a.ingredientID] = { ingredientID: a.ingredientID, ingredientQty: 0, checked: false, ingredientDetails: a.ingredientDetails };
        result.push(this[a.ingredientID]);
      }
      this[a.ingredientID].ingredientQty += a.ingredientQty;
    }, Object.create(null));

    this.newListToSend = {
      listTitle: this.mealTitle,
      userID: this.authService.userData.uid,
      itemList: result
    }
    if(this.newListToSend.listTitle == 'undefined' || this.newListToSend.itemList.length == 0){
      this.createNotification('error','Error!','Something went wrong while creating the shopping list - try again')
    }else{
      this.createNotification('success', 'Success !', 'New shoppping list is created. Check it on Shopping list tab')
      this.databaseService.addNewList(this.newListToSend);

    }
  }

  saveList() {
    for (let i = 0; this.listOfTotalIngredients.length > i; i++) {
      this.databaseService.getSingleIngredient(this.listOfTotalIngredients[i].ingredientID).subscribe(data => {
        this.listOfTotalIngredients[i].ingredientDetails = data
      })
    }

  }

  handleOk(): void {
    console.log(this.validateForm.value)
    if (this.validateForm.status == "VALID") {
      this.createMenu(
        this.validateForm.value.title,
        this.validateForm.value.qtyDays,
        this.validateForm.value.qtyWeeks,
        this.validateForm.value.qtyMeals
      );
      this.createNotification('success', 'Success !', 'New menu has been successfully added to the database');
      this.validateForm.reset();
    } else {
      this.createNotification('error', 'Error !', 'The form for adding a new menu is not valid')
    }

    this.isVisible = false;

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

  createMenu(title, qtyDays, qtyWeeks, qtyMeals) {
    let tempArrayDays = [];
    let tempArrayMeals = [];
    for (let i = 0; i < qtyMeals; i++) {
      tempArrayMeals.push({
        mealTitle: '',
        mealID: '',
      })
    }
    for (let x = 0; x < qtyWeeks; x++) {
      for (let i = 0; i < qtyDays; i++) {
       
        tempArrayDays.push({
          day: this.listOfDaysInWeek[i],
          allMeals: tempArrayMeals
        })
      }
    }

    let menuToUpdate = {
      userID: this.authService.userData.uid,
      menuTitle: title,
      days: tempArrayDays
    }
    this.databaseService.addNewMenu(menuToUpdate);
  }

  openRecipesSelect(item, daysIndex, mealInDayIndex, editing) {

    this.idDay = daysIndex;
    this.idMealInDay = mealInDayIndex;
    this.day = item.day;
    this.mealID = this.daysTable[this.idDay].allMeals[this.idMealInDay].mealID;
 
    if (this.mealID == '' || editing == 'editing') {
      this.isVisibleOpenRecipesSelect = true;
    }

  }

  updateRecipes() {

    this.mealID = this.validateFormAddRecipe.value.selectToUpdate;
    let tempArray = [];
    tempArray.push(this.activeMenuListToDisplay[this.indexMenu])
    let titleMenu;
    this.databaseService.getSingleRecipe(this.mealID).subscribe(data => {
      
      titleMenu = data;
      tempArray[0].days[this.idDay].allMeals[this.idMealInDay].mealTitle = titleMenu.title;
      tempArray[0].days[this.idDay].allMeals[this.idMealInDay].mealID = this.mealID;
      this.databaseService.updateMenu(tempArray[0]);
    })

    this.validateFormAddRecipe.reset();
    this.daysTable = tempArray[0].days;
    this.handleCancel();
  }
  deleteSingleMenu(){
    this.databaseService.deleteMenu(this.menuID);
    this.showTable=false;
    this.createNotification('success','Success !','Successfully deleted the menu')
  }
  deleteMenu(daysIndex, mealInDayIndex) {

    this.idDay = daysIndex;
    this.idMealInDay = mealInDayIndex;

    let tempArray = [];
    tempArray.push(this.activeMenuListToDisplay[0])
    tempArray[0].days[this.idDay].allMeals[this.idMealInDay].mealID = '';
    tempArray[0].days[this.idDay].allMeals[this.idMealInDay].mealTitle = '';

    this.daysTable = tempArray[0].days;
    this.databaseService.updateMenu(tempArray[0]);
    this.deletedRecipe = true;
    this.createNotification('success','Success !','Successfully deleted the menu')


  }
  createNotification(type: string, title: string, description: string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }
}
