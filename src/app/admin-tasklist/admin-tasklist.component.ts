import { Component, OnInit } from '@angular/core';
import { User } from '../user.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TaskListService } from '../services/task-list.service';
import { AuthenticationService } from '../services/authentication.service';
import { UserAuthService } from '../services/user-auth.service';

interface UserAuth {
  fullname: string;
}

@Component({
  selector: 'app-admin-tasklist',
  templateUrl: './admin-tasklist.component.html',
  styleUrls: ['./admin-tasklist.component.css']
})
export class AdminTasklistComponent implements OnInit {

  // Boolean to toggle between styles and statuses
  completedTask?: boolean = true;
  unCheck?: boolean;
  addTask?: boolean = false;

  // FormGroup used to update values
  taskForm: FormGroup = this.fb.group({
    id: [''],
    subject: [''],
    priority: [''],
    start_date: [''],
    finish_date: [''],
    department: [''],
    assignedTo: [''],
    status: ['']
  });

  // Starding date variables
  yearStart?: number;
  monthStart?: number;
  dateStart?:number;

  // Ending date variables
  yearFinish?: number;
  monthFinish?: number;
  dateFinish?:number;

  //
  // updateTaskForm!: object;

  // Modal variables
  model?: NgbDateStruct;
  model1?: NgbDateStruct;

  // Arrays with values used on dropdown
  options: string[] = [];
  statuses: string[] = [];
  assignedTo: string[] = [];
  departments: string[] = [];


  taskIndex!: number;

  // Var that is populated for displaying the data in the table
  userDataArray!: User[];

  //
  paginationIndex!: number;

  userAuthTest: UserAuth[] = [];
  userFullname: any;

  constructor(
    private readonly calendar: NgbDatepickerModule,
    private fb: FormBuilder, public formatter: NgbDateParserFormatter,
    private taskList: TaskListService, private userAuth: UserAuthService) {



    this.options = [
      "HIGH",
      "MED",
      "LOW"
    ]

    this.statuses = [
      'Pending',
      'Completed',
      'Ongoing',
      'Overdue'
    ]





    this.departments = [
      'Finance',
      'IT',
      'Software Development',
      'Marketing',
      'Data Management'
    ]
  }

  /**
   * HOOK onInit
   */
  ngOnInit() {
    this.getTasks();
    this.getUsers();
  }

  /**
   * Get Tasks
   */
  getTasks() {
    this.taskList.getTasks().subscribe((tasks: any) => {
      this.userDataArray = tasks.map((data: any) => {
        const taskData = data.payload.doc.data();
        const id = data.payload.doc.id;
        taskData.id = id;
        // const payload = {id, ...taskData}
        const payload = taskData;
        console.log(payload);
        return payload
      });
    });
  }

  /**
   *
   */
  getUsers() {
    this.userAuth.getUsers().subscribe((user: any) => {
      this.userAuthTest = user.map((data: any) => {
        const userData = data.payload.doc.data();
        // console.log(userData.fullname);
        this.userFullname = userData.fullname;
        const id = data.payload.doc.id;
        userData.id = id;
        this.assignedTo.push(this.userFullname);
        const payload = userData;
        console.log(payload);
        return payload
      });
    });
  }

  /**
   * Adds new task and updates the table
   */
  addNewTask() {
    let updateTaskForm = this.taskForm.value;

    let start_date1 = updateTaskForm.start_date;
    let finish_date1 = updateTaskForm.finish_date;


    let start_date = start_date1.year + '-' + start_date1.month + '-' + start_date1.day;
    let finish_date = finish_date1.year + '-' + finish_date1.month + '-' + finish_date1.day;

    let updateTaskFormFinal = {
      subject: updateTaskForm.subject,
      priority: updateTaskForm.priority,
      start_date: start_date,
      finish_date: finish_date,
      department: updateTaskForm.department,
      assignedTo: updateTaskForm.assignedTo,
      status: updateTaskForm.status
    }

    this.taskList.createTask(updateTaskFormFinal).then(task => { })
    this.taskForm.reset();
  }


  /**
   * Deletes specific row on click
   * @param i
   */
  deleteTask(id: string) {
    this.taskList.deleteTask(id);
  }

  // Need to adapt to new solution beacuse it gets only the first row
  /**
   * Sets status to 'Completed'
   * @param i
   */
  completeTask(userdata: User) {
    console.log(userdata);
    let updateTaskForm = userdata;

    let updateTaskFormFinal = {
      id: updateTaskForm.id,
      subject: updateTaskForm.subject,
      priority: updateTaskForm.priority,
      start_date: userdata.start_date,
      finish_date: userdata.finish_date,
      department: updateTaskForm.department,
      assignedTo: updateTaskForm.assignedTo,
      status: 'Completed'
    }

    this.taskList.updateTask(updateTaskFormFinal).then((task: any) => {
      console.log(task);
    })
  }

  // Need to adapt to new solution beacuse it gets only the first row
  /**
   * Sets status to 'Undefined'
   * @param i
   */
  removeCompletionOfStatus(userdata:User) {
    let updateTaskForm = userdata;
    console.log(updateTaskForm);


    let updateTaskFormFinal = {
      id: updateTaskForm.id,
      subject: updateTaskForm.subject,
      priority: updateTaskForm.priority,
      start_date: userdata.start_date,
      finish_date: userdata.finish_date,
      department: updateTaskForm.department,
      assignedTo: updateTaskForm.assignedTo,
      status: 'Pending'
    }

    this.taskList.updateTask(updateTaskFormFinal).then((task: any) => {
      console.log(task);
    })
  }

  /**
   * Applies style to selected row
   * @param i
   * @returns
   */
  returnData(i: number): any {

    if (this.unCheck) {
      return this.userDataArray[i]?.status === 'Completed' ? '#7AA874' :
        this.userDataArray[i]?.priority === 'In Progress' ? '#F5F0BB' :
          this.userDataArray[i]?.priority === 'Pending' ? '#7C96AB' :
            this.userDataArray[i]?.priority === 'Over Deadline' ? '#E06469' : '';
    } else {
      return '';
    }
  }

  /**
   * Responsible for coloring the 'Priority' coulmn
   * @param i
   * @returns
   */
  returnPriorityData(i: number) {
    return this.userDataArray[i]?.priority === 'HIGH' ? '#E76161' :
      this.userDataArray[i]?.priority === 'MED' ? '#F9D949' :
        this.userDataArray[i]?.priority === 'LOW' ? '#8BACAA' : ''
  }

  /**
   * Responsible for filling the inputs on modal
   * and for giving values to taskForm for update function
   * @param userdata
   */
  getUserData(userdata: User) {

    const first_start_date = new Date(userdata.start_date);
    const start_date = new DatePipe('en-US').transform(first_start_date, 'yyyy-MM-dd');

    const yearStart = first_start_date.getFullYear();
    const monthStart = first_start_date.getMonth() + 1; // Adding 1 because getMonth() returns values from 0 to 11

    const dateStart = first_start_date.getDate();

    this.yearStart = yearStart;
    this.monthStart = monthStart;
    this.dateStart = dateStart;

    const first_finish_date = new Date(userdata.finish_date);
    const finish_date = new DatePipe('en-US').transform(first_finish_date, 'yyyy-MM-dd');

    const yearFinish = first_finish_date.getFullYear();
    const monthFinish = first_finish_date.getMonth() + 1; // Adding 1 because getMonth() returns values from 0 to 11
    const dateFinish = first_finish_date.getDate()

    this.yearFinish = yearFinish;
    this.monthFinish = monthFinish;
    this.dateFinish = dateFinish;

    this.taskForm.setValue({
      id: userdata.id,
      subject: userdata.subject,
      priority: userdata.priority,
      start_date: {day: dateStart, month:monthStart, year:yearStart},
      finish_date: {day: dateFinish, month:monthFinish, year:yearFinish},
      department: userdata.department,
      assignedTo: userdata.assignedTo,
      status: userdata.status
    });

    // this.taskIndex = i;

  }

  /**
   * Updates selected row
   */
  updateTask() {

    let start_date1 = this.taskForm.get('start_date')?.value;
    let finish_date1 = this.taskForm.get('finish_date')?.value;

    let start_date = start_date1.year + '-' + start_date1.month + '-' + start_date1.day;
    let finish_date = finish_date1.year + '-' + finish_date1.month + '-' + finish_date1.day;

    let updateTaskForm = this.taskForm.value;

    let updateTaskFormFinal = {
      id: updateTaskForm.id,
      subject: updateTaskForm.subject,
      priority: updateTaskForm.priority,
      start_date: start_date,
      finish_date: finish_date,
      department: updateTaskForm.department,
      assignedTo: updateTaskForm.assignedTo,
      status: updateTaskForm.status
    }


    this.taskList.updateTask(updateTaskFormFinal).then((task: any) => { });
    this.taskForm.reset();
  }

}
