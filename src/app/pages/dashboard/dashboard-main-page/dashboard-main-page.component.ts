import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-dashboard-main-page',
  templateUrl: './dashboard-main-page.component.html',
  styleUrls: ['./dashboard-main-page.component.scss']
})
export class DashboardMainPageComponent implements OnInit {

  listAllIngredients;
  listAllRecipes;
  listAllMenu;
  listAllFavoriteRecipes;
  listAllShopList;
  listAllUsers;

  totalUsers;
  totalRecipes;
  totalIngredients;
  totalSavedMenus;
  totalSavedShopList;
  constructor(
    private databaseService: DatabaseService,
    private clientService: ClientService
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(data => {
      this.listAllUsers = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
      this.totalUsers = this.listAllUsers.length;
    })
    this.databaseService.getAllIngredients().subscribe(data => {
      this.listAllIngredients = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
      this.totalIngredients = this.listAllIngredients.length;


    })
    this.databaseService.getAllRecipes().subscribe(data => {
      this.listAllRecipes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
      this.totalRecipes = this.listAllRecipes.length;


    })
    this.databaseService.getAllMenu().subscribe(data => {
      this.listAllMenu = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
      this.totalSavedMenus = this.listAllMenu.length;


    })
   
    this.databaseService.getAllShopList().subscribe(data => {
      this.listAllShopList = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
      this.totalSavedShopList = this.listAllShopList.length;


    })

  }

}
