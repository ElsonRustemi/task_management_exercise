import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  signUpForm: any;

  // Test
  // isLoggedIn: boolean = false;

  constructor(private auth: AngularFireAuth, private fireService: AngularFirestore) { }

  async signUpUser(params: Signup) {
    // return await this.auth.createUserWithEmailAndPassword(params.email, params.password)

    try {
      const data = await this.auth.createUserWithEmailAndPassword(
        params.email,
        params.password
      );

      // Create a document in the 'users' collection with the user's UID
      await this.fireService.collection('users').doc(data?.user?.uid).set({
        fullname: params.fullname // assuming you have the bio in the Signup interface
      });

      return data.user;
    } catch (error) {
      // Handle errors if needed
      console.log(error);
      throw error;
    }
  }

  async login(params: Login) {
    return await this.auth.signInWithEmailAndPassword(params.email, params.password);
  }

  // async getProfile() {
  //   return await this.auth.currentUser
  // }

  // async resetPassword(email: string ) {
  //   return await this.auth.sendPasswordResetEmail(email);
  // }

  // async signOut() {
  //   return await this.auth.signOut();
  // }

  // signUpUser(params: Signup): Observable<any> {
  //   return from(this.auth.createUserWithEmailAndPassword(
  //     params.email, params.password
  //   ));
  // }

  // login(params: Login): Observable<any> {
  //   return from(this.auth.signInWithEmailAndPassword(
  //     params.email, params.password
  //   ));
  // }
}

type Signup = {
  email: string;
  password: string;
  fullname: string;
}

type Login = {
  email: string;
  password: string;
}
