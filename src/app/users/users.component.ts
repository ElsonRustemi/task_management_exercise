import { Component, OnInit } from '@angular/core';
import { ManagedataService } from '../managedata.service';

import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: User[];

  constructor(private managmentDataService: ManagedataService) { }

  ngOnInit(): void {
      this.getUsers();
  }


  getUsers() {
    this.managmentDataService.getUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

}
