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

  listOfData = [];

  constructor(
    public databaseService: DatabaseService,
    private modal: NzModalService,
    private router: Router,
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

  send(e) {
    const url = '/client-dashboard/(clientDashboardOutlet:client-single-recipe/' + e.id + ')';
    this.router.navigateByUrl(url);
  }

}
