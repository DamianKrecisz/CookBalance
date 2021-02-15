import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-client-single-recipes',
  templateUrl: './client-single-recipes.component.html',
  styleUrls: ['./client-single-recipes.component.scss']
})
export class ClientSingleRecipesComponent implements OnInit {

  recipe: any;
  recipeId: any;
  newItem: any[] = [];
  ingredients: any[] = [];

  listOfAllFavoriteRecipes: any;
  showAddToFavorite = false;
  showDeleteFromFavorite = false;

  constructor(
    public databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private notification: NzNotificationService

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id');
      this.databaseService.getSingleRecipe(params.get('id')).subscribe(c => {
        this.recipe = c;
        this.recipe.ingredients.forEach(element => {
          this.databaseService.getSingleIngredient(element.ingredient).subscribe(data => {
            this.ingredients.push(data);
          })

        });
      })
    });

    this.getUserFavoriteRecipes();

  }

  getUserFavoriteRecipes() {
    this.databaseService.getAllFavoriteRecipes().subscribe(data => {
      this.listOfAllFavoriteRecipes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })

      if (this.listOfAllFavoriteRecipes.length == 0) {
        this.showAddToFavorite = true;
        this.showDeleteFromFavorite = false;
      }

      this.listOfAllFavoriteRecipes.forEach(element => {

        if (element.userId == this.authService.userData.uid) {
          if ((element.recipes).indexOf(this.recipeId) > -1) {
            this.showAddToFavorite = false;
            this.showDeleteFromFavorite = true;
          } else {
            this.showAddToFavorite = true;
            this.showDeleteFromFavorite = false;
          }
        }
      });
    })
  }

  backToAllRecipes() {
    const url = "/client-dashboard/(clientDashboardOutlet:client-browse-recipes)"
    this.router.navigateByUrl(url);
  }

  addToFavorite() {
    this.databaseService.getAllFavoriteRecipes().subscribe(data => {
      this.listOfAllFavoriteRecipes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as Object
        }
      })
    })

    if (this.listOfAllFavoriteRecipes.length == 0) {


      let tempObject = {
        userId: this.authService.userData.uid,
        recipes: []
      }

      tempObject.recipes.push(this.recipeId)
      this.createNotification('success', 'Success!', 'Item has been successfully added to your favorites')

      this.databaseService.addFavoriteRecipe(tempObject);
      this.showAddToFavorite = false;
      this.showDeleteFromFavorite = true;
    }

    this.listOfAllFavoriteRecipes.forEach(element => {

      if (element.userId == this.authService.userData.uid) {
        if (((element.recipes).indexOf(this.recipeId) > -1) == false) {
          element.recipes.push(this.recipeId);
          console.log(element)
          this.databaseService.updateFavoriteRecipe(element);
          this.createNotification('success', 'Success!', 'Item has been successfully added to your favorites')
          this.showAddToFavorite = false;
          this.showDeleteFromFavorite = true;
        }
      }
    });
  }

  deleteFromFavorite() {

    this.listOfAllFavoriteRecipes.forEach(el => {
      if (el.userId == this.authService.userData.uid) {
        el.recipes.forEach((element, index) => {

          if (element == this.recipeId) {
            el.recipes.splice(index, 1);
            this.databaseService.updateFavoriteRecipe(el);
            this.showAddToFavorite = true;
            this.showDeleteFromFavorite = false;

          }
        });
      }
    });
    this.createNotification('success', 'Success!', 'Item has been successfully removed from favorites')
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

}
