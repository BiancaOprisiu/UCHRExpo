import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'
//import 'rxjs/add/operator/switchMap';
import { Admin } from '../../models/Admin';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument }
  from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { IfStmt } from '@angular/compiler';
//import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //admins: Observable<Admin[]>;
  admin: Admin;
  adminUserData: firebase.User;
  password: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore) {

  }

  loginAdmin(username: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(username, password)
      .then(userCredentials => {
        if (userCredentials) {
          this.router.navigate(['/admin-page']);
        }
      })
      .catch(err => {
        alert(err.message);
      });
  }

   //logout the current logged in user
   logout() {
    //localStorage.removeItem('user');
    //localStorage.removeItem('password');
    this.afAuth.auth.signOut().then(() => {
      this.router.navigateByUrl('/home');
    });
  }

}
