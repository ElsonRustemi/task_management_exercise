import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private fireService: AngularFirestore) { }

  /**
   *
   * @returns
   */
  getTasks(): Observable<any> {
    return this.fireService.collection('Task').snapshotChanges();
  }

  /**
   *
   * @param task
   * @returns
   */
  createTask(task: any) {
    task.id = this.fireService.createId();
    return this.fireService.collection('Task').add(task);
  }

  /**
   *
   * @param task
   * @returns
   */
  updateTask(task: any) {
    // console.log(task.id);
    return this.fireService.collection('Task').doc(task.id).update(task);
  }

  /**
   *
   * @param id
   * @returns
   */
  deleteTask(id: string) {
    console.log(id);
    return this.fireService.collection('Task').doc(id).delete();
  }


  // completeTask() {
  //   return this.fireService.collection('Task').doc(task.id).;
  // }



}
