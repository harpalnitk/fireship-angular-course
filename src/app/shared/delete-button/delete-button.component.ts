import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {
//how to emit custom events in angular

//property which tells when to emit delete event to the parent component
canDelete: boolean;

@Output() delete = new EventEmitter<boolean>();

cancel() {
  this.canDelete = false;
}

prepareForDelete() {
  this.canDelete = true;
}

deleteBoard() {
  this.delete.emit(true);
  this.canDelete = false;
}

}
