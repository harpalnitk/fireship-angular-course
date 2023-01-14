import { BoardService } from './../board.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { Board } from '../board.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss'],
})

// this is a smart component which will have
// a list of boards and each board itself
// will be a smart component
export class BoardListComponent implements OnInit, OnDestroy {
  boards: Board[];
  sub:Subscription;

  constructor(public boardService:BoardService, public dialog: MatDialog) {}

  ngOnInit(): void {
   this.sub = this.boardService.getUserBoards()
   .subscribe(boards=>{this.boards = boards});
  }
  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }
  drop(event: CdkDragDrop<string[]>){
    moveItemInArray(this.boards, event.previousIndex,event.currentIndex);
    //also sort in the backend
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardService.createBoard({
          title: result,
          priority: this.boards.length
        });
      }
    });
  }
}
