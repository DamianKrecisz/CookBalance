import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { recipeInterface } from 'src/app/interfaces/recipe'
@Component({
  selector: 'app-client-favorite-recipes',
  templateUrl: './client-favorite-recipes.component.html',
  styleUrls: ['./client-favorite-recipes.component.scss']
})
export class ClientFavoriteRecipesComponent implements OnInit {

  a: any = [];

  listOfFavoriteRecipes: any = [];

  constructor(
    public databaseService: DatabaseService,
    private router: Router,
    public authService: AuthService,

  ) { }

  ngOnInit(): void {
    //console.log("userID: "+JSON.stringify(this.authService.userData.uid));

    this.databaseService.getAllFavoriteRecipes().subscribe(data => {
      this.a = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })


      this.a.forEach(element => {
        if (element.userId == this.authService.userData.uid) {
          for (let i = 0; i < element.recipes.length; i++) {
            this.databaseService.getSingleRecipe(element.recipes[i]).subscribe(data => {
              var obj = Object.assign(data, { "id": element.recipes[i] });
              this.listOfFavoriteRecipes.push(obj);
              console.log(obj);
            });
          }
        }
      });

    })

  }

  send(e) {
    console.log(e.id);
    const url = '/client-dashboard/(clientDashboardOutlet:client-single-recipe/' + e.id + ')';
    this.router.navigateByUrl(url);
  }


}
