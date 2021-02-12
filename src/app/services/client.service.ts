import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public db: AngularFirestore) { }

  getCurrentClient(client) {
    return this.db.collection('users').doc(client).valueChanges()
  }
  getClients() {
    return this.db.collection('users').snapshotChanges();
  }
  createClient(client: User) {
    return this.db.collection('users').add(client);
  }
  updateSexClient(userKey, value) {
    this.db.doc('users/' + userKey).update({ sex: value });
  }
  updateWeightClient(userKey, value) {
    this.db.doc('users/' + userKey).update({ weight: value });
  }
  updateHeightClient(userKey, value) {
    this.db.doc('users/' + userKey).update({ height: value });
  }
  updateDateOfBirthdayClient(userKey, value) {
    this.db.doc('users/' + userKey).update({ dateOfBirthday: value });
  }
  updateActivityClient(userKey, value) {
    this.db.doc('users/' + userKey).update({ activity: value });
  }
  deleteClient(userKey: string) {
    this.db.doc('users/' + userKey).delete();
  }
}
