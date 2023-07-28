import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private afAuth: AngularFireAuth) { }

  getUsers(): Observable<any> {
    return this.afAuth.authState;
  }


}
