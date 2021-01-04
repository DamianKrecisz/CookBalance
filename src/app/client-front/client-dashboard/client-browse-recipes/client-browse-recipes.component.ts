import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';
import { DatabaseService } from 'src/app/services/database.service';
import { ClientSingleRecipesComponent } from './client-single-recipes/client-single-recipes.component';

@Component({
  selector: 'app-client-browse-recipes',
  templateUrl: './client-browse-recipes.component.html',
  styleUrls: ['./client-browse-recipes.component.scss']
})
export class ClientBrowseRecipesComponent implements OnInit {
  @Input() item: Array<[]>;

  listOfData = [];

  constructor(
    public databaseService: DatabaseService,
    private modal: NzModalService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.databaseService.getAllRecipes().subscribe(data => {
      this.listOfData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      console.log(this.listOfData)
    })
  }
send(e){  
  const url = '/client-dashboard/(clientDashboardOutlet:client-single-recipe/'+e.id+')';
  console.log(url);
  console.log(e.id);
//[routerLink]='[{ outlets: { clientDashboardOutlet: ["client-single-recipe,item.id"] } }]'-->
//http://localhost:4200/client-dashboard/(clientDashboardOutlet:client-single-recipe/NaOjVwKZshx9IJ7khlLH)
  //this.router.navigate(['/client-dashboard/(clientDashboardOutlet:client-single-recipe/', e.id ]);
  //this.router.navigate([{ outlets: { clientDashboardOutlet: ["../../client-dashboard"] } }]);
  //this.router.navigate(['.'], {relativeTo:this.activeRoute.});
  //this.router.navigate(['./client-single-recipe', { relativeTo: this.activeRoute }]);
 this.router.navigateByUrl(url);



}
  createComponentModal(): void {
    this.modal.create({
      nzContent: ClientSingleRecipesComponent,
      
      
    });

    
  }

}
