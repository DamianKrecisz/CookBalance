import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  
  shopListTemp;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    
    this.databaseService.getAllShopList().subscribe(data => {
      this.shopListTemp = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as object
        }
      })
    })

  }

}
