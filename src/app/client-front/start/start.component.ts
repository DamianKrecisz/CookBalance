import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor(private databaseService: DatabaseService) { }
  shopListTemp;
  ngOnInit() {
    this.databaseService.getAllShopList().subscribe(data => {
    
      this.shopListTemp = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        }
      })
      console.log(this.shopListTemp)
    }
    )}

}
