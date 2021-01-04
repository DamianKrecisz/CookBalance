import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-client-single-recipes',
  templateUrl: './client-single-recipes.component.html',
  styleUrls: ['./client-single-recipes.component.scss']
})
export class ClientSingleRecipesComponent implements OnInit {

  recipe: any;

  constructor(
    public databaseService: DatabaseService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
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
}
