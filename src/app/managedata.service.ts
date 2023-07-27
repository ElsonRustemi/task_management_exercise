import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagedataService {

  // Body of URL to make request
  url: string = 'http://localhost:3000/users'

  constructor(private http: HttpClient) { }

  /**
   *
   * @returns List of all users on the db
   */
  getUsers(): Observable<any> {
    return this.http.get(this.url)
  }

  /**
   * Service to add new user
   * @param user
   * @returns
   */
  addUser(user: any): Observable<any> {
    return this.http.post(this.url, user);
  }

  /**
   *
   * @param i Index of user selected data
   * @param user Object of new user info
   * @returns New user info data
   */
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(this.url + '/' + id, user);
  }

  /**
   * Delete user
   * @param id
   * @returns
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }


}
