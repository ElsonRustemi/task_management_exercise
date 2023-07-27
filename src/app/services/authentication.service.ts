import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Test
  // isLoggedIn: boolean = false;

  constructor(private auth: AngularFireAuth) { }

  login(params: Login): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    ));
  }

  // Test
  // signup(params: SignUp): Observable<any> {
  //   return from(this.auth.createUserWithEmailAndPassword(
  //     params.email, params.password
  //   ));
  // }


}

// Test
// type SignUp = {
//   email: string;
//   password: string;
// }

type Login = {
  email: string;
  password: string;
}
