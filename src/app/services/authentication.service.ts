import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private auth: AngularFireAuth) { }

  async signUpUser(params: Signup) {
    return await this.auth.createUserWithEmailAndPassword(params.email, params.password);
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
}

type Login = {
  email: string;
  password: string;
}
