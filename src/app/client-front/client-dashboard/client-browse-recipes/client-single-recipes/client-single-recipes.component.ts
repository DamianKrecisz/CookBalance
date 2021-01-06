import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    public databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.recipeId = params.get('id');
      console.log(params.get('id'))
       this.databaseService.getSingleRecipe(params.get('id')).subscribe(c =>{
          console.log(c);
          this.recipe = c;
      })   
      });
  }

  backToAllRecipes(){
    const url="/client-dashboard/(clientDashboardOutlet:client-browse-recipes)"
    this.router.navigateByUrl(url);
  }

  addToFavorite(){
    console.log("UserID: "+this.authService.userData.uid);
    console.log("RecipeID: "+this.recipeId);
  }
}
