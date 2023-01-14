import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Board, Task } from './board.model';
import firebase from 'firebase/compat/app';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db:AngularFirestore) { }

 /**
   * Creates a new board for the current user
   */
 async createBoard(data: Board) {
  const user = await this.afAuth.currentUser;
  return this.db.collection<Board>('boards').add({
    ...data,
    uid: user?.uid,
    tasks: [{ description: 'Hello!', label: 'yellow' }]
  });
}

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .delete();
  }
    /**
   * Updates the tasks on board
   */
    updateTasks(boardId: string, tasks: Task[]) {
      return this.db
        .collection('boards')
        .doc(boardId)
        .update({ tasks });
    }
      /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
    return this.db
      .collection('boards')
      .doc(boardId)
      .update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

    /**
   * Get all boards owned by current user
   * this query requires index on the firestore database
   * which needs to be created in the firebase console
   */
    getUserBoards() {
      return this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.db
              .collection<Board>('boards', ref =>
                ref.where('uid', '==', user.uid).orderBy('priority')
              )
              .valueChanges({ idField: 'id' });
          } else {
            return [];
          }
        }),
        // map(boards => boards.sort((a, b) => a.priority - b.priority))
      );
    }

      /**
       * rewrite all the boards again based on user priority in the database
       * batch is used because all should run or else all should fail
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    //make a reference to all board documents
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, { priority: idx }));
    batch.commit();
  }
}
