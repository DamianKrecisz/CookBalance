import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
@Component({
  selector: 'app-client-favorite-recipes',
  templateUrl: './client-favorite-recipes.component.html',
  styleUrls: ['./client-favorite-recipes.component.scss']
})
export class ClientFavoriteRecipesComponent implements OnInit {

  listOfAllFavoriteRecipes: any = [];

  listOfUserFavoriteRecipes: any = [];

  constructor(
    public databaseService: DatabaseService,
    private router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.databaseService.getAllFavoriteRecipes().subscribe(data => {
      this.listOfAllFavoriteRecipes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })


      this.listOfAllFavoriteRecipes.forEach(element => {
        if (element.userId == this.authService.userData.uid) {
          for (let i = 0; i < element.recipes.length; i++) {
            this.databaseService.getSingleRecipe(element.recipes[i]).subscribe(data => {
              var obj = Object.assign(data, { "id": element.recipes[i] });
              this.listOfUserFavoriteRecipes.push(obj);
            });
          }
        }
      });

    })

  }

  openRecipe(e) {
    const url = '/client-dashboard/(clientDashboardOutlet:client-single-recipe/' + e.id + ')';
    this.router.navigateByUrl(url);
  }

}
