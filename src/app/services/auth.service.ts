import { Injectable, NgZone } from '@angular/core';
import { User } from "../interfaces/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ClientService } from './client.service';
import { NzNotificationService } from 'ng-zorro-antd';

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
    public clientService: ClientService,
    private notification: NzNotificationService
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

  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.isLoggedIn = true;
        this.createNotification('success', 'Hello ' + result.user.email, 'Your last login was ' + result.user.metadata.lastSignInTime);
        this.ngZone.run(() => {
          this.router.navigate(['client-dashboard']);
        });
        // this.SetUserData(result.user);
      }).catch((error) => {
        this.isLoggedIn = false;
        this.createNotification('error', 'Login error', error.message);
      })
  }

  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result.user)
        this.SetUserData(result.user);
        this.isLoggedIn = true;
        this.ngZone.run(() => {
          this.router.navigate(['client-dashboard']);
        });
        this.createNotification('success', "You have successfully registered!", 'Hello ' + result.user.email);
      }).catch((error) => {
        this.createNotification('error', 'Register error', error.message)
      })
  }

  verifyPasswordAndDeleteUser(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.deleteAccount();
      }).catch((error) => {
        this.createNotification('error', "Error !", error.message);
      })
  }

  resetPassword(email) {
    this.afAuth.auth.sendPasswordResetEmail(email).then(
      (result) => {
        this.createNotification('success', "Success !", 'Your password has been reset');
      },
      error => {
        this.createNotification('error', 'Error !', error.message)
      }
    );

  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.isLoggedIn = true;
        this.SetUserData(result.user);
        this.createNotification('success', 'Hello ' + result.user.email, 'Your last login was ' + result.user.metadata.lastSignInTime);
        this.ngZone.run(() => {
          this.router.navigate(['client-dashboard']);
        });
      }).catch((error) => {
        this.createNotification('error', 'Error !', error.message)
      })
  }
  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }  
  deleteAccount(){
    var user = this.afAuth.auth.currentUser;
    console.log(user.uid)
    user.delete();
    this.clientService.deleteClient(user.uid)
    this.createNotification('success', "Success !", 'Your account has been successfully deleted');
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true,
        admin: false
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
      this.createNotification('success', 'Success!', 'Successfully logged out!')

    })
  }

  onlyForAdmin(user: User): boolean {
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

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(
      type,
      title,
      description
    );
  }

}
