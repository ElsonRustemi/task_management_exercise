import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ManagedataService } from '../managedata.service';

import { User } from '../models/user';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserAuthService } from '../services/user-auth.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';


interface UserAuth {
  fullname: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['fullname', 'view', 'update', 'delete']

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

  test: any;

  // Material table datasource
  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


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

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.userAuth.getUsers().subscribe((user: any) => {
      
      this.dataSource = new MatTableDataSource(
        this.userAuthTest = user.map((data: any) => {
          const taskData = data.payload.doc.data();
          const id = data.payload.doc.id;
          taskData.id = id;
          const payload = taskData;
          this.test = payload
          console.log(payload);
          return payload
        })
      );

      // this.userAuthTest = user.map((data: any) => {
      //   const taskData = data.payload.doc.data();
      //   const id = data.payload.doc.id;
      //   taskData.id = id;
      //   const payload = taskData;
      //   this.test = payload
      //   console.log(payload);
      //   return payload
      // });


      
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
