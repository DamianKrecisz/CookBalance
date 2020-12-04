import { Component, OnInit } from '@angular/core';
import { FirebaseCrudService } from 'src/app/services/firebase-crud.service';
import { ItemData } from 'src/app/interfaces/product';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  totalOrders: number;
  totalClients: number;
  totalItems: number;

  constructor(private firebaseService: FirebaseCrudService,
  ) { }

  ngOnInit() {
    this.firebaseService.getItems().subscribe(data => {
      this.totalItems = data.length
    })
    this.firebaseService.getOrders().subscribe(data => {
      this.totalOrders = data.length
    })
    this.firebaseService.getClients().subscribe(data => {
      this.totalClients = data.length
    })

  }
}
