import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { client } from '../interfaces/client';
import { order } from '../interfaces/order'
@Injectable({
  providedIn: 'root'
})
export class FirebaseCrudService {

  constructor(public db: AngularFirestore) { }

  getClients() {
    return this.db.collection('clients').snapshotChanges();
  }
  createClient(client: client) {
    return this.db.collection('policies').add(client);
  }
  updateClient(client: client) {
    this.db.doc('clients/' + client.id).update(client);
  }
  deleteClient(policyId: string) {
    this.db.doc('clients/' + policyId).delete();
  }

  getItems() {
    return this.db.collection('items').snapshotChanges();
  }
  updateItem(itemId, value) {
    return this.db.collection('items').doc(itemId).set(value);
  }
  deleteItem(itemId:string){
    this.db.doc('items/' + itemId).delete();

  }
  getOrders() {
    return this.db.collection('orders').snapshotChanges();
  }
  createOrder(order: order) {
    return this.db.collection('orders').add(order);
  }
  updateStatusOrder(itemId, value) {
    return this.db.collection('orders').doc(itemId).set(value);
  }
}

