import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private afAuth: AngularFireAuth, private fireService: AngularFirestore) { }

  // getUsers(): Observable<any> {
  //   return this.afAuth.authState;
  // }

    /**
   * Gets the list of all users
   * @returns
   */
    getUsers() {
      return this.fireService.collection('users').snapshotChanges();
    }


}
