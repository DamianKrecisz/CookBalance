import { Component, OnInit } from '@angular/core';
import { ItemData } from 'src/app/interfaces/product';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirebaseCrudService } from 'src/app/services/firebase-crud.service';
import { order } from '../../interfaces/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  isVisibleEdit:boolean = false;
  isVisibleAdd:boolean = false;

  isOkEditLoading:boolean = false;
  isOkAddLoading:boolean = false;

  client: string;

  now = new Date();
  productsCollecton: AngularFirestoreCollection<order>;
  model: order;
  listOfData: order[]=[];

  constructor(
    private afs: AngularFirestore,
    private firebaseService: FirebaseCrudService,
  ) {
    this.productsCollecton = afs.collection<order>('orders');

  }


  ngOnInit() {
    this.firebaseService.getOrders().subscribe(data => {
      this.listOfData = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as order
      })
    })
  }


  showModalAdd(): void {
    this.isVisibleAdd = true;
  }

  handleEditOk(): void {
    this.isOkEditLoading = true;
    setTimeout(() => {
      this.isVisibleEdit = false;
      this.isOkEditLoading = false;
    }, 500);
  }

  handleAddOk(): void {
    this.isOkAddLoading = true;
    setTimeout(() => {
      this.isVisibleAdd = false;
      this.isOkAddLoading = false;
    }, 500);
    this.firebaseService.createOrder(this.model);
  }

  handleEditCancel(): void {
    this.isVisibleEdit = false;
  }
  handleAddCancel(): void {
    this.isVisibleAdd = false;
  }

  getEmiter(order): void {

    this.model = {
      client: order.client,
      dateOfCreated: this.now,
      status: 'new',
      items: order
    }
    delete this.model.items['client'];
  }

  search(e): void {
    if (e == '') {
      this.firebaseService.getOrders().subscribe(data => {
        this.listOfData = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data()
          } as order
        })
      })
    } else {
      this.listOfData = this.listOfData.filter(
        item => item.client.indexOf(e) !== -1 || item.status.indexOf(e) !== -1
      );

    }
  }
}
