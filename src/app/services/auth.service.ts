import { Injectable, NgZone } from '@angular/core';
import { User } from "../interfaces/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; 
  isLoggedIn: boolean;
  name:any;
  constructor(
    public afs: AngularFirestore,  
    public afAuth: AngularFireAuth, 
    public router: Router,
    public ngZone: NgZone 
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.name=this.userData.name;
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLoggedIn=true;
        this.ngZone.run(() => {
          this.router.navigate(['client-dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        this.isLoggedIn=false;

        window.alert(error.message)
      })
  }


  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    })
  }
  user$ = this.afAuth.authState.pipe(
    switchMap(user => {
      if (user) {
        return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );
  
}
