import { Injectable } from '@angular/core';
import { User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }
  // start_date: "2023-06-16",
  // finish_date: "2023-06-17",
  // Array of Users
  userInfo: User[] = [
    {
      subject: "Mark Group 2 Exams",
      priority: "HIGH",
      start_date: "2023-06-16",
      finish_date: "2023-06-17",
      department: "Test1",
      assignedTo: "Test1",
      status: "Pending"
    },
    {
      subject: "Beat up students",
      priority: "HIGH",
      start_date: "2023-06-16",
      finish_date: "2023-06-16",
      department: "Test2",
      assignedTo: "Test2",
      status: "Pending"
    },
    {
      subject: "Replace the coffee machine - 2nd floor",
      priority: "MED",
      start_date: "2023-06-16",
      finish_date: "2023-06-16",
      department: "Test3",
      assignedTo: "Test3",
      status: "Pending"
    },
    {
      subject: "Shaji nga ropt studentet!",
      priority: "LOW",
      start_date: "2023-06-16",
      finish_date: "2023-06-16",
      department: "Test4",
      assignedTo: "Test4",
      status: "Pending"
    },
    {
      subject: "Test",
      priority: "HIGH",
      start_date: "2023-06-16",
      finish_date: "2023-06-17",
      department: "Test75",
      assignedTo: "Test75",
      status: "Pending"
    },
    {
      subject: "Beat up students",
      priority: "HIGH",
      start_date: "2023-06-16",
      finish_date: "2023-06-16",
      department: "Test2",
      assignedTo: "Test2",
      status: "Pending"
    },
    {
      subject: "Replace the coffee machine - 2nd floor",
      priority: "MED",
      start_date: "2023-06-16",
      finish_date: "2023-06-16",
      department: "Test3",
      assignedTo: "Test3",
      status: "Pending"
    },
    {
      subject: "Shaji nga ropt studentet!",
      priority: "LOW",
      start_date: "2023-06-16",
      finish_date: "2023-06-16",
      department: "Test4",
      assignedTo: "Test4",
      status: "Pending"
    },
  ]

  serviceAddTask(userTask: User) {
    this.userInfo.push(userTask);
  }

  /**
   * Delete 'Task'
   * @param i
   */
  serviceDeleteTask(i:number) {
    this.userInfo.splice(i, 1);
  }

  /**
   * Update 'Task'
   * @param i
   */
  serviceUpdateTask(i: number, newItem: User) {
    this.userInfo[i] = newItem;
  }

  /**
   * Change status to 'Completed'
   * @param i
   */
  serviceCompleteTask(i: number) {
    this.userInfo[i].status = "Completed";
  }

  /**
   * Change status to 'Undefined'
   * @param i
   */
  servisUncomplete(i: number) {
    this.userInfo[i].status = "Pending";
  }

}
