import { Component, OnInit } from '@angular/core';
import { ManagedataService } from '../managedata.service';

import { User } from '../models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthService } from '../services/user-auth.service';


interface UserAuth {
  // displayName: string;
  email: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: User[];
  userForm!: FormGroup;

  updateUserData!: any;
  currentIndex!: number;
  // viewUserData!: any;

  // Boolean to toggle between inputs inside modal
  addUser!: boolean;
  viewUsers!: boolean;
  updateUsers!: boolean;

  userFullname!: string;

  userAuthTest: UserAuth[] = [];


  constructor(
    private managmentDataService: ManagedataService,
    private fb: FormBuilder,
    private userAuth: UserAuthService) {
    this.userForm = this.fb.group({
      fullname: [''],
      email: [''],
      fieldOfStudy: [''],
      year: ['']
    })
  }

  ngOnInit(): void {
    // this.getUsers();
    this.userAuth.getUsers().subscribe((user: any) => {
      console.log(user);

      if (user) {
        const userData: UserAuth = {
          // displayName: user.displayName,
          email: user.email
          // Add other properties if needed
        };
        this.userAuthTest.push(userData);
        console.log(this.userAuthTest);

      }
    });
  }


  /**
   * Get all user data
   */
  getUsers() {
    this.managmentDataService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  /**
   * Adds new user
   * @param user
   */
  addNewUser(user: any) {
    this.managmentDataService.addUser(user).subscribe(data => {
      console.log("This is the data ", data);
    })
    this.getUsers();
  }

  /**
   * Get current user information
   * @param user
   */
  viewUserData(user: any) {
    console.log(user);

    this.userForm.setValue({
      fullname: user.fullname,
      email: user.email,
      fieldOfStudy: user.fieldOfStudy,
      year: user.year
    })

  }

  /**
   * Gets user selected information
   * @param user
   * @param i
   */
  updateUserRecord(user: any, i: number) {
    this.userForm.setValue({
      fullname: user.fullname,
      email: user.email,
      fieldOfStudy: user.fieldOfStudy,
      year: user.year
    })
    this.updateUserData = user;
    this.currentIndex = i;
  }

  /**
   * Updates the selected user record
   */
  updateDataUser() {
    let currentId = this.currentIndex + 1;
    this.updateUserData = this.userForm.value;
    this.managmentDataService.updateUser(currentId, this.updateUserData).subscribe(data => {
      console.log(data);
    })
    this.getUsers();
  }

  /**
   * Gets index of current user selected and opens modal
   * @param i
   */
  deleteUserModal(i: number, user: any) {
    this.userFullname = user;
    this.currentIndex = i + 1;
  }

  /**
   * Delets user selected
   */
  deleteUser() {
    this.managmentDataService.deleteUser(this.currentIndex).subscribe(data => {
      console.log(data);
    })
    this.getUsers();
  }

}
