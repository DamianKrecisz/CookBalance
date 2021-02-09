import { Injectable, NgZone } from '@angular/core';
import { User } from "../interfaces/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  isLoggedIn: boolean;
  name: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public clientService: ClientService
  ) {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.name = this.userData.name;
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLoggedIn = true;
        this.ngZone.run(() => {
          this.router.navigate(['client-dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        this.isLoggedIn = false;

        console.log(error.message)
      })
  }

  // Register
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.isLoggedIn = true;
        this.ngZone.run(() => {
          this.router.navigate(['client-dashboard']);
        });
      }).catch((error) => {
        console.log(error.message)
      })
  }

  verifyPassword(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        var user = this.afAuth.auth.currentUser;
        user.delete();
        localStorage.removeItem('user');
        this.router.navigate(['/']);
      }).catch((error) => {
        console.log(error.message)
      })
  }

  resetPassword(email) {
    this.afAuth.auth.sendPasswordResetEmail(email).then(
      () => {
        console.log("success")
      },
      err => {
        console.log(err);
      }
    );

  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        user:true,
        admin:false
      }
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
 
  /* Auth roles */
  onlyForAdmin(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  canRead(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'user']
    return this.checkAuthorization(user, allowed)
  }

  canDelete(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
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


  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }
}
