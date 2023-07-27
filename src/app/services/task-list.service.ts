import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, updateDoc, getFirestore } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  constructor(private fireService: AngularFirestore) { }

  /**
   * Get tasks
   * @returns
   */
  getTasks(): Observable<any> {
    return this.fireService.collection('Task').snapshotChanges();
  }

  /**
   *  Add tasks
   * @param task
   * @returns
   */
  createTask(task: any) {
    task.id = this.fireService.createId();
    return this.fireService.collection('Task').add(task);
  }

  /**
   * Update Task/Not working
   * @param task
   * @returns
   */
  updateTask(task: any) {
    this.fireService.collection('Task')
    return this.fireService.collection('Task').doc(task.id).update(task);
  }

  /**
   * Delete Task
   * @param id
   * @returns
   */
  deleteTask(id: string) {
    console.log(this.fireService.collection('Task'));
    return this.fireService.collection('Task').doc(id).delete();
  }

}
