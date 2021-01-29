import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  a: any;
  b: any;
  showAddToFavorite = false;
  showDeleteFromFavorite = false;

  showAddToFavoriteAlert = false;
  showDeleteFromFavoriteAlert = false;
  ingredients:any=[];
  constructor(
    public databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,

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

    this.test();

  }

  test() {
    this.databaseService.getAllFavoriteRecipes().subscribe(data => {
      this.a = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      this.a.forEach(element => {

        if (element.userId == this.authService.userData.uid) {
          if ((element.recipes).indexOf(this.recipeId) > -1) {

            this.showAddToFavorite = false;
            this.showDeleteFromFavorite = true;


          } else {

            this.showAddToFavorite = true;
            this.showDeleteFromFavorite = false;

          }
        } else{
          
        }
      });
    })

    this.databaseService.getAllFavoriteRecipes().subscribe(data => {
      this.b = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      this.b.forEach(element => {

        if (element.userId == this.authService.userData.uid && element.recipes != this.recipeId) {
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
      this.a = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    })


    this.a.forEach(element => {

      if (element.userId == this.authService.userData.uid) {
        if ((element.recipes).indexOf(this.recipeId) > -1) {
          
        } else {
          

          element.recipes.push(this.recipeId);
          this.databaseService.updateFavoriteRecipe(element);

          this.showAddToFavorite = false;
          this.showDeleteFromFavorite = true;

          this.showAddToFavoriteAlert = true;

          setTimeout(() => {
            this.showAddToFavoriteAlert = false;
          }, 1000);

        }
      }
    });
  }

  deleteFromFavorite() {
    this.databaseService.getAllFavoriteRecipes().subscribe(data => {
      this.b = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
    })
    this.b.forEach(element => {

      if (element.userId == this.authService.userData.uid) {
        if ((element.recipes).indexOf(this.recipeId) > -1) {
          element.recipes.shift(this.recipeId);
          this.databaseService.updateFavoriteRecipe(element);

          this.showAddToFavorite = true;
          this.showDeleteFromFavorite = false;

          this.showDeleteFromFavoriteAlert = true;

          setTimeout(() => {
            this.showDeleteFromFavoriteAlert = false;
          }, 1000);
        } else {
         

        }
      }
    });
  }


}
