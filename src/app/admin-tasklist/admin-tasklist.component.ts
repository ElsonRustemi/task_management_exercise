import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { User } from '../user.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
  NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
  updateTaskForm!: object;

  // Modal variables
  model?: NgbDateStruct;
  model1?: NgbDateStruct;

  // Arrays with values used on dropdown
  options: string[] = [];
  statuses: string[] = [];


  taskIndex!: number;
  userDataArray!: User[];

  paginationIndex!: number;

  constructor(
    private serviceUserData: UserDataService,
    private readonly calendar: NgbDatepickerModule,
    private fb: FormBuilder, public formatter: NgbDateParserFormatter) {

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
  }

  /**
   * HOOK onInit
   */
  ngOnInit() {
    this.getTasks();
  }

  /**
   * Get Tasks
   */
  getTasks() {
    this.userDataArray = this.serviceUserData.userInfo;
    console.log(this.userDataArray);
    return this.userDataArray;
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

    this.serviceUserData.serviceAddTask(updateTaskFormFinal);
    this.taskForm.reset();
  }


  /**
   * Deletes specific row on click
   * @param i
   */
  deleteTask(i: number) {
    this.serviceUserData.serviceDeleteTask(i);
  }

  /**
   * Sets status to 'Completed'
   * @param i
   */
  completeTask() {
    this.serviceUserData.serviceCompleteTask(this.paginationIndex);
  }

  /**
   * Sets status to 'Undefined'
   * @param i
   */
  removeCompletionOfStatus(i: number) {
    this.serviceUserData.servisUncomplete(i);
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
  getUserData(userdata: User, i: number) {

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
      subject: userdata.subject,
      priority: userdata.priority,
      start_date: {day: dateStart, month:monthStart, year:yearStart},
      finish_date: {day: dateFinish, month:monthFinish, year:yearFinish},
      department: userdata.department,
      assignedTo: userdata.assignedTo,
      status: userdata.status
    });

    this.taskIndex = i;

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
      subject: updateTaskForm.subject,
      priority: updateTaskForm.priority,
      start_date: start_date,
      finish_date: finish_date,
      department: updateTaskForm.department,
      assignedTo: updateTaskForm.assignedTo,
      status: updateTaskForm.status
    }

    this.serviceUserData.serviceUpdateTask(this.taskIndex, updateTaskFormFinal);
    this.taskForm.reset();
  }

}
